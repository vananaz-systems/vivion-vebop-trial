<script setup lang="ts">
import { aboutPage } from '~/data/pages'

useAboutHashScroll()

const headingLines = aboutPage.heading.split('\n')
</script>

<template>
  <section id="About" class="p-indexAbout">
    <div class="p-indexAbout__inner">
      <header class="p-indexAbout__head">
        <h2 class="p-indexAbout__title">
          <em>ABOUT</em>
          <small>{{ aboutPage.title }}</small>
        </h2>
      </header>

      <div class="p-indexAbout__content">
        <h3 class="p-indexAbout__vertical">
          <template v-for="(line, index) in headingLines" :key="line">
            <span>{{ line }}</span>
            <br v-if="index < headingLines.length - 1">
          </template>
        </h3>

        <div class="p-indexAbout__copy">
          <p>{{ aboutPage.tagline }}</p>
          <p>
            『ビバップ高校』のメンバーたちは、<br>
            それぞれの「好き」や「得意」を武器に、<br class="p-indexAbout__br-sp">今日もやりたい放題活動中！<br>
            これから出会うたくさんの仲間たちと、無限に広がる個性を掛け合わせ、チャレンジし続けていきます。
          </p>
          <aside class="p-indexAbout__deco">
            <h4>
              <img
                src="/images/common/deco/txt_deco_alignleft.svg"
                :alt="aboutPage.english"
                width="170"
                height="20"
                decoding="async"
              >
            </h4>
          </aside>
        </div>

        <div class="p-indexAbout__logos">
          <div class="p-indexAbout__logogroup p-indexAbout__logogroup--s" />
          <div class="p-indexAbout__logogroup p-indexAbout__logogroup--m" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

@keyframes logogroup-s {
  to { background-position: left -40px top 0; }
}

@keyframes logogroup-m {
  to { background-position: left -66px top 0; }
}

.p-indexAbout {
  padding: 26.8691588785vw 0 18.691588785vw;

  @include breakpoint.mq(min, 769px) {
    padding: 13.3333333333vw 40px 16.6666666667vw;
  }

  @include breakpoint.mq(min, 1201px) {
    padding: 160px 40px 200px;
  }

  &__inner {
    position: relative;
    max-width: 1000px;
    margin-inline: auto;
  }

  &__head {
    margin-bottom: 9.3457943925vw;
    text-align: center;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 1.6666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 20px;
    }

    @include breakpoint.mq(sp) {
      text-align: left;
    }
  }

  &__title {
    em,
    small {
      display: block;
      line-height: 1;
      font-family: variable.$font-display;
      font-style: normal;
      font-weight: 700;
    }

    em {
      font-size: 15.8878504673vw;
      color: variable.$black;

      @include breakpoint.mq(min, 769px) {
        font-size: 7.6666666667vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 92px;
      }
    }

    small {
      font-size: 3.5046728972vw;
      letter-spacing: 0.07em;
      color: #6a6b76;

      @include breakpoint.mq(sp) {
        padding-inline: 5.8411214953%;
      }

      @include breakpoint.mq(min, 769px) {
        font-size: 1.5vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 18px;
      }
    }
  }

  &__content {
    @include breakpoint.mq(min, 769px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  &__vertical {
    display: none;

    @include breakpoint.mq(min, 769px) {
      display: block;
      order: 2;
      font-family: "Noto Sans JP", sans-serif;
      font-size: 2.8333333333vw;
      font-weight: 700;
      line-height: 1.8;
      writing-mode: vertical-rl;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 34px;
    }

    span {
      background: variable.$white;
      padding-inline: 0.25em;
    }
  }

  &__copy {
    letter-spacing: 0.08em;
    line-height: 1.95;
    font-family: "Noto Sans JP", sans-serif;
    font-weight: 700;
    font-size: 3.738317757vw;

    @include breakpoint.mq(sp) {
      padding-inline: 5.8411214953%;
    }

    @include breakpoint.mq(min, 769px) {
      position: relative;
      order: 1;
      width: 79%;
      padding-top: 1.8333333333vw;
      font-size: 1.5vw;

      &::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        display: block;
        width: 13.9240506329%;
        max-width: 110px;
        aspect-ratio: 109 / 124.1;
        background: url("/images/common/logo-icon.png") left top no-repeat;
        background-size: 100% auto;
        transform: translate(50%, 20%);
      }
    }

    @include breakpoint.mq(min, 1201px) {
      padding-top: 22px;
      font-size: 18px;
    }

    p:not(:last-child) {
      margin-bottom: 2em;
    }
  }

  &__br-sp {
    @include breakpoint.mq(min, 769px) {
      display: none;
    }
  }

  &__deco {
    padding-top: 0.4em;

    @include breakpoint.mq(sp) {
      position: absolute;
      top: 6.2vw;
      right: 0;
      width: 39.7196261682vw;
    }

    h4 {
      margin: 0;

      @include breakpoint.mq(min, 769px) {
        width: 25.3164556962%;
      }
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &__logos {
    display: none;

    @include breakpoint.mq(sp) {
      display: block;
    }
  }

  &__logogroup {
    background-image: url("/images/common/logo-icon-loop.png");
    background-position: left top;
    background-repeat: repeat-x;

    &:not(:last-child) {
      margin-bottom: 1.8691588785vw;
    }

    &--s {
      height: 36px;
      background-size: 40px auto;
      animation: logogroup-s 4s linear infinite;
    }

    &--m {
      height: 60px;
      background-size: 66px auto;
      animation: logogroup-m 6s linear infinite reverse;
    }
  }
}
</style>
