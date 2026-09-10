<script setup lang="ts">
import type { Topic } from '#shared/types/topic'

defineProps<{
  topic: Topic
}>()
</script>

<template>
  <article class="c-topicCard">
    <NuxtLink
      :to="`/topics/${topic.slug}/`"
      class="c-topicCard__link"
      :aria-label="topic.title"
    />
    <div class="c-topicCard__inner">
      <time class="c-topicCard__release" :datetime="topic.publishedAt">
        {{ formatDate(topic.publishedAt) }}
      </time>
      <h3 class="c-topicCard__title">{{ topic.title }}</h3>
      <footer class="c-topicCard__footer">
        <em>DETAIL →</em>
      </footer>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.c-topicCard {
  position: relative;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid variable.$black;
  }

  &__link {
    position: absolute;
    inset: 0;
    z-index: 3;
  }

  &__inner {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    box-sizing: border-box;
    height: 100%;
    padding: 5.8411214953vw 4.6728971963vw;
    background: variable.$white;
    border: 1px solid variable.$black;

    @include breakpoint.mq(min, 769px) {
      padding: 2.9166666667vw 2.0833333333vw 2.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      padding: 35px 25px 28px;
    }
  }

  &__release {
    display: block;
    width: 100%;
    margin-bottom: 0.75em;
    color: #6a6b76;
    font-family: variable.$font-display;
    font-size: 2.3364485981vw;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1;

    @include breakpoint.mq(min, 769px) {
      font-size: 1vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 12px;
    }
  }

  &__title {
    width: 100%;
    margin: 0 0 auto;
    padding-bottom: 4.2056074766vw;
    color: variable.$black;
    font-family: "Noto Sans JP", sans-serif;
    font-size: 3.2710280374vw;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.05em;
    line-height: 1.75;
    text-align: left;

    @include breakpoint.mq(min, 769px) {
      padding-bottom: 2.5vw;
      font-size: 1.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      padding-bottom: 30px;
      font-size: 16px;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: auto;
    font-size: 10px;

    &::before {
      content: "";
      display: block;
      flex-grow: 1;
      height: 1px;
      background: #60ec33;
    }

    em {
      display: block;
      margin-left: 0.5em;
      color: #60ec33;
      font-family: variable.$font-display;
      font-style: normal;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
  }

  @include breakpoint.mq(min, 769px) {
    transition: transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

    &::after {
      transition: top 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86),
        left 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }

    &:hover {
      transform: scale(1.04);

      &::after {
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
