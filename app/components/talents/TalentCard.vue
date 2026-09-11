<script setup lang="ts">
import type { Talent } from '#shared/types/talent'

defineProps<{
  talent: Talent
}>()
</script>

<template>
  <NuxtLink :to="`/talents/${talent.slug}/`" class="c-talentCard">
    <div
      class="c-talentCard__thumb"
      :style="{ backgroundColor: talent.color || '#111' }"
    >
      <picture>
        <img
          v-if="talent.image"
          :src="talent.image"
          :alt="talent.name"
          loading="lazy"
          decoding="async"
        >
        <span v-else>{{ talent.name.slice(0, 1) }}</span>
      </picture>
    </div>
    <h3 class="c-talentCard__name">
      <em class="c-talentCard__jp">{{ talent.name }}</em>
      <small class="c-talentCard__en">{{ talent.nameEn }}</small>
    </h3>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.c-talentCard {
  display: block;
  color: variable.$black;

  &__thumb {
    position: relative;
    overflow: hidden;

    @include breakpoint.mq(min, 769px) {
      transition: background-color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      aspect-ratio: 180 / 52;
      background: variable.$page-bg;
      z-index: 1;
    }
  }

  picture {
    position: relative;
    z-index: 2;
    display: block;
  }

  picture::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("/images/talents/bg-thumb-thunder.png") left bottom / 100% auto no-repeat;
    opacity: 0.2;
    z-index: 1;
    pointer-events: none;

    @include breakpoint.mq(min, 769px) {
      transition: opacity 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }
  }

  img,
  picture > span {
    position: relative;
    z-index: 2;
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    object-position: center;

    @include breakpoint.mq(min, 769px) {
      transition: filter 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }
  }

  picture > span {
    display: grid;
    place-items: center;
    font-family: variable.$font-dela;
    font-size: 12vw;
    color: #fff;

    @include breakpoint.mq(min, 769px) {
      font-size: 3vw;
    }
  }

  &__name {
    position: relative;
    z-index: 1;
    margin: 0;
  }

  &__jp,
  &__en {
    display: block;
    line-height: 1;
    text-align: center;
  }

  &__jp {
    padding-top: 0.5em;
    font-family: variable.$font-dela;
    font-size: 4.2056074766vw;
    font-style: normal;
    font-weight: 400;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.9166666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 23px;
    }
  }

  &__en {
    margin-top: 0.5em;
    font-family: variable.$font-display-medium;
    font-size: 2.3364485981vw;
    font-weight: 500;
    letter-spacing: 0.1em;
    opacity: 0.3;

    @include breakpoint.mq(min, 769px) {
      font-size: 0.9166666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 11px;
    }
  }

  @include breakpoint.mq(min, 769px) {
    &:hover {
      .c-talentCard__thumb {
        background-color: #000 !important;
      }

      picture::before {
        opacity: 1;
      }

      img {
        filter: brightness(0.5);
      }
    }
  }
}
</style>
