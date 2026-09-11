<script setup lang="ts">
import { guidelinePage } from '~/data/pages'

useSeo({
  title: guidelinePage.heading,
  description: guidelinePage.description,
})
</script>

<template>
  <div class="p-guideline">
    <AppPageHeader :title="guidelinePage.title" />
    <GuidelineArticle />
    <HomeTopicsSection />
  </div>
</template>
