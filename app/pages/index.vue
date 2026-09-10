<script setup lang="ts">
const { brand } = useSite()

useSeo({
  title: brand.siteName,
  description: brand.description,
})
</script>

<template>
  <div class="p-index">
    <section class="p-index__fv">
      <div class="p-index__fv-media">
        <img src="/images/home/fv-pc.png" :alt="brand.siteName">
      </div>
      <h1 class="p-index__fv-logo">
        <picture>
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
  margin-top: calc(9.3457943925vw - 100px);

  @include breakpoint.mq(min, 769px) {
    margin-top: calc(5vw - 100px);
  }

  @include breakpoint.mq(pc) {
    margin-top: calc(5vw - 104px);
  }

  @include breakpoint.mq(min, 1201px) {
    margin-top: -20px;
  }

  &__fv {
    position: relative;
    background: variable.$white;
  }

  &__fv-media {
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &__fv-logo {
    position: absolute;
    top: 69.677777%;
    left: 50%;
    z-index: 2;
    width: 36.1111111111%;
    max-width: 520px;
    margin: 0;
    transform: translate(-50%, -50%);

    img {
      display: block;
      width: 100%;
      height: auto;
    }

    @include breakpoint.mq(sp) {
      width: 88.3720930233%;
      max-width: none;
      transform: translate(-50%, -40%);
    }
  }
}
</style>
