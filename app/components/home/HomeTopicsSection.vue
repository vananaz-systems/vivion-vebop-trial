<script setup lang="ts">
const { topics } = useTopics()
const latest = computed(() => topics.value.slice(0, LATEST_TOPICS_LIMIT))
</script>

<template>
  <section id="Topics" class="p-indexTopics">
    <div class="p-indexTopics__inner">
      <header class="p-indexTopics__head">
        <h2 class="p-indexTopics__title">TOPICS</h2>
        <NuxtLink to="/topics/" class="p-indexTopics__all" aria-label="ALL TOPICS">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="5" viewBox="0 0 23 5" aria-hidden="true">
            <g transform="translate(-240 -3140)">
              <circle cx="2.5" cy="2.5" r="2.5" transform="translate(240 3140)" fill="#60ec33" />
              <circle cx="2.5" cy="2.5" r="2.5" transform="translate(249 3140)" fill="#60ec33" />
              <circle cx="2.5" cy="2.5" r="2.5" transform="translate(258 3140)" fill="#60ec33" />
            </g>
          </svg>
        </NuxtLink>
      </header>

      <div class="p-indexTopics__list">
        <TopicCard v-for="topic in latest" :key="topic.id" :topic="topic" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.p-indexTopics {
  padding: 11.6822429907vw 0 37.3831775701vw;
  background: variable.$page-bg;

  @include breakpoint.mq(min, 769px) {
    padding: 12.5vw 40px 10vw;
  }

  @include breakpoint.mq(min, 1201px) {
    padding: 150px 40px 120px;
  }

  &__inner {
    @include breakpoint.mq(min, 769px) {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      max-width: 1200px;
      margin-inline: auto;
    }
  }

  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3.5046728972vw;
    padding-inline: 5.8411214953%;

    @include breakpoint.mq(min, 769px) {
      width: 19.1666666667%;
      margin-bottom: 0;
      padding-inline: 0;
    }
  }

  &__title {
    margin: 0;
    color: variable.$black;
    font-family: variable.$font-display;
    font-size: 2.8037383178vw;
    font-weight: 700;
    letter-spacing: 0.25em;
    line-height: 1;
    text-transform: uppercase;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 16px;
    }
  }

  &__all {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 5.3738317757vw;
    aspect-ratio: 1 / 1;

    svg {
      display: block;
      width: 100%;
      height: auto;
    }

    @include breakpoint.mq(min, 769px) {
      display: none;
    }
  }

  &__list {
    display: flex;
    overflow-x: auto;
    padding-inline: 5.8411214953%;
    padding-bottom: 2px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @include breakpoint.mq(min, 769px) {
      display: flex;
      flex-wrap: wrap;
      width: 80.8333333333%;
      overflow: visible;
      padding-inline: 0;
      padding-bottom: 0;
    }
  }

  :deep(.c-topicCard) {
    min-width: 62vw;

    &:not(:last-child) {
      margin-right: 4.2056074766vw;
    }

    @include breakpoint.mq(min, 769px) {
      min-width: 0;
      width: 31.7525773196%;

      &:not(:last-child) {
        margin-right: 2.3711340206%;
      }

      &:nth-child(3n),
      &:last-child {
        margin-right: 0;
      }
    }
  }

  :deep(.c-topicCard__title) {
    font-size: 2.5700934579vw;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 16px;
    }
  }

  :deep(.c-topicCard__footer) {
    font-size: 2.3364485981vw;

    @include breakpoint.mq(min, 769px) {
      font-size: 10px;
    }
  }
}
</style>
