<script setup lang="ts">
import type { TalentUnit } from '#shared/types/talent'

const props = defineProps<{
  unit: TalentUnit
  to?: string
}>()

const displayName = computed(() => props.unit.archiveName || props.unit.name)
const nameLines = computed(() => displayName.value.split('\n'))
const href = computed(() => props.to ?? `/talents/?unit=${props.unit.id}`)
</script>

<template>
  <NuxtLink :to="href" class="c-unitCard">
    <div class="c-unitCard__thumb">
      <picture>
        <img
          v-if="unit.logo || unit.image"
          :src="unit.logo || unit.image"
          :alt="displayName"
          loading="lazy"
          decoding="async"
        >
      </picture>
    </div>
    <h3 class="c-unitCard__name">
      <em class="c-unitCard__unitname">
        <template v-for="(line, index) in nameLines" :key="line">
          <br v-if="index > 0">{{ line }}
        </template>
      </em>
    </h3>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.c-unitCard {
  display: block;
  color: variable.$black;

  &__thumb {
    @include breakpoint.mq(max, 768px) {
      width: 82%;
      margin-inline: auto;
    }
  }

  picture {
    display: block;
    background: #fff;
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 476 / 318;
    object-fit: contain;
    object-position: center;
    vertical-align: bottom;

    @include breakpoint.mq(min, 769px) {
      transition: opacity 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }
  }

  &__name {
    margin: 0;
  }

  &__unitname {
    display: block;
    margin-top: 0.6em;
    font-family: "Noto Sans JP", sans-serif;
    font-size: 3.2710280374vw;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-align: center;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.5833333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 19px;
    }
  }

  @include breakpoint.mq(min, 769px) {
    &:hover img {
      opacity: 0.5;
    }
  }
}
</style>
