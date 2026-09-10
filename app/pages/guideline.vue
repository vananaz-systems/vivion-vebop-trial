<script setup lang="ts">
import { guidelinePage } from '~/data/pages'

useSeo({
  title: 'GUIDELINE',
  description: guidelinePage.intro[0],
})
</script>

<template>
  <article class="l-content p-legal">
    <AppPageHeader eyebrow="GUIDELINE" :title="guidelinePage.title" />
    <p v-for="(paragraph, index) in guidelinePage.intro" :key="index">
      {{ paragraph }}
    </p>
    <section v-for="section in guidelinePage.sections" :key="section.heading">
      <h2>{{ section.heading }}</h2>
      <p>{{ section.body }}</p>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.p-legal {
  display: grid;
  gap: 1.25rem;

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  p {
    max-width: 44rem;
  }
}
</style>
