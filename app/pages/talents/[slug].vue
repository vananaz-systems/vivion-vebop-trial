<script setup lang="ts">
const route = useRoute()
const { getTalentBySlug, getUnitBySlug, getTalentsByUnit } = useTalents()

const talent = computed(() => getTalentBySlug(String(route.params.slug)))

if (!talent.value) {
  throw createError({ statusCode: 404, statusMessage: 'Talent not found' })
}

const unit = computed(() => (
  talent.value?.unit ? getUnitBySlug(talent.value.unit.slug) : undefined
))

const unitMembers = computed(() => (
  talent.value?.unit ? getTalentsByUnit(talent.value.unit.slug) : []
))

const profileEntries = computed<{ headline: string, content: string }[]>(() => {
  if (!talent.value?.data) return []

  try {
    return JSON.parse(talent.value.data)
  }
  catch {
    return []
  }
})

const seoDescription = computed(() =>
  talent.value?.profileText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? '',
)

useSeo({
  title: talent.value.name,
  description: seoDescription.value,
})
</script>

<template>
  <article v-if="talent" class="l-content p-profile">
    <AppPageHeader eyebrow="TALENT PROFILE" :title="talent.name" :description="talent.nameEn" />

    <div class="p-profile__layout">
      <div class="p-profile__visual">
        <img :src="talent.portrait.url" :alt="talent.name">
      </div>

      <div class="p-profile__content">
        <h2>PROFILE</h2>
        <div v-html="talent.profileText" />

        <dl v-if="profileEntries.length" class="p-profile__meta">
          <div v-for="entry in profileEntries" :key="entry.headline">
            <dt>{{ entry.headline }}</dt>
            <dd>{{ entry.content.trim() }}</dd>
          </div>
        </dl>

        <p v-if="unit">{{ unit.name }}</p>
      </div>
    </div>

    <section v-if="unitMembers.length" class="p-profile__unit">
      <h2>UNIT MEMBER</h2>
      <div class="p-profile__grid">
        <TalentCard v-for="member in unitMembers" :key="member.id" :talent="member" />
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.p-profile {
  display: grid;
  gap: 3rem;

  &__layout {
    display: grid;
    gap: 2rem;

    @include breakpoint.mq(min, 800px) {
      grid-template-columns: 280px 1fr;
    }
  }

  &__visual {
    display: grid;
    place-items: center;
    min-height: 280px;
    background: variable.$surface;
    border: 1px solid variable.$border;
    font-size: 3rem;
  }

  &__content {
    display: grid;
    gap: 1rem;
    align-content: start;
  }

  h2 {
    font-size: 0.78rem;
    letter-spacing: 0.16em;
  }

  &__meta {
    display: grid;
    gap: 0.75rem;

    div {
      display: grid;
      gap: 0.2rem;
    }

    dt {
      color: variable.$text-muted;
      font-size: 0.85rem;
    }
  }

  &__unit,
  &__grid {
    display: grid;
    gap: 1.25rem;
  }

  &__grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}
</style>
