<script setup lang="ts">
import { aboutPage } from '~/data/pages'

useSeo({
  title: 'ABOUT',
  description: aboutPage.body[0],
})
</script>

<template>
  <article class="l-content p-about">
    <AppPageHeader eyebrow="ABOUT" :title="aboutPage.title" />
    <p class="p-about__heading">{{ aboutPage.heading }}</p>
    <p class="p-about__tagline">{{ aboutPage.tagline }}</p>
    <p v-for="(paragraph, index) in aboutPage.body" :key="index" class="p-about__text">
      {{ paragraph }}
    </p>
    <p class="p-about__en">{{ aboutPage.english }}</p>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;

.p-about {
  display: grid;
  gap: 1.25rem;

  &__heading {
    white-space: pre-line;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 700;
    line-height: 1.4;
  }

  &__tagline {
    font-size: 1.1rem;
  }

  &__text {
    max-width: 44rem;
  }

  &__en {
    color: variable.$text-muted;
  }
}
</style>
