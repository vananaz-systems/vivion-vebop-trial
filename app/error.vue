<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const title = computed(() => (
  props.error.statusCode === 404 ? 'ページが見つかりません' : 'エラーが発生しました'
))

useSeo({ title: title.value })
</script>

<template>
  <div class="l-content p-error">
    <p class="p-error__code">{{ error.statusCode }}</p>
    <h1>{{ title }}</h1>
    <NuxtLink to="/">HOMEへ戻る</NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;

.p-error {
  min-height: 60vh;
  display: grid;
  align-content: center;
  gap: 1rem;

  &__code {
    letter-spacing: 0.16em;
    color: variable.$text-muted;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
