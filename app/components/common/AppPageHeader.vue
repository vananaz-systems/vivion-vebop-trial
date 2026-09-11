<script setup lang="ts">
const props = defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()

const isBanner = computed(() => !props.eyebrow && !props.description)
</script>

<template>
  <header class="c-pageHeader" :class="{ 'c-pageHeader--banner': isBanner }">
    <div v-if="isBanner" class="c-pageHeader__inner">
      <h1 class="c-pageHeader__title">{{ title }}</h1>
    </div>
    <template v-else>
      <p v-if="eyebrow" class="c-pageHeader__eyebrow">{{ eyebrow }}</p>
      <h1 class="c-pageHeader__title">{{ title }}</h1>
      <p v-if="description" class="c-pageHeader__desc">{{ description }}</p>
    </template>
  </header>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

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

  &--banner {
    display: block;
    gap: 0;
    margin-bottom: 0;

    @include breakpoint.mq(min, 769px) {
      padding-left: 40px;
      padding-right: 40px;
    }
  }

  &--banner &__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 21.0280373832vw;
    padding-left: 5.8411214953%;
    padding-right: 5.8411214953%;
    color: variable.$white;
    background: #000;
    font-family: variable.$font-dela;
    font-size: 7.476635514vw;
    font-weight: 400;
    line-height: 1;

    @include breakpoint.mq(min, 769px) {
      height: 11.3333333333vw;
      max-width: 1200px;
      margin-inline: auto;
      padding-inline: 0;
      font-size: 3.5vw;
    }

    @include breakpoint.mq(min, 1201px) {
      height: 136px;
      font-size: 42px;
    }
  }

  &--banner &__title {
    display: block;
    margin: 0;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: 0;
    line-height: inherit;
    text-align: center;
    text-transform: uppercase;
  }
}
</style>
