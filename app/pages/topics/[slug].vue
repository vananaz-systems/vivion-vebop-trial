<script setup lang="ts">
const route = useRoute()
const { getTopicBySlug } = useTopics()
const topic = computed(() => getTopicBySlug(String(route.params.slug)))

if (!topic.value) {
  throw createError({ statusCode: 404, statusMessage: 'Topic not found' })
}

useSeo({
  title: topic.value.title,
  description: toPlainText(topic.value.content),
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
  <div v-if="topic" class="p-topicDetail" :class="{ 'is-revealed': revealed }">
    <AppPageHeader title="TOPICS" />

    <div class="p-topicDetail__post">
      <header class="p-topicDetail__header">
        <time class="p-topicDetail__release" :datetime="topic.publishedAt">
          {{ formatDate(topic.publishedAt) }}
        </time>
        <h1 class="p-topicDetail__title">{{ topic.title }}</h1>
      </header>

      <picture v-if="topic.featuredImage" class="p-topicDetail__featured">
        <img
          :src="topic.featuredImage.url"
          :alt="topic.title"
          :width="topic.featuredImage.width"
          :height="topic.featuredImage.height"
          loading="lazy"
          decoding="async"
        >
      </picture>

      <main class="p-topicDetail__body">
        <div class="p-topicDetail__inner" v-html="topic.content" />
      </main>
    </div>

    <footer class="p-topicDetail__footer">
      <NuxtLink to="/topics/">ニュース一覧へ</NuxtLink>
    </footer>

    <HomeTopicsSection />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.p-topicDetail {
  background: variable.$page-bg;
  opacity: 0;

  &.is-revealed {
    opacity: 1;
    transition: opacity 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  // Official `#Topics` + `.md-post`
  &__post {
    padding-top: 7.0093457944vw;

    @include breakpoint.mq(min, 769px) {
      padding: 4.5833333333vw 40px 0;
    }

    @include breakpoint.mq(min, 1201px) {
      padding-top: 55px;
    }
  }

  &__header,
  &__body {
    @include breakpoint.mq(max, 768px) {
      padding-inline: 5.8411214953%;
    }

    @include breakpoint.mq(min, 769px) {
      max-width: 1000px;
      margin-inline: auto;
    }
  }

  &__header {
    margin-bottom: 0;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 2.9166666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 35px;
    }
  }

  &__release {
    display: block;
    color: variable.$black;
    font-family: variable.$font-display;
    font-size: 2.8037383178vw;
    font-weight: 700;
    font-style: normal;
    // letter-spacing: 0.08em;
    // line-height: 1;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 16px;
    }

    // Official `.md-post > header > time:after`
    &::after {
      content: "UPDATE";
      margin-left: 0.75em;
      letter-spacing: 0.15em;
      color: #60ec33;
      font-size: 0.8em;
      vertical-align: top;
    }
  }

  &__title {
    margin: 0.2em 0 0;
    color: variable.$black;
    font-family: "Noto Sans JP", sans-serif;
    font-size: 6.0747663551vw;
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.3;

    @include breakpoint.mq(min, 769px) {
      margin-top: 0;
      font-size: 2.8333333333vw;
      line-height: 1.7;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 34px;
    }
  }

  // Official `.md-post > picture`
  &__featured {
    display: block;
    margin-inline: auto;
    margin-top: 3.35em;

    @include breakpoint.mq(min, 769px) {
      max-width: 1200px;
      margin-top: 0;
    }

    img {
      display: block;
      width: auto;
      max-width: 100%;
      margin-inline: auto;
      vertical-align: bottom;
      object-fit: contain;
      height: 100%;

    }
  }

  // Official `.md-post > main`
  &__body {
    padding-top: 7.0093457944vw;
    padding-bottom: 10.5140186916vw;
    background: variable.$white;

    @include breakpoint.mq(min, 769px) {
      padding-top: 4.1666666667vw;
      padding-bottom: 6.6666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      padding-top: 50px;
      padding-bottom: 80px;
    }
  }

  &__inner {
    margin-inline: auto;

    @include breakpoint.mq(min, 769px) {
      max-width: 834px;
    }

    :deep(h1),
    :deep(h2),
    :deep(h3) {
      &:not(:last-child) {
        margin-bottom: 0.45em;
      }

      &:not(:first-child) {
        margin-top: 0.75em;
      }
    }

    :deep(h1) {
      line-height: 1.5;
      padding-bottom: 0.25em;
      border-bottom: solid 2px #60ec33;
      font-family: "Noto Sans JP", sans-serif;
      font-optical-sizing: auto;
      font-weight: 900;
      font-style: normal;

      @include breakpoint.mq(min, 769px) {
        font-size: 2.3333333333vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 28px;
      }
    }

    :deep(h2) {
      line-height: 1.3;
      display: inline;
      background: linear-gradient(transparent 70%, #60ec33 70%);
      font-family: variable.$font-dela;
      font-weight: 400;
      font-style: normal;

      @include breakpoint.mq(min, 769px) {
        font-size: 2vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 24px;
      }
    }

    :deep(h3) {
      padding: 0.3em 0.8em 0.4em;
      width: fit-content;
      border: solid 1px #000;
      line-height: 1.2;
      font-family: "Noto Sans JP", sans-serif;
      font-optical-sizing: auto;
      font-weight: 700;
      font-style: normal;

      @include breakpoint.mq(min, 769px) {
        font-size: 1.5vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 18px;
      }
    }

    :deep(p) {
      font-family: "Noto Sans JP", sans-serif;
      letter-spacing: 0.08em;
      line-height: 2;

      &:not(:last-child) {
        margin-bottom: 1.5em;
      }
    }

    :deep(figure) {
      margin: 0;
    }

    :deep(img) {
      max-width: 100%;
      width: auto !important;
      height: auto !important;
      vertical-align: bottom;
      display: inline;
    }

    :deep(.h4-1) {
      letter-spacing: 0;
      margin-top: -2px;
      display: block;
      margin-bottom: -33.5px;
    }

    :deep(.p-1) {
      margin-bottom: -1em;
      display: block;
    }

    :deep(.ls-1) {
      letter-spacing: 0;
      line-height: 1.8;
      display: block;
      margin-bottom: -2em;
    }

    :deep(.mb) {
      margin-bottom: -24px;
      display: block;
    }

    :deep(.mb-1) {
      margin-bottom: -16px;
      display: block;
    }

    :deep(.mb-2) {
      display: block;
    }

    :deep(.pl) {
      padding-left: 1em;
      display: inline-block;
    }

    :deep(strong) {
      background: linear-gradient(transparent 70%, rgba(106, 107, 118, 0.2) 70%);
      font-family: "Noto Sans JP", sans-serif;
      font-optical-sizing: auto;
      font-weight: 900;
      font-style: normal;
    }

    :deep(.strong) {
      font-weight: 600;
    }

    :deep(a) {
      color: #60ec33;
      text-decoration: underline;
      line-height: 1.5;
      font-family: "Noto Sans JP", sans-serif;
      font-optical-sizing: auto;
      font-weight: 900;
      font-style: normal;

      &:hover {
        text-decoration: none;
      }
    }

    :deep(ul) {
      list-style-type: disc;
      padding-top: 4px;
      padding-bottom: 7px;
    }

    :deep(ul > li),
    :deep(ol > li) {
      margin-left: 1.5em;
      font-family: "Noto Sans JP", sans-serif;
      font-optical-sizing: auto;
      font-weight: 700;
      font-style: normal;
    }
  }

  // Official `.l-pagelinks` + `.md-btn__pagelinks`
  &__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 11.6822429907vw 0 0;

    @include breakpoint.mq(min, 769px) {
      max-width: 1200px;
      margin-inline: auto;
      padding-top: 4.1666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      padding-top: 50px;
    }

    a {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 47.3684210526%;
      padding: 0.23em 0;
      border: solid 0 #000;
      border-width: 1px 0;
      color: #000;
      font-family: variable.$font-dela;
      font-size: 5.1401869159vw;

      @include breakpoint.mq(min, 769px) {
        width: 23.3333333333%;
        font-size: 1.8333333333vw;
        transition: color 0.15s, border-color 0.15s;

        &:hover {
          border-color: #60ec33;
          color: #60ec33;
        }
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 22px;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .p-topicDetail {
    opacity: 1;
    transition: none;
  }
}
</style>
