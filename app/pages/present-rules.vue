<script setup lang="ts">
import { presentRulesPage } from '~/data/pages'

useSeo({
  title: presentRulesPage.seoTitle,
  description: presentRulesPage.seoTitle,
})
</script>

<template>
  <div class="p-present">
    <AppPageHeader :title="presentRulesPage.title" />

    <article class="p-present__article">
      <header class="p-present__lead">
        <h2>
          <span>
            {{ presentRulesPage.lead[0] }}<br>
            {{ presentRulesPage.lead[1] }}
          </span>
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
              <p class="p-present__frame-label">
                <em>{{ presentRulesPage.fanLetter.address.label }}</em>
              </p>
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

            <div class="p-present__block">
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
    max-width: 834px;
    margin-inline: auto;
  }

  &__lead {
    margin-bottom: 2em;
    color: variable.$black;
    font-family: "Noto Sans JP", sans-serif;
    font-size: 6.0747663551vw;
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
      font-size: 32px;
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
    font-size: 4.6728971963vw;
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
      font-size: 26px;

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
    letter-spacing: 0.05em;
    line-height: 2;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 16px;
    }
  }

  &__block {
    p {
      margin: 0;
    }
  }

  &__block + &__block,
  &__block + &__frame,
  &__frame + &__block {
    margin-top: 1em;
  }

  &__frame {
    margin: 0;
    padding: 2em;
    background: variable.$white;
    border: 1px solid variable.$black;

    @include breakpoint.mq(min, 769px) {
      padding: 2em 3em;
    }
  }

  &__frame-label {
    width: fit-content;
    margin: 0 0 0.85em;
    background: linear-gradient(transparent 70%, rgba(96, 236, 51, 0.4) 70%);
    font-family: variable.$font-dela;
    font-size: 5.1401869159vw;
    font-weight: 400;
    letter-spacing: 0.05em;
    line-height: 1.4;

    em {
      font-family: inherit;
      font-style: normal;
      font-weight: inherit;
    }

    @include breakpoint.mq(min, 769px) {
      font-size: 2vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 24px;
    }
  }

  &__frame-body {
    font-size: 3.2710280374vw;

    p {
      margin: 0;
      font-weight: 700;
    }

    p:not(:last-child) {
      margin-bottom: 0.85em;
    }

    @include breakpoint.mq(min, 769px) {
      font-size: 1.25vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 15px;
    }
  }

  &__list {
    margin: 1.5em 0;
    padding: 0;
    list-style: disc;

    li {
      margin-left: 1.5em;
      font-weight: 600;
    }

    li:not(:last-child) {
      margin-bottom: 0.45em;
    }
  }
}
</style>
