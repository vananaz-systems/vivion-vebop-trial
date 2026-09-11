<script setup lang="ts">
import {
  INTRO_BAR_END_MS,
  INTRO_FADEOUT_DELAY_MS,
  INTRO_MIN_GROW_MS,
  INTRO_REMOVE_DELAY_MS,
  INTRO_REVEAL_DELAY_MS,
  useIntroLoader,
} from '~/composables/useIntroLoader'

const props = defineProps<{
  ready?: boolean
}>()

const {
  playing,
  phase,
  reveal,
  finish,
  skip,
  lockScroll,
  unlockScroll,
} = useIntroLoader()

const barInner = ref<HTMLElement | null>(null)
const removed = ref(false)
const timers: ReturnType<typeof setTimeout>[] = []

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    timers.push(setTimeout(resolve, ms))
  })
}

function waitForBarEnd() {
  const el = barInner.value
  if (!el) return sleep(INTRO_BAR_END_MS)

  return new Promise<void>((resolve) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      el.removeEventListener('transitionend', onEnd)
      resolve()
    }
    const onEnd = (event: TransitionEvent) => {
      if (event.target !== el) return
      if (event.propertyName && event.propertyName !== 'width') return
      done()
    }
    el.addEventListener('transitionend', onEnd)
    timers.push(setTimeout(done, INTRO_BAR_END_MS + 80))
  })
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

async function play() {
  if (prefersReducedMotion()) {
    skip()
    removed.value = true
    return
  }

  lockScroll()
  await nextTick()
  await new Promise<void>(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
  void barInner.value?.offsetWidth
  phase.value = 'start'

  const startedAt = performance.now()
  while (!props.ready && performance.now() - startedAt < 8000) {
    await sleep(50)
  }

  const elapsed = performance.now() - startedAt
  if (elapsed < INTRO_MIN_GROW_MS) {
    await sleep(INTRO_MIN_GROW_MS - elapsed)
  }

  phase.value = 'end'
  await nextTick()
  await waitForBarEnd()

  window.scrollTo(0, 0)

  timers.push(setTimeout(() => {
    phase.value = 'fadeout'
  }, INTRO_FADEOUT_DELAY_MS))

  timers.push(setTimeout(() => {
    reveal()
    unlockScroll()
  }, INTRO_REVEAL_DELAY_MS))

  timers.push(setTimeout(() => {
    removed.value = true
    finish()
  }, INTRO_REMOVE_DELAY_MS))
}

onMounted(() => {
  void play()
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  unlockScroll()
  if (playing.value) finish()
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="!removed"
      class="l-loader"
      :class="{
        'is__start': phase === 'start' || phase === 'end' || phase === 'fadeout',
        'is__end': phase === 'end' || phase === 'fadeout',
        'is__fadeout': phase === 'fadeout',
      }"
      aria-hidden="true"
    >
      <div class="l-loader__inner">
        <div class="l-loader__bars">
          <div ref="barInner" class="l-loader__bars-inner" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.l-loader {
  position: fixed;
  inset: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  pointer-events: auto;

  &.is__fadeout {
    background: #60ec33;
    filter: brightness(3) contrast(300%);
    opacity: 0;
    pointer-events: none;
    transition-duration: 1.65s;
    transition-delay: 0s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__bars {
    position: relative;
    width: 100%;
    height: 2px;
  }

  &__bars-inner {
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 100%;
    background: #60ec33;
    transform: translateX(-50%);
    transition-duration: 7s;
    transition-delay: 0s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &.is__start &__bars-inner {
    width: 70%;
  }

  &.is__end &__bars-inner {
    width: 100%;
    transition-duration: 0.3s;
    transition-delay: 0s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .l-loader {
    display: none;
  }
}
</style>
