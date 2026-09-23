<script setup lang="ts">
await loadTopicsData()

const route = useRoute()
const { topics } = useTopics()

const slug = computed(() => String(route.params.slug).toLowerCase())

const matchedTag = computed(() => {
  for (const topic of topics.value) {
    const tag = topic.tags.find(item => item.slug === slug.value)
    if (tag) return tag
  }
  return undefined
})

async function redirectIfUnknown() {
  if (!matchedTag.value) {
    await navigateTo('/', { replace: true })
  }
}

await redirectIfUnknown()
watch(slug, () => {
  void redirectIfUnknown()
})

if (matchedTag.value) {
  useSeo({
    title: matchedTag.value.name,
    description: `ビバップ高校の${matchedTag.value.name}一覧。`,
  })
}
</script>

<template>
  <TopicsArchive v-if="matchedTag" :active-tag="slug" />
</template>
