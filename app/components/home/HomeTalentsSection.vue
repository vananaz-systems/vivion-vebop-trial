<script setup lang="ts">
import { talentSlides } from '~/data/home'
import { aboutPage } from '~/data/pages'

const DRAG_THRESHOLD = 6
const SCROLL_SETTLE_MS = 520
const AUTOPLAY_MS = 4000

const sectionEl = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const index = ref(0)
const isScrolled = ref(false)
const { contentRevealed } = useIntroLoader()
const isDragging = ref(false)
const isReady = ref(false)

const looping = computed(() => talentSlides.length > 1)

const loopedSlides = computed(() => {
  if (!looping.value) {
    return talentSlides.map(slide => ({ ...slide, loopKey: slide.id, isClone: false }))
  }

  const first = talentSlides[0]!
  const last = talentSlides[talentSlides.length - 1]!

  return [
    { ...last, loopKey: `${last.id}-clone-start`, isClone: true },
    ...talentSlides.map(slide => ({ ...slide, loopKey: slide.id, isClone: false })),
    { ...first, loopKey: `${first.id}-clone-end`, isClone: true },
  ]
})

let observer: IntersectionObserver | null = null
let pointerId: number | null = null
let startX = 0
let startY = 0
let startScrollLeft = 0
let hasDragged = false
let ignoreGesture = false
let suppressClick = false
let suppressClickTimer: ReturnType<typeof setTimeout> | null = null
let settleTimer: ReturnType<typeof setTimeout> | null = null
let autoplayTimer: ReturnType<typeof setTimeout> | null = null
let isAnimating = false
let isJumping = false
let isHovering = false
let reducedMotionQuery: MediaQueryList | null = null

function realIndexFromTrack(trackIndex: number) {
  const count = talentSlides.length
  if (!looping.value) return Math.min(count - 1, Math.max(0, trackIndex))
  if (trackIndex <= 0) return count - 1
  if (trackIndex >= count + 1) return 0
  return trackIndex - 1
}

function trackIndexFromReal(realIndex: number) {
  return looping.value ? realIndex + 1 : realIndex
}

function isCloneTrack(trackIndex: number) {
  if (!looping.value) return false
  return trackIndex === 0 || trackIndex === talentSlides.length + 1
}

function targetScrollLeft(el: HTMLElement, child: HTMLElement) {
  const trackRect = el.getBoundingClientRect()
  const childRect = child.getBoundingClientRect()
  return el.scrollLeft + (childRect.left + childRect.width / 2) - (trackRect.left + el.clientWidth / 2)
}

function freezeTrack(el: HTMLElement, smooth: boolean) {
  el.style.scrollSnapType = 'none'
  el.style.scrollBehavior = smooth ? 'smooth' : 'auto'
}

function restoreTrack(el: HTMLElement) {
  el.style.scrollSnapType = ''
  el.style.scrollBehavior = ''
}

function afterPaint(fn: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn)
  })
}

function jumpToChild(el: HTMLElement, child: HTMLElement) {
  isAnimating = false
  isJumping = true
  freezeTrack(el, false)
  el.scrollTo({ left: el.scrollLeft, behavior: 'auto' })
  el.scrollLeft = targetScrollLeft(el, child)
  void el.offsetWidth
  afterPaint(() => {
    restoreTrack(el)
    isJumping = false
  })
}

function scrollToTrack(trackIndex: number, smooth: boolean) {
  const el = track.value
  if (!el) return
  const child = el.children[trackIndex] as HTMLElement | undefined
  if (!child) return

  if (!smooth) {
    jumpToChild(el, child)
    return
  }

  isAnimating = true
  if (settleTimer) {
    clearTimeout(settleTimer)
    settleTimer = null
  }

  freezeTrack(el, true)
  el.scrollTo({ left: targetScrollLeft(el, child), behavior: 'smooth' })
  scheduleSettle(SCROLL_SETTLE_MS)
}

function realTrackFromClone(trackIndex: number) {
  return trackIndex === 0 ? talentSlides.length : 1
}

function settleLoopPosition() {
  if (isDragging.value || isJumping) return
  if (settleTimer) {
    clearTimeout(settleTimer)
    settleTimer = null
  }

  isAnimating = false
  const nearest = findNearestTrackIndex()
  index.value = realIndexFromTrack(nearest)
  if (!isCloneTrack(nearest)) {
    const el = track.value
    if (el) restoreTrack(el)
    return
  }
  scrollToTrack(realTrackFromClone(nearest), false)
}

function scheduleSettle(delay = 100) {
  if (settleTimer) clearTimeout(settleTimer)
  settleTimer = setTimeout(settleLoopPosition, delay)
}

function findNearestTrackIndex() {
  const el = track.value
  if (!el) return trackIndexFromReal(index.value)

  const children = Array.from(el.children) as HTMLElement[]
  if (!children.length) return trackIndexFromReal(index.value)

  const trackRect = el.getBoundingClientRect()
  const trackCenter = trackRect.left + el.clientWidth / 2

  let nearest = 0
  let nearestDist = Infinity

  children.forEach((child, i) => {
    const rect = child.getBoundingClientRect()
    const dist = Math.abs(rect.left + rect.width / 2 - trackCenter)
    if (dist < nearestDist) {
      nearestDist = dist
      nearest = i
    }
  })

  return nearest
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearTimeout(autoplayTimer)
    autoplayTimer = null
  }
}

function canAutoplay() {
  return (
    looping.value
    && !reducedMotionQuery?.matches
    && document.visibilityState === 'visible'
    && !isDragging.value
    && !isHovering
  )
}

function startAutoplay() {
  stopAutoplay()
  if (!canAutoplay()) return
  autoplayTimer = setTimeout(() => {
    autoplayTimer = null
    if (!canAutoplay()) return
    go(index.value + 1)
  }, AUTOPLAY_MS)
}

function onCarouselEnter() {
  isHovering = true
  stopAutoplay()
}

function onCarouselLeave() {
  isHovering = false
  startAutoplay()
}

function onVisibilityChange() {
  if (document.visibilityState === 'hidden') stopAutoplay()
  else startAutoplay()
}

function onReducedMotionChange() {
  if (reducedMotionQuery?.matches) stopAutoplay()
  else startAutoplay()
}

function go(nextIndex: number) {
  const count = talentSlides.length
  if (!count) return

  let trackIndex: number
  if (!looping.value) {
    trackIndex = Math.min(count - 1, Math.max(0, nextIndex))
    index.value = trackIndex
  }
  else if (nextIndex < 0) {
    trackIndex = 0
    index.value = count - 1
  }
  else if (nextIndex >= count) {
    trackIndex = count + 1
    index.value = 0
  }
  else {
    trackIndex = nextIndex + 1
    index.value = nextIndex
  }

  scrollToTrack(trackIndex, true)
  startAutoplay()
}

function isAlignedWith(trackIndex: number) {
  const el = track.value
  const child = el?.children[trackIndex] as HTMLElement | undefined
  if (!el || !child) return false
  return Math.abs(targetScrollLeft(el, child) - el.scrollLeft) < 2
}

function snapToNearest() {
  const nearest = findNearestTrackIndex()
  index.value = realIndexFromTrack(nearest)
  if (isCloneTrack(nearest) && isAlignedWith(nearest)) {
    scrollToTrack(realTrackFromClone(nearest), false)
    return
  }
  scrollToTrack(nearest, true)
}

function syncToIndex() {
  if (isDragging.value) return
  scrollToTrack(trackIndexFromReal(index.value), false)
}

function onTrackScroll() {
  if (isDragging.value || isAnimating || isJumping) return
  scheduleSettle()
}

function onTrackScrollEnd() {
  if (isDragging.value || isJumping) return
  settleLoopPosition()
}

function onArrowMouseDown(event: MouseEvent) {
  event.preventDefault()
  const btn = event.currentTarget
  if (btn instanceof HTMLElement) {
    btn.focus({ preventScroll: true })
  }
}

function resetDrag() {
  pointerId = null
  hasDragged = false
  ignoreGesture = false
  isDragging.value = false
}

function onPointerDown(event: PointerEvent) {
  const el = track.value
  if (!el) return
  if (event.pointerType === 'mouse' && event.button !== 0) return

  if (settleTimer) {
    clearTimeout(settleTimer)
    settleTimer = null
  }

  pointerId = event.pointerId
  startX = event.clientX
  startY = event.clientY
  startScrollLeft = el.scrollLeft
  hasDragged = false
  ignoreGesture = false
}

function onPointerMove(event: PointerEvent) {
  const el = track.value
  if (!el || ignoreGesture || pointerId !== event.pointerId) return

  const dx = event.clientX - startX
  const dy = event.clientY - startY
  const absX = Math.abs(dx)
  const absY = Math.abs(dy)

  if (!hasDragged) {
    if (absX <= DRAG_THRESHOLD && absY <= DRAG_THRESHOLD) return

    if (absY >= absX) {
      ignoreGesture = true
      return
    }

    if (absX <= DRAG_THRESHOLD) return

    hasDragged = true
    isDragging.value = true
    stopAutoplay()
    el.setPointerCapture(event.pointerId)
  }

  event.preventDefault()
  el.scrollLeft = startScrollLeft - dx
}

function onPointerUp(event: PointerEvent) {
  const el = track.value
  if (!el || pointerId !== event.pointerId) return

  if (el.hasPointerCapture(event.pointerId)) {
    el.releasePointerCapture(event.pointerId)
  }

  const didDrag = hasDragged

  if (didDrag) {
    suppressClick = true
    if (suppressClickTimer) clearTimeout(suppressClickTimer)
    suppressClickTimer = setTimeout(() => {
      suppressClick = false
      suppressClickTimer = null
    }, 300)
    const focused = document.activeElement
    if (focused instanceof HTMLElement && el.contains(focused)) {
      focused.blur()
    }
    snapToNearest()
  }

  resetDrag()
  if (didDrag) startAutoplay()
}

function onClickCapture(event: MouseEvent) {
  if (!suppressClick) return
  event.preventDefault()
  event.stopPropagation()
  suppressClick = false
}

function observeScrollIn() {
  const el = sectionEl.value
  if (!el || observer) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      isScrolled.value = true
      observer?.disconnect()
    },
    { rootMargin: '0px 0px -200px 0px', threshold: 0 },
  )
  observer.observe(el)
}

onMounted(() => {
  const position = () => {
    syncToIndex()
    isReady.value = true
  }

  nextTick(() => {
    syncToIndex()
    requestAnimationFrame(position)
  })

  window.addEventListener('resize', syncToIndex)

  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionQuery.addEventListener('change', onReducedMotionChange)
  document.addEventListener('visibilitychange', onVisibilityChange)
  startAutoplay()

  if (contentRevealed.value) {
    if (reducedMotionQuery?.matches) isScrolled.value = true
    else observeScrollIn()
  }
})

watch(contentRevealed, (revealed) => {
  if (!revealed) return
  if (reducedMotionQuery?.matches) {
    isScrolled.value = true
    return
  }
  nextTick(observeScrollIn)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('resize', syncToIndex)
  document.removeEventListener('visibilitychange', onVisibilityChange)
  reducedMotionQuery?.removeEventListener('change', onReducedMotionChange)
  if (suppressClickTimer) clearTimeout(suppressClickTimer)
  if (settleTimer) clearTimeout(settleTimer)
  stopAutoplay()
})
</script>

<template>
  <section
    ref="sectionEl"
    class="p-indexTalents"
    :class="{ 'is-scrolled': isScrolled }"
  >
    <div class="p-indexTalents__inner">
      <div class="p-indexTalents__head">
        <div class="p-indexTalents__head-inner">
          <h2 class="p-indexTalents__title">TALENTS</h2>
          <NuxtLink to="/talents/" class="p-indexTalents__all p-indexTalents__all--pc">
            <i class="p-indexTalents__all-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15">
                <g transform="translate(0 -2)">
                  <rect width="3" height="15" transform="translate(10 2)" />
                  <rect width="3" height="15" transform="translate(5 2)" />
                  <rect width="3" height="15" transform="translate(0 2)" />
                </g>
              </svg>
            </i>
            <em class="p-indexTalents__all-label">ALL TALENTS</em>
          </NuxtLink>
        </div>
      </div>

      <div
        class="p-indexTalents__carousel"
        @mouseenter="onCarouselEnter"
        @mouseleave="onCarouselLeave"
      >
      <div class="p-indexTalents__nav">
        <div class="p-indexTalents__nav-inner">
          <button
            class="p-indexTalents__arrow p-indexTalents__arrow--prev"
            type="button"
            aria-label="前のタレント"
            @mousedown="onArrowMouseDown"
            @click="go(index - 1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g transform="translate(342 1899) rotate(180)"><path d="M307-260.13l12.728-12.728L307-285.585,308.414-287l12.728,12.728h0l1.414,1.415-1.414,1.414h0l-12.729,12.728Z" transform="translate(13 2156)" fill="#60ec33"></path><rect width="32" height="32" transform="translate(310 1867)" fill="none"></rect></g></svg>
          </button>

          <button
            class="p-indexTalents__arrow p-indexTalents__arrow--next"
            type="button"
            aria-label="次のタレント"
            @mousedown="onArrowMouseDown"
            @click="go(index + 1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g transform="translate(-310 -1867)"><path d="M307-260.13l12.728-12.728L307-285.585,308.414-287l12.728,12.728h0l1.414,1.415-1.414,1.414h0l-12.729,12.728Z" transform="translate(13 2156)" fill="#60ec33"></path><rect width="32" height="32" transform="translate(310 1867)" fill="none"></rect></g></svg>
          </button>
        </div>
      </div>

      <div
        ref="track"
        class="p-indexTalents__track"
        :class="{ 'is-dragging': isDragging, 'is-ready': isReady }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @click.capture="onClickCapture"
        @scroll="onTrackScroll"
        @scrollend="onTrackScrollEnd"
      >
        <TalentSlide
          v-for="slide in loopedSlides"
          :key="slide.loopKey"
          :name="slide.name"
          :image="slide.image"
          :image-width="slide.imageWidth"
          :image-height="slide.imageHeight"
          :description="slide.description"
          :cta-label="slide.ctaLabel"
          :cta-stacked="slide.ctaStacked"
          :to="slide.to"
          :aria-hidden="slide.isClone"
        />
      </div>
      </div>

      <footer class="p-indexTalents__foot">
        <h4 class="p-indexTalents__catch">
          <img
            src="/images/common/deco/txt_deco_alignleft.svg"
            :alt="aboutPage.english"
            width="170"
            height="20"
            decoding="async"
          >
        </h4>
        <NuxtLink to="/talents/" class="p-indexTalents__all p-indexTalents__all--sp">
          <i class="p-indexTalents__all-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15">
              <g transform="translate(0 -2)">
                <rect width="3" height="15" transform="translate(10 2)" />
                <rect width="3" height="15" transform="translate(5 2)" />
                <rect width="3" height="15" transform="translate(0 2)" />
              </g>
            </svg>
          </i>
          <em class="p-indexTalents__all-label">ALL TALENTS</em>
        </NuxtLink>
      </footer>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

@keyframes talents-arrow {
  0%,
  100% { transform: translateX(0); }
  60% { transform: translateX(20%); }
}

@keyframes sliderPrevAnime {
  0% { transform: translateX(0); }
  40% { transform: translateX(-20%); }
  70%,
  100% { transform: translateX(0); }
}

@keyframes sliderNextAnime {
  0% { transform: translateX(0); }
  40% { transform: translateX(20%); }
  70%,
  100% { transform: translateX(0); }
}

.p-indexTalents {
  position: relative;
  overflow: visible;
  padding-top: 14.0186915888vw;
  padding-left: 0;

  @include breakpoint.mq(min, 769px) {
    padding-top: 5.8333333333vw;
  }

  @include breakpoint.mq(min, 1201px) {
    padding-top: 70px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background: #fff;
    pointer-events: none;
    z-index: 1;
  }

  &.is-scrolled::before {
    width: 89.3023255814%;
    transition-duration: 1.2s;
    transition-delay: 0s;
    transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

    @include breakpoint.mq(min, 769px) {
      width: 88.1944444444%;
    }
  }

  // Official `.inner-section` — SP slider nav positions against this, not the carousel
  &__inner {
    position: relative;
    z-index: 2;
  }

  &__head {
    position: relative;
    z-index: 2;
    // padding-left: 10.6976744186%;
    padding-right: 0;
    margin-bottom: 7.0093457944vw;

    @include breakpoint.mq(min, 769px) {
      // padding-left: 11.8055555556%;
      margin-bottom: 4.1666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 50px;
    }
  }

  &__head-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin-inline: auto;
    // padding-inline: 40px;
  }

  &__title {
    font-family: variable.$font-display;
    font-size: 2.8037383178vw;
    font-weight: 700;
    letter-spacing: 0.25em;
    line-height: 1;
    color: variable.$black;
    opacity: 0;
    transform: scaleX(1.2);

    @include breakpoint.mq(max, 768px) {
      padding-left: 23px;
    }

    @include breakpoint.mq(min, 769px) {
      font-size: 1.3333333333vw;
      
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 16px;
    }
  }

  &.is-scrolled &__title {
    opacity: 1;
    transform: scaleX(1);
    transition-duration: 2.2s;
    transition-delay: 0s;
    transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  &__all {
    display: flex;
    align-items: center;
    padding-top: 0.4em;
    padding-bottom: 0.4em;
    font-family: variable.$font-display;
    font-size: 3.2710280374vw;
    font-weight: 700;
    letter-spacing: 0.1em;
    line-height: 1;
    color: variable.$black;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.25vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 15px;
    }

    &--pc {
      display: none;

      @include breakpoint.mq(min, 769px) {
        display: flex;
      }
    }

    &--sp {
      display: flex;

      @include breakpoint.mq(min, 769px) {
        display: none;
      }
    }

    &:hover {
      .p-indexTalents__all-label {
        color: #6a6b76;
      }

      .p-indexTalents__all-icon rect {
        fill: #6a6b76;
      }
    }
  }

  &__all-icon {
    display: block;
    margin-right: 2.5700934579vw;
    width: 3.0373831776vw;
    line-height: 0;

    @include breakpoint.mq(min, 769px) {
      margin-right: 1vw;
      width: 1.6666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-right: 12px;
      width: 20px;
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
    }

    rect {
      fill: #60ec33;
      transition: fill 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }
  }

  &__all-label {
    font-style: normal;
    font-weight: 700;
    transition: color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

    &::after {
      content: "→";
      display: inline-block;
      margin-left: 0.5em;
      animation: talents-arrow 1.2s linear infinite;
    }
  }

  &__carousel {
    overflow: visible;
    opacity: 0;

    // Official: `main` is position:relative only ≥769, so SP arrows sit in the title row
    @include breakpoint.mq(min, 769px) {
      position: relative;
    }
  }

  &.is-scrolled &__carousel {
    opacity: 1;
    transition-duration: 1.2s;
    transition-delay: 1s;
    transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  &__track {
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: auto;
    overflow-anchor: none;
    scrollbar-width: none;
    cursor: grab;
    touch-action: pan-y pinch-zoom;
    visibility: hidden;

    &.is-ready {
      visibility: visible;
    }

    &.is-dragging {
      cursor: grabbing;
      user-select: none;
      scroll-snap-type: none;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    :deep(img) {
      -webkit-user-drag: none;
      user-select: none;
    }

    // @include breakpoint.mq(max, 768px) {
    //   width: 89.3023255814%;
    // }

    @include breakpoint.mq(min, 769px) {
      padding-inline: max(0px, calc((100% - 1000px) / 2));
    }

    :deep(.c-talentSlide) {
      flex: 0 0 100%;
      width: 100%;
      scroll-snap-align: center;
      scroll-snap-stop: always;

      @include breakpoint.mq(min, 769px) {
        flex-basis: min(1000px, 100%);
        width: min(1000px, 100%);
      }
    }
  }

  &__nav {
    position: absolute;
    top: 0;
    right: 5.8139534884%;
    width: 16.8224299065vw;
    pointer-events: none;
    z-index: 4;

    @include breakpoint.mq(min, 769px) {
      top: 27vw;
      left: 50%;
      right: auto;
      width: 96.6666666667%;
      transform: translateX(-50%);
      mix-blend-mode: difference;
    }

    @include breakpoint.mq(min, 1201px) {
      top: 265px;
      width: 100%;
      max-width: 1060px;
    }
  }

  &__nav-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    transform: translateY(-50%);
  }

  &__arrow {
    display: block;
    margin: 0;
    padding: 0;
    width: 7.476635514vw;
    background: none;
    border: none;
    cursor: pointer;
    pointer-events: auto;
    line-height: 0;

    @include breakpoint.mq(min, 769px) {
      width: 5vw;

      svg path {
        fill: #fff;
      }
    }

    @include breakpoint.mq(min, 1201px) {
      width: 60px;
    }

    svg {
      vertical-align: middle;
      width: 100%;
      height: auto;
    }

    &--prev svg {
      animation: sliderPrevAnime 2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }

    &--next svg {
      animation: sliderNextAnime 2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }
  }

  // Official `.talents > footer.is-sp` — under-carousel catch + ALL TALENTS
  &__foot {
    display: none;

    @include breakpoint.mq(max, 768px) {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
    }
  }

  &__catch {
    position: relative;
    line-height: 1;
    padding-top: 8.1775700935vw;
    width: 39.7196261682vw;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      height: 1px;
      background: #000;
      width: 7.476635514vw;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      vertical-align: bottom;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .p-indexTalents {
    &__title,
    &__carousel {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
}
</style>
