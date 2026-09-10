<script setup lang="ts">
import { presentRulesPage } from '~/data/pages'

useSeo({
  title: 'PRESENT RULES',
  description: presentRulesPage.intro[0],
})
</script>

<template>
  <article class="l-content p-legal">
    <AppPageHeader eyebrow="PRESENT RULES" :title="presentRulesPage.title" />
    <p v-for="(paragraph, index) in presentRulesPage.intro" :key="index">
      {{ paragraph }}
    </p>
  </article>
</template>

<style lang="scss" scoped>
.p-legal {
  display: grid;
  gap: 1.25rem;

  p {
    max-width: 44rem;
  }
}
</style>
