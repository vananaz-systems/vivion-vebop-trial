<script setup lang="ts">
const { talents, units } = useTalents()

useSeo({
  title: 'TALENTS',
  description: 'ビバップ高校の所属タレント一覧。',
})

const groupedUnits = computed(() =>
  units
    .filter(unit => unit.id !== 'putera' && unit.id !== 'coin-laundry')
    .map(unit => ({
      unit,
      members: talents.filter(talent => talent.unitId === unit.id),
    })),
)

const soloTalents = computed(() => talents.filter(talent => !talent.unitId))
</script>

<template>
  <div class="l-content p-talents">
    <AppPageHeader
      eyebrow="TALENTS"
      title="所属タレント"
      description="ユニットとソロタレントのラインナップです。"
    />

    <section v-if="soloTalents.length" class="p-talents__group">
      <h2>SOLO</h2>
      <div class="p-talents__grid">
        <TalentCard v-for="talent in soloTalents" :key="talent.id" :talent="talent" />
      </div>
    </section>

    <section v-for="group in groupedUnits" :key="group.unit.id" class="p-talents__group">
      <UnitCard :unit="group.unit" />
      <div class="p-talents__grid">
        <TalentCard v-for="talent in group.members" :key="talent.id" :talent="talent" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.p-talents {
  display: grid;
  gap: 3rem;

  &__group {
    display: grid;
    gap: 1.25rem;
  }

  h2 {
    font-size: 0.8rem;
    letter-spacing: 0.16em;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.25rem;
  }
}
</style>
