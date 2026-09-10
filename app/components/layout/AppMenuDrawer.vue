<script setup lang="ts">
import type { BrandNavItem } from '#shared/types/brand'
import { drawerJa } from '~/data/home'

const { brand } = useSite()
const { isOpen, close } = useMenu()
const route = useRoute()

const subLabels: Record<string, { en: string, jp: string }> = {
  プライバシーポリシー: { en: 'PRIVACY POLICY', jp: 'プライバシーポリシー' },
  プレゼント送付ガイドライン: { en: 'PRESENT RULES', jp: 'プレゼント送付ガイドライン' },
  お問い合わせ: { en: 'CONTACT', jp: 'お問い合わせ' },
  株式会社viviON: { en: 'viviON, inc.', jp: '株式会社viviON' },
}

const youtubeHandle = computed(() => {
  const match = brand.sns.youtube.match(/@([^/?#]+)/)
  return match?.[1] ?? 'VebopProject_official'
})

const snsItems = computed(() => [
  { id: 'x' as const, href: brand.sns.x, handle: `@${brand.sns.xHandle}` },
  { id: 'youtube' as const, href: brand.sns.youtube, handle: `@${youtubeHandle.value}` },
])

function isExternal(item: BrandNavItem) {
  return Boolean(item.external || item.newTab || item.to.startsWith('http'))
}

function isCurrent(item: BrandNavItem) {
  if (isExternal(item)) return false
  if (item.to === '/') return false
  return route.path === item.to || route.path.startsWith(item.to)
}

function subCopy(item: BrandNavItem) {
  return subLabels[item.label] ?? { en: item.label, jp: item.label }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      id="site-menu"
      class="c-drawer"
      :data-status="isOpen ? 'show' : 'hidden'"
      role="dialog"
      aria-modal="true"
      aria-label="サイトメニュー"
      :aria-hidden="!isOpen"
      :inert="!isOpen"
    >
      <div class="c-drawer__inner">
        <div class="c-drawer__bg" @click="close">
        </div>

        <div class="c-drawer__contents">
          <header class="c-drawer__head">
            <h1 class="c-drawer__logo">
              <NuxtLink to="/" @click="close">
                <picture>
                  <source type="image/webp" srcset="/images/common/logo.webp">
                  <img :src="brand.logo.white" :alt="brand.siteName" decoding="async">
                </picture>
              </NuxtLink>
            </h1>
            <button class="c-drawer__close" type="button" aria-label="CLOSE" @click="close">
              <svg xmlns="http://www.w3.org/2000/svg" width="146" height="50.001" viewBox="0 0 146 50.001" aria-hidden="true">
                <g transform="translate(-284 -20)">
                  <title>CLOSE</title>
                  <path class="bg" d="M146,50H16.6a.2.2,0,0,0,.071-.033c.3-.267,29.609-26.722,33.714-30.825a.39.39,0,0,0,.086-.407.217.217,0,0,0-.2-.151l-15.013-.5a.152.152,0,0,1-.13-.08.15.15,0,0,1,0-.151L50.951.255A.151.151,0,0,0,50.977.09.151.151,0,0,0,50.858,0H146V50ZM16.561,50H0V0H34.015a.163.163,0,0,0-.108.068L18.454,23.2a.3.3,0,0,0-.068.311.166.166,0,0,0,.142.117l12.824.951a.168.168,0,0,1,.139.09.171.171,0,0,1,0-.168l-.869,1.438-.021.035c-3.038,5.025-12.281,20.317-14.121,23.384a.233.233,0,0,0-.011.233.139.139,0,0,0,.1.073Z" transform="translate(284 20.001)" fill="#fff" />
                  <g transform="translate(-5 0.344)">
                    <rect width="14" height="2" transform="translate(351.414 39) rotate(45)" />
                    <rect width="14" height="2" transform="translate(350 48.9) rotate(-45)" />
                  </g>
                  <path class="txt" d="M5.362.14C8.288.14,10.15-1.316,10.15-3.7v-.21H7.812v.21c0,1.232-.7,1.82-2.408,1.82-2.058,0-2.828-.728-2.828-2.814S3.346-7.5,5.4-7.5c1.708,0,2.408.588,2.408,1.82v.21H10.15v-.21c0-2.38-1.876-3.836-4.788-3.836C2.268-9.52.35-7.616.35-4.69S2.268.14,5.362.14ZM19.586,0V-1.89H14V-9.38H11.9V0ZM26.1.14c3.178,0,5.1-1.9,5.1-4.83s-1.918-4.83-5.1-4.83c-3.108,0-5.04,1.9-5.04,4.83S22.988.14,26.1.14Zm0-2.016c-2.058,0-2.814-.728-2.814-2.814S24.038-7.5,26.1-7.5s2.856.728,2.856,2.814S28.154-1.876,26.1-1.876ZM37.2.14c2.982,0,4.172-1.372,4.172-2.9,0-1.288-.756-2.31-2.856-2.646l-2.632-.42c-.784-.14-1.092-.336-1.092-.882,0-.6.462-.9,1.974-.9,1.862,0,2.324.378,2.324,1.274v.2H41.2v-.084c0-1.974-1.344-3.3-4.228-3.3-3.15,0-4.3,1.484-4.3,2.9,0,1.526.994,2.366,2.674,2.632l2.632.378c.966.168,1.288.378,1.288.952,0,.63-.392.882-2.072.882-1.9,0-2.338-.35-2.338-1.218v-.252h-2.1v.084C32.76-.98,34.356.14,37.2.14ZM51,0V-1.89H45.164V-3.78h5.628V-5.656H45.164V-7.49H51V-9.38H43.064V0Z" transform="translate(363 49.69)" />
                </g>
              </svg>
            </button>
          </header>

          <div class="c-drawer__main">
            <section class="c-drawer__section">
              <header class="c-drawer__label">
                <h4>CONTENTS</h4>
              </header>
              <nav class="c-drawer__nav" aria-label="メインメニュー">
                <ul class="c-drawer__links">
                  <li
                    v-for="item in brand.nav.main"
                    :key="item.to"
                    :data-status="isCurrent(item) ? 'current' : undefined"
                  >
                    <a
                      v-if="isExternal(item)"
                      :href="item.to"
                      target="_blank"
                      rel="noopener noreferrer"
                      @click="close"
                    >
                      <em>{{ item.label }}</em>
                      <small>{{ drawerJa[item.label] }}</small>
                    </a>
                    <NuxtLink v-else :to="item.to" @click="close">
                      <em>{{ item.label }}</em>
                      <small>{{ drawerJa[item.label] }}</small>
                    </NuxtLink>
                  </li>
                </ul>

                <ul class="c-drawer__sub">
                  <li v-for="item in brand.nav.footer" :key="item.to">
                    <a
                      v-if="isExternal(item)"
                      :href="item.to"
                      target="_blank"
                      rel="noopener noreferrer"
                      @click="close"
                    >
                      <em class="en">{{ subCopy(item).en }}</em>
                      <em class="jp">{{ subCopy(item).jp }}</em>
                      <i aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                          <g transform="translate(-199 -5)">
                            <rect width="14" height="14" transform="translate(199 5)" fill="none" />
                            <path d="M4,0,8,7H0Z" transform="translate(210 8) rotate(90)" fill="#fff" />
                          </g>
                        </svg>
                      </i>
                    </a>
                    <NuxtLink v-else :to="item.to" @click="close">
                      <em class="en">{{ subCopy(item).en }}</em>
                      <em class="jp">{{ subCopy(item).jp }}</em>
                      <i aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                          <g transform="translate(-199 -5)">
                            <rect width="14" height="14" transform="translate(199 5)" fill="none" />
                            <path d="M4,0,8,7H0Z" transform="translate(210 8) rotate(90)" fill="#fff" />
                          </g>
                        </svg>
                      </i>
                    </NuxtLink>
                  </li>
                </ul>
              </nav>
            </section>

            <section class="c-drawer__section">
              <header class="c-drawer__label">
                <h4>OFFICIAL SNS</h4>
              </header>
              <nav class="c-drawer__sns-wrap" aria-label="公式SNS">
                <ul class="c-drawer__sns">
                  <li>
                    <a :href="snsItems[0].href" target="_blank" rel="noopener noreferrer" data-sns="x">
                      <i class="icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                          <title>X(Twitter)</title>
                          <path fill="currentColor" d="M8.914,6.481,14.489,0H13.168L8.327,5.628,4.46,0H0L5.847,8.51,0,15.306H1.321L6.434,9.364l4.084,5.943h4.46L8.913,6.481ZM7.1,8.585l-.592-.847L1.8.995H3.827l3.8,5.442.592.847,4.945,7.073H11.139L7.1,8.585Z" transform="translate(7.409 7.469)" />
                        </svg>
                      </i>
                      <em class="ttl">{{ snsItems[0].handle }}</em>
                    </a>
                  </li>
                  <li>
                    <a :href="snsItems[1].href" target="_blank" rel="noopener noreferrer" data-sns="youtube">
                      <i class="icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                          <title>YouTube</title>
                          <path fill="currentColor" d="M24.46 10.54a2.418 2.418 0 0 0-1.7-1.71c-1.5-.4-7.52-.4-7.52-.4s-6.02 0-7.52.4a2.418 2.418 0 0 0-1.7 1.71 27.228 27.228 0 0 0 0 9.33 2.382 2.382 0 0 0 1.7 1.68c1.5.4 7.52.4 7.52.4s6.02 0 7.52-.4a2.382 2.382 0 0 0 1.7-1.68 27.228 27.228 0 0 0 0-9.33Zm-11.19 7.52v-5.72l5.03 2.86Z" />
                        </svg>
                      </i>
                      <em class="ttl">{{ snsItems[1].handle }}</em>
                    </a>
                  </li>
                </ul>
              </nav>
            </section>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

$drawer-ease: cubic-bezier(0.785, 0.135, 0.15, 0.86);
$drawer-gray: #6a6b76;
$drawer-green: #60ec33;

.c-drawer {
  position: fixed;
  inset: 0;
  z-index: 40;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &[data-status='show'] {
    overflow: auto;
    pointer-events: auto;
  }

  @include breakpoint.mq(max, 768px) {
    opacity: 0;
    transition: opacity 0.4s;

    &[data-status='show'] {
      opacity: 1;
    }

    &::after {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 9;
      display: block;
      box-sizing: border-box;
      border: 6px solid #000;
      pointer-events: none;
    }
  }

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;

    @include breakpoint.mq(min, 769px) {
      &::after {
        content: '';
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1;
        display: block;
        width: 0;
        height: 100%;
        background: $drawer-gray;
        transition: width 0.85s $drawer-ease;
      }
    }
  }

  &[data-status='show'] &__inner {
    @include breakpoint.mq(min, 769px) {
      &::after {
        width: 50%;
      }
    }
  }

  &__bg {
    position: fixed;
    inset: 0;
    z-index: 1;
    cursor: pointer;
    background: #fff;
    transition: background 0.7s $drawer-ease;

    @include breakpoint.mq(min, 769px) {
      background: rgba(255, 255, 255, 0.8);
      opacity: 0;
      transition: opacity 0.3s $drawer-ease, background 0.7s $drawer-ease;
    }

    &:hover {
      background: #ffffff80;
    }
  }

  &[data-status='show'] &__bg {
    @include breakpoint.mq(min, 769px) {
      opacity: 1;
    }
  }

  &__art {
    display: none;
    pointer-events: none;

    @include breakpoint.mq(min, 769px) {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
    }

    > img {
      display: block;
      width: 200%;
      max-width: none;
      height: 100%;
      object-fit: contain;
      object-position: left center;
    }
  }

  &__art-logo {
    position: absolute;
    top: 69.677777%;
    left: 50%;
    z-index: 2;
    width: 72%;
    max-width: 360px;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      height: auto;
    }
  }

  &__contents {
    position: relative;
    z-index: 2;

    @include breakpoint.mq(min, 769px) {
      margin-left: auto;
      padding: 0 40px 60px 80px;
      width: 50%;
      color: #fff;
      filter: drop-shadow(-8px 0 10px rgba(0, 0, 0, 0.1));
      transform: translateX(100%);
      opacity: 0;
      transition: transform 0.7s $drawer-ease, opacity 0.7s $drawer-ease;
    }

    @include breakpoint.mq(max, 768px) {
      padding: 0 5.8411214953% 18.691588785vw;
    }
  }

  &[data-status='show'] &__contents {
    @include breakpoint.mq(min, 769px) {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &__head {
    @include breakpoint.mq(min, 769px) {
      margin-bottom: 50px;
      padding-top: 35px;
    }

    @include breakpoint.mq(min_max, 769px, 1200px) {
      margin-bottom: 4.1666666667vw;
    }

    @include breakpoint.mq(max, 768px) {
      margin-bottom: 11.6822429907vw;
    }
  }

  &__logo {
    margin: 0;

    @include breakpoint.mq(min, 769px) {
      display: none;
    }

    @include breakpoint.mq(max, 768px) {
      padding-top: 4.6728971963vw;
      width: 46.7289719626vw;
    }

    a,
    picture,
    img {
      display: block;
      width: 100%;
    }
  }

  &__close {
    display: block;
    margin: 0 0 0 auto;
    padding: 0;
    background: none;
    border: 0;
    cursor: pointer;
    line-height: 0;

    svg {
      display: block;
      width: 100%;
      height: auto;
    }

    :deep(.bg) {
      fill: #000;
    }

    :deep(rect),
    :deep(.txt) {
      fill: #fff;
    }

    @include breakpoint.mq(min, 769px) {
      width: 24.3333333333%;
      max-width: 146px;
    }

    @include breakpoint.mq(max, 768px) {
      position: fixed;
      top: 4.6vw;
      right: 0;
      z-index: 10;
      width: 34.1121495327vw;
    }
  }

  &__section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 50px;

      @include breakpoint.mq(min_max, 769px, 1200px) {
        margin-bottom: 4.1666666667vw;
      }

      @include breakpoint.mq(max, 768px) {
        margin-bottom: 11.6822429907vw;
      }
    }
  }

  &__label {
    line-height: 1;
    writing-mode: vertical-lr;
    color: $drawer-green;
    letter-spacing: 0.5em;
    opacity: 0;
    font-family: variable.$font-display;
    font-weight: 700;

    h4 {
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
    }

    @include breakpoint.mq(min, 769px) {
      width: 5%;
      font-size: 10px;
    }

    @include breakpoint.mq(min_max, 769px, 1200px) {
      font-size: 0.8333333333vw;
    }

    @include breakpoint.mq(max, 768px) {
      width: 9.2105263158%;
      font-size: 2.3364485981vw;
    }
  }

  &[data-status='show'] &__label {
    opacity: 1;
    letter-spacing: 0.2em;

    @include breakpoint.mq(min, 769px) {
      transition: opacity 1.2s $drawer-ease 0.6s, letter-spacing 1.2s $drawer-ease 0.6s;
    }

    @include breakpoint.mq(max, 768px) {
      transition: opacity 1s $drawer-ease, letter-spacing 1s $drawer-ease;
    }
  }

  &__nav,
  &__sns-wrap {
    @include breakpoint.mq(min, 769px) {
      width: 94%;
      color: #fff;
    }

    @include breakpoint.mq(max, 768px) {
      width: 90.5263157895%;
      color: #000;
    }
  }

  &__links {
    margin: 0 0 35px;
    padding: 0;
    list-style: none;

    @include breakpoint.mq(min_max, 769px, 1200px) {
      margin-bottom: 2.9166666667vw;
    }

    @include breakpoint.mq(max, 768px) {
      margin-bottom: 6.5420560748vw;
    }

    &::after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      margin-top: 35px;
      background: #fff;
      transition: width 1s $drawer-ease 0.6s;

      @include breakpoint.mq(min_max, 769px, 1200px) {
        margin-top: 2.9166666667vw;
      }

      @include breakpoint.mq(max, 768px) {
        margin-top: 6.5420560748vw;
        background: #000;
      }
    }

    li {
      opacity: 0;
      transform: translateX(5%);

      &:not(:last-child) {
        margin-bottom: 20px;

        @include breakpoint.mq(min_max, 769px, 1200px) {
          margin-bottom: 1.6666666667vw;
        }

        @include breakpoint.mq(max, 768px) {
          margin-bottom: 4.6728971963vw;
        }
      }

      &[data-status='current'] a {
        color: $drawer-green;
      }
    }

    a {
      display: block;
      width: fit-content;
      line-height: 1;

      @include breakpoint.mq(min, 769px) {
        color: #fff;
        transition: color 0.2s;

        &:hover {
          color: #000;
        }
      }

      @include breakpoint.mq(max, 768px) {
        color: #000;
      }
    }

    em,
    small {
      display: block;
    }

    em {
      font-family: variable.$font-display;
      font-style: normal;
      font-weight: 700;
      font-size: 40px;

      @include breakpoint.mq(min_max, 769px, 1200px) {
        font-size: 3.3333333333vw;
      }

      @include breakpoint.mq(max, 768px) {
        font-size: 9.3457943925vw;
      }
    }

    small {
      margin-top: 0.35em;
      letter-spacing: 0.08em;
      font-family: 'Noto Sans JP', sans-serif;
      font-weight: 900;
      font-size: 10px;

      @include breakpoint.mq(min_max, 769px, 1200px) {
        font-size: 0.8333333333vw;
      }

      @include breakpoint.mq(max, 768px) {
        font-size: 2.3364485981vw;
      }
    }
  }

  &[data-status='show'] &__links {
    &::after {
      width: 40px;

      @include breakpoint.mq(min_max, 769px, 1200px) {
        width: 3.3333333333vw;
      }

      @include breakpoint.mq(max, 768px) {
        width: 9.3457943925vw;
      }
    }

    li {
      opacity: 1;
      transform: translateX(0);
    }

    @include breakpoint.mq(min, 769px) {
      @for $i from 1 through 7 {
        li:nth-child(#{$i}) {
          transition: opacity 0.3s $drawer-ease #{0.6s + $i * 0.05s}, transform 0.3s $drawer-ease #{0.6s + $i * 0.05s};
        }
      }
    }

    @include breakpoint.mq(max, 768px) {
      @for $i from 1 through 7 {
        li:nth-child(#{$i}) {
          transition: opacity 0.3s $drawer-ease #{0.3s + $i * 0.05s}, transform 0.3s $drawer-ease #{0.3s + $i * 0.05s};
        }
      }
    }
  }

  &__sub {
    margin: 0;
    padding: 0;
    list-style: none;
    opacity: 0;
    transform: translateY(10%);

    @include breakpoint.mq(min, 769px) {
      width: 37.5%;
    }

    @include breakpoint.mq(max, 768px) {
      width: 49.0654205607vw;
    }

    li:not(:last-child) {
      margin-bottom: 8px;

      @include breakpoint.mq(min_max, 769px, 1200px) {
        margin-bottom: 0.6666666667vw;
      }

      @include breakpoint.mq(max, 768px) {
        margin-bottom: 1.8691588785vw;
      }
    }

    a {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding-top: 0.45em;
      padding-bottom: 1.2em;
      border-bottom: 1px solid #000;
      color: #000;
      line-height: 1;

      @include breakpoint.mq(min, 769px) {
        color: #fff;
        border-color: #fff;
        font-size: 13px;
        transition: color 0.3s $drawer-ease, border-color 0.3s $drawer-ease;

        &:hover {
          color: $drawer-green;
          border-color: $drawer-green;

          :deep(path) {
            fill: $drawer-green;
          }
        }
      }

      @include breakpoint.mq(min_max, 769px, 1200px) {
        font-size: 1.0833333333vw;
      }

      @include breakpoint.mq(max, 768px) {
        letter-spacing: 0.08em;
        font-size: 2.8037383178vw;
      }
    }

    .en,
    .jp,
    i {
      display: block;
      line-height: 1;
    }

    .en {
      font-family: variable.$font-display;
      font-style: normal;
      font-weight: 700;
    }

    .jp {
      display: none;
      font-family: 'Noto Sans JP', sans-serif;
      font-style: normal;
      font-weight: 700;
    }

    i {
      width: 12px;

      @include breakpoint.mq(min_max, 769px, 1200px) {
        width: 1vw;
      }

      @include breakpoint.mq(max, 768px) {
        width: 2.8037383178vw;

        :deep(path) {
          fill: #000;
        }
      }
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &[data-status='show'] &__sub {
    opacity: 1;
    transform: translateY(0);

    @include breakpoint.mq(min, 769px) {
      transition: opacity 0.5s $drawer-ease 1s, transform 0.5s $drawer-ease 1s;
    }

    @include breakpoint.mq(max, 768px) {
      transition: opacity 0.5s $drawer-ease 0.6s, transform 0.5s $drawer-ease 0.6s;
    }
  }

  &__sns {
    margin: 0;
    padding: 0;
    list-style: none;
    opacity: 0;
    transform: translateY(20%);

    li:not(:last-child) {
      margin-bottom: 8px;
    }

    a {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .icon {
      display: block;
      width: 46px;
      color: #fff;
      line-height: 0;
      transition: opacity 0.3s $drawer-ease;

      @include breakpoint.mq(min_max, 769px, 1200px) {
        width: 3.8333333333vw;
      }

      @include breakpoint.mq(max, 768px) {
        width: 10.7476635514vw;
        color: #000;
      }

      svg {
        display: block;
        width: 100%;
        height: auto;
      }
    }

    .ttl {
      display: block;
      margin-left: 8px;
      font-family: variable.$font-display;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      color: #fff;

      @include breakpoint.mq(min_max, 769px, 1200px) {
        margin-left: 0.6666666667vw;
        font-size: 1.1666666667vw;
      }

      @include breakpoint.mq(max, 768px) {
        margin-left: 1.8691588785vw;
        font-size: 3.2710280374vw;
        color: #000;
      }
    }

    @include breakpoint.mq(min, 769px) {
      a[data-sns='x']:hover {
        .icon {
          opacity: 0.3;
        }

        .ttl {
          color: #000;
        }
      }

      a[data-sns='youtube'] {
        color: #fff;

        &:hover {
          color: #f00;

          .icon {
            color: inherit;
          }

          .ttl {
            color: #f00;
          }
        }
      }
    }
  }

  &[data-status='show'] &__sns {
    opacity: 1;
    transform: translateY(0);

    @include breakpoint.mq(min, 769px) {
      transition: opacity 0.5s $drawer-ease 1s, transform 0.5s $drawer-ease 1s;
    }

    @include breakpoint.mq(max, 768px) {
      transition: opacity 0.5s $drawer-ease 0.6s, transform 0.5s $drawer-ease 0.6s;
    }
  }
}
</style>
