<script setup lang="ts">
useSeo({
  title: 'TALENTS',
  description: 'ビバップ高校の所属タレント一覧。',
})
</script>

<template>
  <div class="p-talents">
    <AppPageHeader title="TALENTS" />
    <TalentsArchive mode="talents" />
    <HomeTopicsSection />
  </div>
</template>
