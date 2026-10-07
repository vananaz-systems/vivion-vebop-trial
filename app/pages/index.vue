<script setup lang="ts">
await loadTopicsData()

const { brand } = useSite()
const { begin, contentRevealed, fvLoaded } = useIntroLoader()

useSeo({
  title: brand.siteName,
  description: brand.description,
})

begin()

const fvReady = ref(false)
const fvImg = ref<HTMLImageElement | null>(null)

function markFvReady() {
  fvReady.value = true
}

function onFvImgReady(event: Event) {
  const img = event.target
  if (img instanceof HTMLImageElement && img.complete) markFvReady()
}

onMounted(() => {
  if (fvImg.value?.complete) markFvReady()
})
</script>

<template>
  <div class="p-index" :class="{ 'is-revealed': contentRevealed }">
    <AppIntroLoader :ready="fvReady" />

    <section class="p-index__fv" :class="{ 'is-loaded': fvLoaded }">
      <div class="p-index__fv-media">
        <picture>
          <source media="(min-width:769px)" srcset="/images/home/fv-pc.png">
          <source media="(max-width:768px)" srcset="/images/home/fv-sp.png">
          <img
            ref="fvImg"
            src="/images/home/fv-pc.png"
            :alt="brand.siteName"
            @load="onFvImgReady"
            @error="markFvReady"
          >
        </picture>
      </div>
      <h1 class="p-index__fv-logo">
        <picture class="logo">
          <source type="image/webp" srcset="/images/common/logo.webp">
          <img src="/images/common/logo.png" :alt="brand.siteName" decoding="async">
        </picture>
      </h1>
    </section>

    <HomeAboutSection />
    <HomeTalentsSection />
    <HomeTopicsSection />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.p-index {
  /* Official `.l-fv` — header is fixed, so these are viewport offsets. */
  margin-top: 9.3457943925vw;
  opacity: 0;
  pointer-events: none;

  @include breakpoint.mq(min, 769px) {
    margin-top: 60px;
  }

  @include breakpoint.mq(min_max, 769px, 1200px) {
    margin-top: 5vw;
  }

  &.is-revealed {
    opacity: 1;
    pointer-events: auto;
    transition: opacity 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  &__fv {
    position: relative;
    background: variable.$white;
  }

  &__fv-media {
    position: relative;
    width: 100%;
    height: auto;
    background: variable.$white;

    picture {
      display: block;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }

    @include breakpoint.mq(max, 768px) {
      aspect-ratio: 430 / 674;
      overflow: hidden;

      picture {
        position: relative;
        width: 100%;
        height: 100%;
      }

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 100%;
        height: 100%;
        aspect-ratio: 4300 / 6747;
        object-fit: cover;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1;
      }
    }
  }

  /* Official `.l-fv__inner .fvttl` + `.fvttl--logo` (width on the title box,
     scale on the logo). Collapse the h1 line box so height matches the image. */
  &__fv-logo {
    position: absolute;
    top: 69.75%;
    left: 50%;
    z-index: 2;
    width: 36.1111111111%;
    max-width: 519.99px;
    margin: 0;
    font-size: 0;
    line-height: 0;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.08);

    @include breakpoint.mq(min, 769px) {
      top: 69.25%;
    }

    @include breakpoint.mq(min, 960px) {
      top: 69.45%;
    }

    @include breakpoint.mq(min, 1024px) {
      top: 69.48%;
    }

    @include breakpoint.mq(min, 1301px) {
      top: calc(70% - 3px);
    }

    picture,
    img {
      display: block;
      width: 100%;
      height: auto;

      /* @include breakpoint.mq(min, 769px) {
        height: 77.31px;
       } */
    }

    @include breakpoint.mq(sp) {
      width: 88.3720930233%;
      max-width: none;
      transform: translate(-50%, -40%) scale(1.08);
    }
  }

  &__fv.is-loaded &__fv-logo {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    transition-duration: 0.75s;
    transition-delay: 1s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

    @include breakpoint.mq(sp) {
      transform: translate(-50%, -40%) scale(1);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .p-index {
    opacity: 1;
    pointer-events: auto;

    &__fv-logo {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      transition: none;

      @include breakpoint.mq(sp) {
        transform: translate(-50%, -40%) scale(1);
      }
    }
  }
}
</style>
