<script setup lang="ts">
import type { Talent } from '#shared/types/talent'

const STAGGER_MS = 100

const props = withDefaults(defineProps<{
  talent: Talent
  index?: number
}>(), {
  index: 0,
})

const root = ref<HTMLElement | null>(null)
const revealed = ref(false)
const staggerStyle = computed(() => ({
  '--talent-card-stagger': `${props.index * STAGGER_MS}ms`,
}))

onMounted(() => {
  const el = root.value
  if (!el) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealed.value = true
    return
  }

  const io = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    revealed.value = true
    io.disconnect()
  }, { threshold: 0.12 })

  io.observe(el)
  onUnmounted(() => io.disconnect())
})
</script>

<template>
  <NuxtLink
    :to="`/talents/${talent.slug}/`"
    class="c-talentCard"
    :class="{ 'is-show': revealed }"
    :style="staggerStyle"
  >
    <div
      ref="root"
      class="c-talentCard__thumb"
      :style="{ backgroundColor: talent.theme || '#111' }"
    >
      <picture>
        <img
          v-if="talent.thumbnail"
          :src="talent.thumbnail.url"
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
    opacity: 0;
    transform: scale(1.1) translateY(50%);
  }

  &.is-show picture {
    opacity: 1;
    transform: scale(1) translateY(0);
    transition-duration: 0.8s;
    transition-delay: var(--talent-card-stagger, 0s);
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    picture {
      opacity: 1;
      transform: none;
    }

    &.is-show picture {
      transition: none;
      transition-delay: 0s;
    }
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
