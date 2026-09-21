<script setup lang="ts">
const NEWS_TAG = 'news'

const props = defineProps<{
  activeTag?: string
}>()

const { filterTopicsByTag } = useTopics()

const visibleTopics = computed(() =>
  filterTopicsByTag(props.activeTag || null),
)

/** Official `#Main` fade: `$(#Main).animate({ opacity: 1 }, 1200, "easeInOutCirc")`. */
const revealed = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    revealed.value = true
  })
})
</script>

<template>
  <div class="p-topics" :class="{ 'is-revealed': revealed }">
    <AppPageHeader title="TOPICS" />

    <section class="p-topics__body" id="Topics">
      <nav class="p-topics__category" aria-label="CATEGORY">
        <header class="p-topics__categoryHead">
          <h2 class="p-topics__categoryTitle">
            <i class="p-topics__categoryIcon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <g transform="translate(-199 -5)">
                  <rect width="14" height="14" transform="translate(199 5)" fill="none" />
                  <path d="M4,0,8,7H0Z" transform="translate(210 8) rotate(90)" fill="#60ec33" />
                </g>
              </svg>
            </i>
            <em>CATEGORY</em>
          </h2>
        </header>
        <ul class="p-topics__filters">
          <li :data-status="!activeTag ? 'current' : undefined">
            <NuxtLink to="/topics/">ALL</NuxtLink>
          </li>
          <li :data-status="activeTag === NEWS_TAG ? 'current' : undefined">
            <NuxtLink to="/tag/news/">#NEWS</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="p-topics__list" data-type="archive">
        <TopicCard v-for="topic in visibleTopics" :key="topic.id" :topic="topic" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.p-topics {
  background: variable.$page-bg;
  opacity: 0;

  &.is-revealed {
    opacity: 1;
    transition: opacity 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  &__body {
    padding: 7.0093457944vw 0 17.523364486vw;

    @include breakpoint.mq(min, 769px) {
      padding: 4.5833333333vw 40px 0;
    }

    @include breakpoint.mq(min, 1201px) {
      padding-top: 55px;
    }
  }

  &__category {
    margin-bottom: 9.3457943925vw;
    padding-inline: 5.8411214953%;

    @include breakpoint.mq(min, 769px) {
      max-width: 1200px;
      margin-inline: auto;
      margin-bottom: 5vw;
      padding-inline: 0;
      margin-top: 2px;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 60px;
    }
  }

  &__categoryHead {
    margin-bottom: 2.8037383178vw;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 1.25vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 16.5px;
    }
  }

  &__categoryTitle {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    color: variable.$black;

    em {
      display: block;
      margin-left: 0.4em;
      font-family: variable.$font-display;
      font-size: 2.3364485981vw;
      font-style: normal;
      font-weight: 700;
      letter-spacing: 0.08em;
      line-height: 1;
      font-optical-sizing: auto;

      @include breakpoint.mq(min, 769px) {
        font-size: 1vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 12px;
      }
    }
  }

  &__categoryIcon {
    display: block;
    width: 2.8037383178vw;
    line-height: 0;

    @include breakpoint.mq(min, 769px) {
      width: 1.5vw;
    }

    @include breakpoint.mq(min, 1201px) {
      width: 18px;
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    font-family: variable.$font-display;
    font-size: 3.5046728972vw;
    font-weight: 700;
    font-style: normal;
    font-optical-sizing: auto;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.5vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 18px;
    }

    li {
      position: relative;
      letter-spacing: 0.05em;
      line-height: 1;

      &:not(:last-child) {
        margin-right: 2.8037383178vw;
        padding-right: 2.8037383178vw;

        @include breakpoint.mq(min, 769px) {
          margin-right: 1.25vw;
          padding-right: 1.25vw;
        }

        @include breakpoint.mq(min, 1201px) {
          margin-right: 15px;
          padding-right: 15px;
        }

        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          display: block;
          width: 1px;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
        }
      }

      &[data-status='current'] {
        pointer-events: none;

        a {
          position: relative;
          color: #60ec33;

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            background: #60ec33;
            transform: translateY(-50%);
          }
        }
      }

      a {
        display: block;
        color: variable.$black;

        @include breakpoint.mq(min, 769px) {
          transition: color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

          &:hover {
            color: #60ec33;
          }
        }
      }
    }
  }

  &__list {
    padding-inline: 5.8411214953%;

    @include breakpoint.mq(min, 769px) {
      display: flex;
      flex-wrap: wrap;
      max-width: 1200px;
      margin-inline: auto;
      padding-inline: 0;
      margin-bottom: 12.1vw;
    }
  }

  :deep(.c-topicCard) {
    width: 100%;
    min-width: 0;

    &:not(:last-child) {
      margin-bottom: 3.738317757vw;
    }

    @include breakpoint.mq(min, 769px) {
      width: 31%;
      margin-right: 3.0833333333%;
      margin-bottom: 0;

      &:nth-child(3n) {
        margin-right: 0;
      }

      &:nth-child(n + 4) {
        margin-top: 3.1666666667vw;
      }

      &:not(:last-child) {
        margin-bottom: 0;
      }
    }

    @include breakpoint.mq(min, 1201px) {
      &:nth-child(n + 4) {
        margin-top: 38px;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .p-topics {
    opacity: 1;
    transition: none;
  }
}
</style>
