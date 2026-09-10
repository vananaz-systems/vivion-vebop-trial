<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="c-pageHeader">
    <p v-if="eyebrow" class="c-pageHeader__eyebrow">{{ eyebrow }}</p>
    <h1 class="c-pageHeader__title">{{ title }}</h1>
    <p v-if="description" class="c-pageHeader__desc">{{ description }}</p>
  </header>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;

.c-pageHeader {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 2.5rem;

  &__eyebrow {
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: variable.$text-muted;
  }

  &__title {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    line-height: 1.25;
    letter-spacing: 0.04em;
  }

  &__desc {
    max-width: 40rem;
    color: variable.$text-muted;
  }
}
</style>
