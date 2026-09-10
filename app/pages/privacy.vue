<script setup lang="ts">
import { privacyPage } from '~/data/pages'

useSeo({
  title: 'PRIVACY POLICY',
  description: privacyPage.intro[0],
})
</script>

<template>
  <article class="l-content p-legal">
    <AppPageHeader eyebrow="PRIVACY POLICY" :title="privacyPage.title" />
    <p v-for="(paragraph, index) in privacyPage.intro" :key="index">
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
