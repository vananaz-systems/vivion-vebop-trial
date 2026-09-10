<script setup lang="ts">
import type { Talent } from '#shared/types/talent'

defineProps<{
  talent: Talent
}>()
</script>

<template>
  <NuxtLink :to="`/talents/${talent.slug}/`" class="c-talentCard">
    <div class="c-talentCard__visual" aria-hidden="true">
      <span>{{ talent.name.slice(0, 1) }}</span>
    </div>
    <div class="c-talentCard__body">
      <p class="c-talentCard__en">{{ talent.nameEn }}</p>
      <h3>{{ talent.name }}</h3>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;

.c-talentCard {
  display: grid;
  gap: 0.85rem;

  &__visual {
    display: grid;
    place-items: center;
    aspect-ratio: 3 / 4;
    background: variable.$surface;
    border: 1px solid variable.$border;
    font-size: 2rem;
  }

  &__en {
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: variable.$text-muted;
  }

  h3 {
    font-size: 1.05rem;
    font-weight: 600;
  }
}
</style>
