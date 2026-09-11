<script setup lang="ts">
const { brand } = useSite()
const config = useRuntimeConfig()
const parentSiteUrl = (config.public.parentSiteUrl as string) || 'https://vhs-city.com/'
const pageUrl = brand.siteUrl
const shareText = encodeURIComponent(brand.siteName)

const shareLinks = [
  {
    id: 'x',
    href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(pageUrl)}`,
    webp: '/images/common/share-x.webp',
    src: '/images/common/share-x.png',
    alt: 'X（Twitter）でシェアする',
  },
  {
    id: 'facebook',
    href: `https://www.facebook.com/share.php?u=${encodeURIComponent(pageUrl)}`,
    webp: '/images/common/share-facebook.webp',
    src: '/images/common/share-facebook.png',
    alt: 'Facebookでシェアする',
  },
  {
    id: 'line',
    href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(pageUrl)}`,
    webp: '/images/common/share-line.webp',
    src: '/images/common/share-line.png',
    alt: 'LINEでシェアする',
  },
]

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer id="Foot" class="c-footer">
    <div class="c-footer__inner">
      <div class="c-footer__body">
        <div class="c-footer__info">
          <div class="c-footer__logos">
            <div class="c-footer__logo c-footer__logo--vhs">
              <a
                :href="parentSiteUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VHS公式サイト"
              >
                <picture>
                  <source type="image/webp" srcset="/images/common/logo-vhs.webp">
                  <img
                    src="/images/common/logo-vhs.webp"
                    alt="VHS City"
                    loading="lazy"
                    decoding="async"
                  >
                </picture>
              </a>
            </div>
            <div class="c-footer__logo c-footer__logo--vebop">
              <NuxtLink to="/">
                <picture>
                  <source type="image/webp" srcset="/images/common/logo.webp">
                  <img
                    :src="brand.logo.white"
                    :alt="brand.siteName"
                    loading="lazy"
                    decoding="async"
                  >
                </picture>
              </NuxtLink>
            </div>
          </div>

          <nav class="c-footer__share" aria-label="シェア">
            <em class="c-footer__share-title">SHARE</em>
            <ul class="c-footer__share-list">
              <li v-for="link in shareLinks" :key="link.id">
                <a
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <picture>
                    <source type="image/webp" :srcset="link.webp">
                    <img :src="link.src" :alt="link.alt" loading="lazy" decoding="async">
                  </picture>
                </a>
              </li>
            </ul>
          </nav>

          <nav class="c-footer__nav" aria-label="フッターメニュー">
            <ul>
              <li v-for="item in brand.nav.footer" :key="item.to">
                <a
                  v-if="item.external"
                  :href="item.to"
                  class="c-footer__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <em>{{ item.label }}</em>
                  <i aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                      <g transform="translate(-199 -5)">
                        <rect width="14" height="14" transform="translate(199 5)" fill="none" />
                        <path d="M4,0,8,7H0Z" transform="translate(210 8) rotate(90)" fill="#fff" />
                      </g>
                    </svg>
                  </i>
                </a>
                <NuxtLink v-else :to="item.to" class="c-footer__link">
                  <em>{{ item.label }}</em>
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
        </div>

        <button
          class="c-footer__pagetop"
          type="button"
          aria-label="PAGE TOP"
          @click="scrollTop"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30.765" height="130" viewBox="0 0 30.765 130" aria-hidden="true">
            <g transform="translate(-378 -6520)">
              <title>PAGE TOP</title>
              <g transform="translate(-10 10)">
                <rect width="2" height="125" transform="translate(396 6515)" />
                <rect width="18" height="2" transform="translate(388 6510)" />
              </g>
              <path d="M6.066,0V4.776c0,1.642-.739,2.249-2.044,2.249-1.124,0-1.995-.591-1.995-2.233V2.314H.205V0ZM3.455,2.314V3.808c0,.583.181.8.607.8.443,0,.624-.222.624-.8V2.314ZM6.066,10.4v2.84l-5.86,2.5V13.269l.673-.246V10.61l-.673-.246V7.9ZM4.293,11.825v-.017l-1.986-.689v1.4Zm-.747,9.569v3.291H.205v-.993l.533-.263A3.7,3.7,0,0,1,0,20.746c0-1.625.4-3.833,3.111-3.833,2.569,0,3.16,2.052,3.16,3.825,0,2.577-.706,3.8-2.216,3.981v-2.61a.833.833,0,0,0,.6-.451,1.807,1.807,0,0,0,.14-.788c0-.944-.468-1.543-1.658-1.543a1.5,1.5,0,0,0-1.658,1.724,1.2,1.2,0,0,0,.738,1.3v-.952Zm2.52,5.671V33.3H4.637V29.38H3.849v3.636H2.421V29.38H1.633V33.3H.205v-6.23ZM4.588,41.74V39.6H6.066v6.6H4.588V44.055H.205V41.74ZM6.27,51.817c0,1.4-.1,4.005-3.135,4.005S0,53.22,0,51.817s.1-4.006,3.135-4.006,3.135,2.6,3.135,4.006m-4.793,0c0,.944.468,1.543,1.658,1.543s1.658-.6,1.658-1.543-.468-1.543-1.658-1.543-1.658.6-1.658,1.543m4.588,6.156V62.75C6.066,64.391,5.327,65,4.022,65c-1.124,0-1.995-.591-1.995-2.233V60.288H.205V57.973Zm-2.61,2.315v1.494c0,.583.181.8.607.8.443,0,.624-.222.624-.8V60.288Z" transform="translate(402.494 6520.001)" />
            </g>
          </svg>
        </button>

        <small class="c-footer__copy">{{ brand.copyright }}</small>
      </div>

      <div class="c-footer__bar" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.c-footer {
  position: relative;
  z-index: 2;
  background: variable.$white;
  color: #000;
  padding: 40vw 0 14.0186915888vw;

  @include breakpoint.mq(min, 769px) {
    padding: 7.0833333333vw 40px 6.25vw;
  }

  @include breakpoint.mq(min, 1201px) {
    padding: 85px 40px 75px;
  }

  &__inner {
    @include breakpoint.mq(sp) {
      padding-right: 5.8411214953%;
      padding-left: 5.8411214953%;
    }
  }

  &__body {
    position: relative;

    @include breakpoint.mq(min, 769px) {
      max-width: 1200px;
      margin-right: auto;
      margin-left: auto;
    }
  }

  &__info {
    width: 71.0526315789%;

    @include breakpoint.mq(min, 769px) {
      width: 87.5%;
    }
  }

  &__logos {
    display: flex;
    flex-direction: column;
    margin-bottom: 6.5420560748vw;

    @include breakpoint.mq(min, 769px) {
      flex-direction: row;
      align-items: center;
      gap: 20px;
      margin-bottom: 2.6666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 32px;
    }
  }

  &__logo {
    img {
      width: 100%;
      height: auto;
      max-width: 100%;
      vertical-align: bottom;
    }

    &--vhs {
      width: 55%;
      margin-bottom: 6.5420560748vw;

      @include breakpoint.mq(min, 769px) {
        width: 14.3%;
        margin-bottom: 0;
      }
    }

    &--vebop {
      width: 100%;

      @include breakpoint.mq(min, 769px) {
        width: 25.7142857143%;
      }
    }
  }

  &__share {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 6.5420560748vw;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 4.1666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 50px;
    }
  }

  &__share-title {
    margin-right: 1em;
    font-family: variable.$font-display-medium;
    font-size: 2.3364485981vw;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.2em;

    @include breakpoint.mq(min, 769px) {
      font-size: 0.8333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 10px;
    }
  }

  &__share-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    li {
      width: 8.8785046729vw;

      @include breakpoint.mq(min, 769px) {
        width: 3.1666666667vw;
      }

      @include breakpoint.mq(min, 1201px) {
        width: 38px;
      }

      &:not(:last-child) {
        margin-right: 3.0373831776vw;

        @include breakpoint.mq(min, 769px) {
          margin-right: 1.0833333333vw;
        }

        @include breakpoint.mq(min, 1201px) {
          margin-right: 13px;
        }
      }
    }

    a {
      display: block;

      @include breakpoint.mq(min, 769px) {
        transition: opacity 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

        &:hover {
          opacity: 0.5;
        }
      }
    }

    img {
      width: 100%;
      height: auto;
      vertical-align: bottom;
    }
  }

  &__nav {
    ul {
      @include breakpoint.mq(min, 769px) {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
      }
    }

    li {
      letter-spacing: 0.08em;
      font-size: 2.8037383178vw;

      @include breakpoint.mq(min, 769px) {
        width: 19.0476190476%;
        letter-spacing: 0;
        font-size: 1.0833333333vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 13px;
      }

      &:not(:last-child) {
        margin-bottom: 2.3364485981vw;

        @include breakpoint.mq(min, 769px) {
          margin-right: 2.380952381%;
          margin-bottom: 0;
        }
      }
    }
  }

  &__link {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-top: 0.45em;
    padding-bottom: 1.2em;
    border-bottom: 1px solid #000;
    color: #000;
    line-height: 1;

    @include breakpoint.mq(min, 769px) {
      transition: color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86),
        border-color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

      &:hover {
        color: #60ec33;
        border-color: #60ec33;

        i svg path {
          fill: #60ec33;
        }
      }
    }

    em,
    i,
    svg {
      display: block;
      line-height: 1;
    }

    em {
      font-family: "Noto Sans JP", sans-serif;
      font-style: normal;
      font-weight: 700;
    }

    i {
      width: 2.8037383178vw;
      vertical-align: middle;

      @include breakpoint.mq(min, 769px) {
        width: 1vw;
      }

      @include breakpoint.mq(min, 1201px) {
        width: 12px;
      }
    }

    svg {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }

    svg path {
      fill: #000;

      @include breakpoint.mq(min, 769px) {
        transition: fill 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
      }
    }
  }

  &__pagetop {
    position: absolute;
    top: 2.5vw;
    right: 0;
    display: block;
    width: 7.0093457944vw;
    margin: 0;
    padding: 0;
    background: none;
    border: 0;
    cursor: pointer;

    @include breakpoint.mq(min, 769px) {
      top: 0;
      width: 2.5vw;
      transition: opacity 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

      &:hover {
        opacity: 0.5;
      }
    }

    @include breakpoint.mq(min, 1201px) {
      width: 30px;
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      vertical-align: bottom;
    }
  }

  &__copy {
    position: absolute;
    right: 0;
    bottom: -30px;
    display: block;
    font-family: variable.$font-display;
    font-size: 2.3364485981vw;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.05em;
    line-height: 1;
    text-align: right;

    @include breakpoint.mq(min, 769px) {
      font-size: 1vw;
      letter-spacing: 0.08em;
      transform: translateY(-50%);
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 12px;
    }
  }

  &__bar {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    pointer-events: none;

    i {
      display: block;
      width: 20%;
      height: 4px;

      &:nth-child(1) {
        background: #ffeb02;
      }

      &:nth-child(2) {
        background: #60ec33;
      }

      &:nth-child(3) {
        background: #369aff;
      }

      &:nth-child(4) {
        background: #790dff;
      }

      &:nth-child(5) {
        background: #ff04a9;
      }
    }
  }
}
</style>
