<script setup lang="ts">
const { brand } = useSite()
const { isOpen, toggle } = useMenu()
const { onAboutClick } = useAboutNav()
const route = useRoute()
const { headerShown } = useIntroLoader()

function onNavClick(to: string, event: Event) {
  if (isAboutNavTo(to)) onAboutClick(event)
}

const headerNav = computed(() => brand.nav.main.filter(item => item.label !== 'HOME'))

/** Official `#js-pcheader`: hide when `$(window).scrollTop() > 200`. */
const SCROLL_HIDE_THRESHOLD = 200
const scrollAllowsBar = ref(true)

const isBarVisible = computed(() => {
  if (isHomePath(route.path) && !headerShown.value) return false
  return scrollAllowsBar.value
})

function syncBarVisibility() {
  scrollAllowsBar.value = window.scrollY <= SCROLL_HIDE_THRESHOLD
}

onMounted(() => {
  syncBarVisibility()
  window.addEventListener('scroll', syncBarVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', syncBarVisibility)
})
</script>

<template>
  <header class="c-header" :class="{ 'is-menu-open': isOpen }">
    <div class="c-header__catch">
      <picture>
        <source media="(min-width:769px)" srcset="/images/common/header/txt_header_1line.svg">
        <source media="(max-width:768px)" srcset="/images/common/header/txt_header_2line.svg">
        <img
          src="/images/common/header/txt_header_1line.svg"
          alt="VTuber Production = Vebop High School Official Web Site"
          decoding="async"
        >
      </picture>
    </div>

    <div class="c-header__bar" :class="{ 'is-show': isBarVisible }" :aria-hidden="!isBarVisible">
      <AppLogo />
      <nav class="c-header__nav" aria-label="メインメニュー">
        <template v-for="item in headerNav" :key="item.to">
          <a
            v-if="item.external"
            :href="item.to"
            class="c-header__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.label }}
          </a>
          <NuxtLink v-else :to="item.to" class="c-header__link" @click="onNavClick(item.to, $event)">
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <div class="c-header__sns">
        <a class="c-header__sns-x" :href="brand.sns.x" target="_blank" rel="noopener noreferrer" aria-label="X">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><title>X(Twitter)</title><path fill="currentColor" d="M8.914,6.481,14.489,0H13.168L8.327,5.628,4.46,0H0L5.847,8.51,0,15.306H1.321L6.434,9.364l4.084,5.943h4.46L8.913,6.481ZM7.1,8.585l-.592-.847L1.8.995H3.827l3.8,5.442.592.847,4.945,7.073H11.139L7.1,8.585Z" transform="translate(7.409 7.469)" /></svg>
        </a>
        <a class="c-header__sns-youtube" :href="brand.sns.youtube" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><title>YouTube</title><path fill="currentColor" d="M24.46 10.54a2.418 2.418 0 0 0-1.7-1.71c-1.5-.4-7.52-.4-7.52-.4s-6.02 0-7.52.4a2.418 2.418 0 0 0-1.7 1.71 27.228 27.228 0 0 0 0 9.33 2.382 2.382 0 0 0 1.7 1.68c1.5.4 7.52.4 7.52.4s6.02 0 7.52-.4a2.382 2.382 0 0 0 1.7-1.68 27.228 27.228 0 0 0 0-9.33Zm-11.19 7.52v-5.72l5.03 2.86Z" /></svg>
        </a>
      </div>
    </div>

    <button
      class="c-header__menu"
      type="button"
      :aria-expanded="isOpen"
      aria-controls="site-menu"
      :aria-label="isOpen ? 'CLOSE' : 'MENU'"
      @click="toggle"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="146" height="50.001" viewBox="0 0 146 50.001" aria-hidden="true">
        <g transform="translate(-284 -20)">
          <title>MENU</title>
          <path d="M146,50H16.6a.2.2,0,0,0,.071-.033c.3-.267,29.609-26.722,33.714-30.825a.39.39,0,0,0,.086-.407.217.217,0,0,0-.2-.151l-15.013-.5a.152.152,0,0,1-.13-.08.15.15,0,0,1,0-.151L50.951.255A.151.151,0,0,0,50.977.09.151.151,0,0,0,50.858,0H146V50ZM16.561,50H0V0H34.015a.163.163,0,0,0-.108.068L18.454,23.2a.3.3,0,0,0-.068.311.166.166,0,0,0,.142.117l12.824.951a.168.168,0,0,1,.139.09.171.171,0,0,1,0,.168l-.869,1.438-.021.035c-3.038,5.025-12.281,20.317-14.121,23.384a.233.233,0,0,0-.011.233.139.139,0,0,0,.1.073Z" transform="translate(284 20.001)" />
          <g transform="translate(-1)">
            <path d="M2.66,0V-4.76L2.576-6.23H2.73l.546,1.47,1.96,4.2H7.784l1.96-4.2.546-1.47h.154l-.07,1.47V0h2.1V-9.38H9.618L7.49-4.76l-.854,2.2H6.482L5.6-4.76,3.4-9.38H.56V0ZM23.2,0V-1.89H17.36V-3.78h5.628V-5.656H17.36V-7.49H23.2V-9.38H15.26V0ZM27.93,0V-4.522l-.084-1.722h.14l1.19,1.764L32.634,0h2.24V-9.38h-2.1v4.522l.1,1.89h-.154L31.43-4.942,28.07-9.38H25.83V0ZM42.21.14c3.066,0,4.606-1.54,4.606-4.06V-9.38h-2.1v5.306c0,1.6-.588,2.17-2.506,2.17S39.7-2.478,39.7-4.074V-9.38H37.6v5.46C37.6-1.4,39.158.14,42.21.14Z" transform="translate(370 49.62)" fill="#fff" />
            <rect width="14" height="2" transform="translate(349 39)" fill="#fff" />
            <rect width="14" height="2" transform="translate(349 44)" fill="#fff" />
            <rect width="14" height="2" transform="translate(349 49)" fill="#fff" />
          </g>
        </g>
      </svg>
    </button>
  </header>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.c-header {
  position: sticky;
  top: 0;
  z-index: 30;
  padding: 16px 20px 0;
  overflow: visible;

  // Official `.l-header` is `position: fixed` (not sticky). On SP the pill bar is
  // `display: none`, so sticky + padding 0 yields a 0-height box that clips the
  // fixed MENU on first paint until scroll/reflow. Keep MENU on the viewport.
  @include breakpoint.mq(max, 768px) {
    position: relative;
    top: auto;
    padding: 0;
    overflow: visible;
  }

  @include breakpoint.mq(pc) {
    padding: 20px 32px 0;
  }

  &.is-menu-open {
    // z-index: auto;
    pointer-events: none;
  }

  &.is-menu-open &__bar {
    z-index: 41;
    pointer-events: auto;
  }

  &.is-menu-open &__catch {
    z-index: 41;
  }

  &.is-menu-open &__menu {
    pointer-events: none;
  }

  &__catch {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    padding-left: 5.8411214953%;
    padding-right: 5.8411214953%;
    pointer-events: none;

    @include breakpoint.mq(min, 769px) {
      padding-left: 40px;
      padding-right: 40px;
    }

    picture {
      display: block;
      padding-top: 8.1775700935vw;
      width: 39.7196261682vw;
      max-width: none;
      overflow: visible;

      @include breakpoint.mq(min, 769px) {
        padding-top: 55px;
        width: 26%;
        max-width: 260px;
      }

      @include breakpoint.mq(min_max, 769px, 1200px) {
        width: 18.3333333333vw;
        max-width: 260px;
      }
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &__bar {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 20px;
    min-height: 60px;
    padding: 12px 32px;
    background: variable.$white;
    border-radius: 999px;
    box-shadow: 0 8px 24px rgba(17, 17, 17, 0.08);
    transform: translateY(-150%);
    transition-duration: 1.2s;
    transition-delay: 0.2s;
    transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

    // Official `.l-pcheader.is-pc` is `display: none !important` at max-width: 768px
    @include breakpoint.mq(max, 768px) {
      display: none;
    }

    @include breakpoint.mq(min, 769px) {
      width: 680px;
      max-width: 680px;
      margin-inline: auto;

      &.is-show {
        transform: translateY(0);
      }

      &:not(.is-show) {
        pointer-events: none;
      }
    }

    @include breakpoint.mq(min_max, 769px, 1200px) {
      width: 56.6666666667vw;
    }
  }

  &__nav {
    display: none;
    flex: 1;
    justify-content: center;
    gap: clamp(18px, 3vw, 40px);

    @include breakpoint.mq(pc) {
      display: flex;
    }
  }

  &__link {
    font-family: variable.$font-display;
    font-size: 0.92rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: variable.$black;

    // Official `.l-pcheader` nav underline (min-width: 769px)
    @include breakpoint.mq(min, 769px) {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -0.3em;
        display: block;
        width: 0;
        height: 2px;
        background: #60ec33;
        transition-duration: 0.3s;
        transition-delay: 0s;
        transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
      }

      &:hover::after {
        width: 100%;
      }
    }
  }

  &__sns {
    display: none;
    align-items: center;
    gap: 14px;

    @include breakpoint.mq(pc) {
      display: flex;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      color: variable.$black;
      line-height: 0;

      svg {
        display: block;
        width: 30px;
        height: 30px;
      }
    }
  }

  &__sns-x:hover {
    opacity: 0.3;
  }

  &__sns-youtube:hover {
    color: #ff0000;
  }

  &__menu {
    position: fixed;
    top: 4.6vw;
    right: 0;
    z-index: 31;
    display: block;
    width: 34.1121495327vw;
    margin: 0;
    padding: 0;
    line-height: 0;
    overflow: visible;

    // Official `.l-navtrigger` @ max-width 768: 34.112vw × (50/146) tall, `right: 0`.
    // Pin with `left` + `vw` (not `right: 0`) so a wider layout viewport after the
    // intro overflow lock — or a 0-height sticky CB — cannot shove MENU off-screen.
    @include breakpoint.mq(max, 768px) {
      top: 4.6vw;
      left: 65.8878504673vw;
      right: auto;
      width: 34.1121495327vw;
      height: 11.6822429907vw;
      max-width: none;
      overflow: visible;
    }

    @include breakpoint.mq(min, 769px) {
      top: 35px;
      right: 2.7777777778%;
      width: 10.1388888889%;
      max-width: 146px;

      &:hover svg > g:first-child path:not(:first-child) {
        fill: #6a6b76;
      }

      svg > g:first-child path:not(:first-child) {
        transition: fill 0.15s;
      }
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;

      @include breakpoint.mq(max, 768px) {
        height: 100%;
      }
    }
  }
}
</style>
