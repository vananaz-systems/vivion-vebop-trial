<script setup lang="ts">
await loadTopicsData()

import { guidelinePage } from '~/data/pages'

useSeo({
  title: guidelinePage.heading,
  description: guidelinePage.description,
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
  <div class="p-guideline" :class="{ 'is-revealed': revealed }">
    <AppPageHeader :title="guidelinePage.title" />
    <GuidelineArticle />
    <HomeTopicsSection />
  </div>
</template>

<style lang="scss" scoped>
.p-guideline {
  opacity: 0;

  &.is-revealed {
    opacity: 1;
    transition: opacity 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
}

@media (prefers-reduced-motion: reduce) {
  .p-guideline {
    opacity: 1;
    transition: none;
  }
}
</style>
