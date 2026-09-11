<script setup lang="ts">
const { archiveUnits } = useTalents()

const isOpen = defineModel<boolean>({ default: false })

function close() {
  isOpen.value = false
}

function unitNameLines(unit: { archiveName?: string, name: string }) {
  return (unit.archiveName || unit.name).split('\n')
}

watch(isOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      class="c-filterByUnit"
      :data-status="isOpen ? 'show' : 'hidden'"
      role="dialog"
      aria-modal="true"
      aria-label="Filter by Unit"
      :aria-hidden="!isOpen"
      :inert="!isOpen"
    >
      <div class="c-filterByUnit__inner">
        <div class="c-filterByUnit__bg" @click="close" />
        <button class="c-filterByUnit__close" type="button" aria-label="閉じる" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
            <path d="M4267-2363.727,4247.273-2344l-1.273-1.273L4265.728-2365,4246-2384.727l1.273-1.273L4267-2366.273,4286.728-2386l1.272,1.273L4268.273-2365,4288-2345.273l-1.272,1.273Z" transform="translate(-4246 2386)" fill="#60ec33" />
          </svg>
        </button>
        <div class="c-filterByUnit__contents">
          <header>
            <h3>Filter by Unit</h3>
          </header>
          <ul>
            <li v-for="unit in archiveUnits" :key="unit.id">
              <NuxtLink :to="{ path: '/talents/', query: { unit: unit.id } }" @click="close">
                <picture>
                  <img
                    v-if="unit.logo"
                    :src="unit.logo"
                    :alt="unit.archiveName || unit.name"
                    loading="lazy"
                    decoding="async"
                  >
                </picture>
                <span>
                  <template v-for="(line, index) in unitNameLines(unit)" :key="line">
                    <br v-if="index > 0">{{ line }}
                  </template>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.c-filterByUnit {
  position: fixed;
  inset: 0;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;

  &[data-status='show'] {
    opacity: 1;
    overflow: auto;
    pointer-events: auto;
    transition: opacity 1s;
  }

  &__inner {
    position: relative;
    min-height: 100%;
  }

  &__bg {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    z-index: 1;
  }

  &__close {
    position: fixed;
    z-index: 3;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    line-height: 0;
    bottom: 9.6vw;
    left: 50%;
    width: 9.8130841121vw;
    transform: translateX(-50%);

    @include breakpoint.mq(min, 769px) {
      top: 65px;
      right: 3.3333333333%;
      bottom: auto;
      left: auto;
      width: 3.5vw;
      transform: none;
    }

    @include breakpoint.mq(min, 1201px) {
      right: 40px;
      width: 42px;
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &__contents {
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    padding-inline: 5.8411214953%;

    @include breakpoint.mq(min, 769px) {
      padding-inline: 40px;
    }

    header {
      padding-top: 14.0186915888vw;
      margin-bottom: 8.1775700935vw;

      @include breakpoint.mq(min, 769px) {
        padding-top: 6.25vw;
        margin-bottom: 5vw;
      }

      @include breakpoint.mq(min, 1201px) {
        padding-top: 75px;
        margin-bottom: 60px;
      }
    }

    h3 {
      margin: 0;
      color: #60ec33;
      font-family: variable.$font-display;
      font-size: 3.738317757vw;
      font-weight: 600;
      letter-spacing: 0.2em;
      line-height: 1;
      text-align: center;

      @include breakpoint.mq(min, 769px) {
        font-size: 2vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 24px;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      margin: 0 auto;
      padding: 0;
      list-style: none;

      @include breakpoint.mq(min, 769px) {
        width: 83.3333333333%;
        max-width: 1000px;
      }
    }

    li {
      width: 47.3684210526%;

      @include breakpoint.mq(min, 769px) {
        width: 47.6%;
      }

      &:nth-child(n + 3) {
        margin-top: 7.0093457944vw;

        @include breakpoint.mq(min, 769px) {
          margin-top: 3.3333333333vw;
        }

        @include breakpoint.mq(min, 1201px) {
          margin-top: 40px;
        }
      }
    }

    a {
      display: block;
      color: #fff;
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
      vertical-align: bottom;

      @include breakpoint.mq(min, 769px) {
        transition: opacity 0.3s;
      }
    }

    span {
      display: block;
      margin-top: 0.5em;
      color: #fff;
      font-family: "Noto Sans JP", sans-serif;
      font-size: 3.2710280374vw;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-align: center;

      @include breakpoint.mq(min, 769px) {
        font-size: 1.5vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 18px;
      }
    }

    @include breakpoint.mq(min, 769px) {
      li a:hover img {
        opacity: 0.5;
      }
    }
  }
}
</style>
