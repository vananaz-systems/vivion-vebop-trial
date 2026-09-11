<script setup lang="ts">
const props = defineProps<{
  mode: 'talents' | 'unit'
}>()

const route = useRoute()
const { archiveUnits, getArchiveTalents, isArchiveUnit } = useTalents()

const isFilterOpen = ref(false)

const activeUnitId = computed(() => {
  const value = route.query.unit
  const id = Array.isArray(value) ? value[0] : value
  return id && isArchiveUnit(id) ? id : null
})

const visibleTalents = computed(() => getArchiveTalents(activeUnitId.value))

const isTalentsView = computed(() => props.mode === 'talents')
</script>

<template>
  <section class="p-talentsArchive" id="Talents">
    <div class="p-talentsArchive__lineup">
      <nav class="p-talentsArchive__tabs" aria-label="タレント一覧切り替え">
        <div
          class="p-talentsArchive__tab"
          :data-status="isTalentsView ? 'current' : undefined"
        >
          <NuxtLink to="/talents/">
            <span>所属タレント一覧</span>
          </NuxtLink>
        </div>
        <div
          class="p-talentsArchive__tab"
          :data-status="mode === 'unit' ? 'current' : undefined"
        >
          <NuxtLink to="/talents/unit/">
            <span>ユニット一覧</span>
          </NuxtLink>
        </div>
      </nav>

      <div class="p-talentsArchive__main">
        <header v-if="isTalentsView" class="p-talentsArchive__toolbar">
          <h2>TALENT LIST</h2>
          <button type="button" @click="isFilterOpen = true">
            <span class="p-talentsArchive__filterTtl">FILTER<small>(UNIT)</small></span>
            <i class="p-talentsArchive__filterIcon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                <rect width="15" height="15" />
                <path d="M3.5,0,7,5H0Z" transform="translate(11 12) rotate(-180)" fill="#fff" />
              </svg>
            </i>
          </button>
        </header>

        <ul v-if="isTalentsView" class="p-talentsArchive__talents">
          <li v-for="talent in visibleTalents" :key="talent.id">
            <TalentCard :talent="talent" />
          </li>
        </ul>

        <ul v-else class="p-talentsArchive__units">
          <li v-for="unit in archiveUnits" :key="unit.id">
            <UnitCard :unit="unit" />
          </li>
        </ul>
      </div>
    </div>

    <TalentsFilterOverlay v-if="isTalentsView" v-model="isFilterOpen" />
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.p-talentsArchive {
  padding: 4.6728971963vw 5.8411214953% 9.3457943925vw;

  @include breakpoint.mq(min, 769px) {
    padding: 4.5833333333vw 40px 0;
  }

  @include breakpoint.mq(min, 1201px) {
    padding-top: 55px;
  }

  &__lineup {
    @include breakpoint.mq(min, 769px) {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      max-width: 1200px;
      margin-inline: auto;
    }
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 9.3457943925vw;

    @include breakpoint.mq(min, 769px) {
      display: block;
      width: 19.1666666667%;
      margin-bottom: 0;
    }
  }

  &__tab {
    width: 47.3684210526%;

    @include breakpoint.mq(min, 769px) {
      width: auto;
      font-size: 1.6666666667vw;
      transition: color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

      &:not(:last-child) {
        margin-bottom: 0.4em;
      }
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 20px;
    }

    a {
      position: relative;
      display: block;
      color: rgba(106, 107, 118, 0.55);
      font-family: variable.$font-dela;
      font-size: 4.2056074766vw;
      line-height: 1.4;
      text-align: center;

      @include breakpoint.mq(min, 769px) {
        font-size: inherit;
        text-align: left;
        transition: color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
      }

      &::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 4.6728971963vw;
        height: 0.4672897196vw;
        background: #000;
        opacity: 0.4;
        transform: translate(-50%, 300%);

        @include breakpoint.mq(min, 769px) {
          top: 50%;
          left: 0;
          bottom: auto;
          width: 10px;
          height: 3px;
          background: #60ec33;
          opacity: 0;
          transform: translate(-200%, -50%);
          transition: opacity 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        }

        @include breakpoint.mq(min_max, 769px, 1200px) {
          width: 0.8333333333vw;
        }
      }
    }

    @include breakpoint.mq(min, 769px) {
      &:hover a {
        color: #60ec33;

        &::before {
          opacity: 1;
        }
      }
    }

    &[data-status='current'] {
      a {
        color: #60ec33;

        @include breakpoint.mq(min, 769px) {
          color: #000;
        }

        &::before {
          opacity: 1;
          background: #60ec33;
        }

        &::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 7.9439252336vw;
          aspect-ratio: 34 / 9;
          background: url("/images/common/icon/tri-bottom-wide.svg") center bottom / 100% auto no-repeat;
          transform: translate(-50%, 130%);

          @include breakpoint.mq(min, 769px) {
            display: none;
          }
        }
      }
    }
  }

  &__main {
    @include breakpoint.mq(min, 769px) {
      width: 80.8333333333%;
      padding-top: 5px;
    }
  }

  &__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 7.0093457944vw;
    margin-bottom: 5.1401869159vw;

    @include breakpoint.mq(min, 769px) {
      padding-top: 0;
      margin-bottom: 3.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 40px;
    }

    h2 {
      margin: 0;
      color: variable.$black;
      font-family: variable.$font-display;
      font-size: 3.0373831776vw;
      font-weight: 700;
      letter-spacing: 0.08em;
      line-height: 1;

      @include breakpoint.mq(min, 769px) {
        font-size: 1.0833333333vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 13px;
      }
    }

    button {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 0;
      padding: 0;
      color: variable.$black;
      background: none;
      border: none;
      cursor: pointer;
      font-family: variable.$font-display;
      font-weight: 700;
    }
  }

  &__filterTtl {
    margin-right: 0.65em;
    font-size: 3.0373831776vw;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.25vw;
      transition: color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 15px;
    }

    small {
      margin-left: 0.5em;
      font-size: 2.5700934579vw;
      font-weight: 700;

      @include breakpoint.mq(min, 769px) {
        font-size: 1.0833333333vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 13px;
      }
    }
  }

  &__filterIcon {
    display: block;
    width: 3.5046728972vw;
    line-height: 0;

    @include breakpoint.mq(min, 769px) {
      width: 1.5vw;
    }

    @include breakpoint.mq(min, 1201px) {
      width: 18px;
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      vertical-align: middle;
    }

    rect {
      fill: #000;
    }
  }

  @include breakpoint.mq(min, 769px) {
    &__toolbar button:hover &__filterTtl {
      color: #6a6b76;
    }
  }

  &__talents,
  &__units {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__talents {
    justify-content: space-between;

    @include breakpoint.mq(min, 769px) {
      justify-content: flex-start;
    }

    li {
      width: 47.3684210526%;

      @include breakpoint.mq(min, 769px) {
        width: 22.6804123711%;
        margin-right: 3.0927835052%;
      }

      &:nth-child(n + 3) {
        margin-top: 3.2710280374vw;

        @include breakpoint.mq(min, 769px) {
          margin-top: 0;
        }
      }

      &:nth-child(n + 5) {
        @include breakpoint.mq(min, 769px) {
          margin-top: 4.1666666667vw;
        }

        @include breakpoint.mq(min, 1201px) {
          margin-top: 50px;
        }
      }

      @include breakpoint.mq(min, 769px) {
        &:nth-child(4n),
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  &__units {
    justify-content: space-between;

    li {
      width: 100%;

      &:not(:last-child) {
        margin-bottom: 7.0093457944vw;
      }

      @include breakpoint.mq(min, 769px) {
        width: 49.0721649485%;

        &:not(:last-child) {
          margin-bottom: 0;
        }

        &:nth-child(n + 3) {
          margin-top: 4.5833333333vw;
        }
      }

      @include breakpoint.mq(min, 1201px) {
        &:nth-child(n + 3) {
          margin-top: 55px;
        }
      }
    }
  }
}
</style>
