<script setup lang="ts">
await loadTopicsData()

import { presentRulesPage } from '~/data/pages'

useSeo({
  title: presentRulesPage.seoTitle,
  description: presentRulesPage.seoTitle,
})

/** Official `#Main` fade: `$(#Main).animate({ opacity: 1 }, 1200, "easeInOutCirc")`. */
const revealed = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    revealed.value = true
  })
})
</script>

<template>
  <div class="p-present" :class="{ 'is-revealed': revealed }">
    <AppPageHeader :title="presentRulesPage.title" />

    <article class="p-present__article">
      <header class="p-present__lead">
        <h2>
          <span>{{ presentRulesPage.lead[0] }}<br>{{ presentRulesPage.lead[1] }}</span>
        </h2>
      </header>

      <div class="p-present__doc">
        <section class="p-present__section">
          <h3 class="p-present__heading">{{ presentRulesPage.fanLetter.heading }}</h3>

          <div class="p-present__body">
            <div class="p-present__block">
              <p>{{ presentRulesPage.fanLetter.intro }}</p>
            </div>
            <div class="p-present__frame">
              <header class="p-present__frame-label">
                <em>{{ presentRulesPage.fanLetter.address.label }}</em>
              </header>
              <div class="p-present__frame-body">
                <p>
                  <template
                    v-for="(line, index) in presentRulesPage.fanLetter.address.lines"
                    :key="line"
                  >
                    <br v-if="index > 0">{{ line }}
                  </template>
                </p>
                <p>{{ presentRulesPage.fanLetter.address.note }}</p>
              </div>
            </div>
            <div class="p-present__block">
              <p>{{ presentRulesPage.fanLetter.eligibleHeading }}</p>
            </div>
            <div class="p-present__block">
              <p v-for="paragraph in presentRulesPage.fanLetter.eligible" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
            <div class="p-present__block p-present__block--break">
              <p>{{ presentRulesPage.fanLetter.acceptedHeading }}</p>
            </div>
            <ul class="p-present__list">
              <li v-for="item in presentRulesPage.fanLetter.accepted" :key="item">
                {{ item }}
              </li>
            </ul>
            <div class="p-present__block">
              <p>{{ presentRulesPage.fanLetter.notesHeading }}</p>
            </div>
            <ul class="p-present__list">
              <li v-for="item in presentRulesPage.fanLetter.notes" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </section>

        <section class="p-present__section">
          <h3 class="p-present__heading">{{ presentRulesPage.present.heading }}</h3>

          <div class="p-present__body">
            <div class="p-present__block">
              <p v-for="paragraph in presentRulesPage.present.paragraphs" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
            <div class="p-present__block">
              <p>{{ presentRulesPage.present.eventHeading }}</p>
            </div>
            <div class="p-present__block">
              <p v-for="paragraph in presentRulesPage.present.eventParagraphs" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>

    <HomeTopicsSection />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.p-present {
  background: variable.$page-bg;
  opacity: 0;

  &.is-revealed {
    opacity: 1;
    transition: opacity 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  &__article {
    padding-top: 9.3457943925vw;
    padding-bottom: 11.6822429907vw;
    padding-left: 5.8411214953%;
    padding-right: 5.8411214953%;

    @include breakpoint.mq(min, 769px) {
      padding-top: 5.8333333333vw;
      padding-bottom: 0;
      padding-left: 40px;
      padding-right: 40px;
    }

    @include breakpoint.mq(min, 1201px) {
      padding-top: 70px;
    }
  }

  &__lead,
  &__doc {
    margin-inline: auto;

    @include breakpoint.mq(min, 769px) {
      max-width: 834px;
    }
  }

  &__lead {
    margin-bottom: 2em;
    color: variable.$black;
    font-family: "Noto Sans JP", sans-serif;
    font-optical-sizing: auto;
    font-size: 6.0747663551vw;
    font-style: normal;
    font-weight: 900;
    line-height: 1.7;

    h2 {
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
    }

    span {
      background: linear-gradient(transparent 70%, rgba(96, 236, 51, 0.4) 70%);
    }

    @include breakpoint.mq(min, 769px) {
      font-size: 2.6666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 3.2rem;
    }
  }

  &__section {
    &:not(:last-child) {
      margin-bottom: 7.0093457944vw;
      padding-bottom: 7.0093457944vw;

      &::after {
        content: "";
        display: block;
        width: 9.3457943925vw;
        height: 1px;
        margin-top: 7.0093457944vw;
        background: variable.$black;
      }
    }

    @include breakpoint.mq(min, 769px) {
      &:not(:last-child) {
        margin-bottom: 6.6666666667vw;
        padding-bottom: 0;

        &::after {
          display: none;
        }
      }
    }

    @include breakpoint.mq(min, 1201px) {
      &:not(:last-child) {
        margin-bottom: 80px;
      }
    }
  }

  &__heading {
    margin: 0 0 0.75em;
    padding-bottom: 0.4em;
    color: variable.$black;
    font-family: "Noto Sans JP", sans-serif;
    font-optical-sizing: auto;
    font-size: 4.6728971963vw;
    font-style: normal;
    font-weight: 700;
    line-height: 1.4;

    &::after {
      content: "";
      display: block;
      width: 4.6728971963vw;
      height: 2px;
      margin-top: 0.5em;
      background: variable.$black;
    }

    @include breakpoint.mq(min, 769px) {
      font-size: 2.1666666667vw;

      &::after {
        width: 1.6666666667vw;
      }
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 2.6rem;

      &::after {
        width: 20px;
      }
    }
  }

  &__body {
    color: variable.$black;
    font-family: "Noto Sans JP", sans-serif;
    font-size: 3.0373831776vw;
    font-weight: 400;
    line-height: 1.8;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 1.6rem;
    }
  }

  &__block {
    p {
      margin: 0;
      letter-spacing: 0.05em;
      font-family: variable.$font-sans;
    }

    &--break {
      /* Live sibling `<br>` sits on `article` (body 1rem × lh 1.8), not on scaled body copy. */
      margin-top: calc(1rem * 1.8);
    }
  }

  /* Official `.md-frame[data-bgcolor=white]` — padding em is of the frame font-size. */
  &__frame {
    /* Live sibling `<br>` sits on `article` (body 1rem × lh 1.8), not on scaled body copy. */
    margin: calc(1rem * 1.8) 0;
    padding: 2em;
    border: solid 1px #000;
    background: #fff;
    font-size: 3.2710280374vw;

    @include breakpoint.mq(min, 769px) {
      padding: 2em 3em;
      font-size: 1.25vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 1.5rem;
    }
  }

  &__frame-label {
    width: fit-content;
    margin: 0 0 0.85em;
    letter-spacing: 0.05em;
    line-height: 1.4;
    background: linear-gradient(transparent 70%, rgba(96, 236, 51, 0.4) 70%);
    font-family: variable.$font-dela;
    font-size: 5.1401869159vw;
    font-style: normal;
    font-weight: 400;

    em {
      font-family: inherit;
      font-style: inherit;
      font-weight: inherit;
    }

    @include breakpoint.mq(min, 769px) {
      font-size: 2vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 2.4rem;
    }
  }

  &__frame-body {
    /* Official `.md-frame__cont` inherits body stack, not the Noto-only `__body`. */
    font-family: variable.$font-sans;
    -webkit-font-feature-settings: "palt";
    font-feature-settings: "palt";

    p {
      margin: 0;
      font-family: inherit;
      font-weight: 700;
      /* Official `article p` !important overrides frame 1.25vw / 3.271vw below 1201. */
      font-size: 3.0373831776vw;

      @include breakpoint.mq(min, 769px) {
        font-size: 1.3333333333vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 1.5rem;
      }
    }

    p:not(:last-child) {
      margin-bottom: 0.85em;
    }
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: disc;

    &:not(:first-child) {
      margin-top: 1.5em;
    }

    &:not(:last-child) {
      margin-bottom: 1.5em;
    }

    li {
      margin-left: 1.5em;
      font-weight: 600;
    }

    li:not(:last-child) {
      margin-bottom: 0.45em;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .p-present {
    opacity: 1;
    transition: none;
  }
}
</style>
