<script setup lang="ts">
import type { BrandNavItem } from '#shared/types/brand'

defineProps<{
  items: BrandNavItem[]
  stacked?: boolean
}>()

const emit = defineEmits<{
  navigate: []
}>()

const route = useRoute()

function isActive(item: BrandNavItem) {
  if (item.external) return false
  if (item.to === '/') return route.path === '/'
  return route.path === item.to || route.path.startsWith(item.to)
}

function isExternal(item: BrandNavItem) {
  return Boolean(item.external || item.newTab || item.to.startsWith('http'))
}
</script>

<template>
  <ul class="c-nav" :class="{ 'c-nav--stacked': stacked }">
    <li v-for="item in items" :key="item.label + item.to">
      <a
        v-if="isExternal(item)"
        :href="item.to"
        :target="item.newTab || item.external ? '_blank' : undefined"
        :rel="item.external || item.newTab ? 'noopener noreferrer' : undefined"
        class="c-nav__link"
        @click="emit('navigate')"
      >
        {{ item.label }}
      </a>
      <NuxtLink
        v-else
        :to="item.to"
        class="c-nav__link"
        :class="{ 'is-active': isActive(item) }"
        @click="emit('navigate')"
      >
        {{ item.label }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;

.c-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 1.75rem;

  &--stacked {
    flex-direction: column;
    gap: 1.25rem;
  }

  &__link {
    display: inline-block;
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.72;
    transition: opacity variable.$ease;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
