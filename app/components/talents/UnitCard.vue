<script setup lang="ts">
import type { TalentUnit } from '#shared/types/talent'

defineProps<{
  unit: TalentUnit
  ctaLabel?: string
  to?: string
}>()
</script>

<template>
  <article class="c-unitCard">
    <p class="c-unitCard__en">{{ unit.nameEn }}</p>
    <h3>{{ unit.name }}</h3>
    <p v-for="(paragraph, index) in unit.description" :key="index">
      {{ paragraph }}
    </p>
    <AppCtaButton v-if="to" :to="to">
      {{ ctaLabel ?? 'MEMBER LINEUP' }}
    </AppCtaButton>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;

.c-unitCard {
  display: grid;
  gap: 0.85rem;
  padding: 1.75rem;
  background: variable.$bg-elevated;
  border: 1px solid variable.$border;

  &__en {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: variable.$text-muted;
  }

  h3 {
    font-size: 1.4rem;
  }

  p {
    color: variable.$text-muted;
  }
}
</style>
