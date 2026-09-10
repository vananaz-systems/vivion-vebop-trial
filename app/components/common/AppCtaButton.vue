<script setup lang="ts">
withDefaults(defineProps<{
  to: string
  stacked?: boolean
}>(), {
  stacked: false,
})
</script>

<template>
  <NuxtLink :to="to" class="c-cta">
    <i class="c-cta__bg" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="174" height="36.001" viewBox="0 0 174 36.001">
        <path d="M174,36H11.824a.127.127,0,0,0,.052-.023c.21-.192,21.083-19.232,24.015-22.194a.282.282,0,0,0,.061-.294.156.156,0,0,0-.14-.108l-10.694-.363a.108.108,0,0,1-.091-.056.111.111,0,0,1,0-.11L36.293.184a.11.11,0,0,0,.018-.119.108.108,0,0,0-.1-.064H174V36ZM11.793,36H0V0H24.233a.108.108,0,0,0-.08.049L13.145,16.7a.22.22,0,0,0-.047.224.12.12,0,0,0,.1.085l9.135.684a.123.123,0,0,1,.094.186l-.63,1.053c-2.165,3.62-8.752,14.635-10.063,16.844a.168.168,0,0,0-.008.167.1.1,0,0,0,.066.052Z" />
      </svg>
    </i>
    <em class="c-cta__label" :class="{ 'c-cta__label--stack': stacked }">
      <slot />
    </em>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.c-cta {
  position: relative;
  display: block;
  width: 51.4018691589vw;
  margin-inline: auto;
  font-family: variable.$font-display;
  font-optical-sizing: auto;
  font-size: 2.5700934579vw;
  font-weight: 700;
  font-style: normal;
  color: #fff;
  text-decoration: none;

  @include breakpoint.mq(min, 769px) {
    width: 270px;
    font-size: 14px;
    transition: color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

    &:hover {
      color: #000;

      .c-cta__bg path {
        fill: #60ec33;
      }

      &::after {
        background: #000;
      }
    }
  }

  &__bg {
    position: relative;
    z-index: 1;
    display: block;
    font-style: normal;

    svg {
      width: 100%;
      height: auto;
      vertical-align: bottom;
    }

    path {
      fill: #000;

      @include breakpoint.mq(min, 769px) {
        transition: fill 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
      }
    }
  }

  &__label {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.1em;
    line-height: 1;
    white-space: nowrap;
    transform: translate(-40%, -40%);

    &--stack {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.15;
      text-align: center;
      white-space: normal;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 3;
    display: block;
    width: 4.6728971963vw;
    height: 0.4672897196vw;
    background: #fff;

    @include breakpoint.mq(min, 769px) {
      width: 20px;
      height: 2px;
      transition: background 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }
  }
}
</style>
