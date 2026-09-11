<script setup lang="ts">
useSeo({
  title: 'UNIT',
  description: 'ビバップ高校のユニット一覧。',
})
</script>

<template>
  <div class="p-talents">
    <AppPageHeader title="UNIT" />
    <TalentsArchive mode="unit" />
    <HomeTopicsSection />
  </div>
</template>
