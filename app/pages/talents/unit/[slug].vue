<script setup lang="ts">
const route = useRoute()
const { getUnitBySlug } = useTalents()
const isFilterOpen = ref(false)

const unit = computed(() => getUnitBySlug(String(route.params.slug)))

if (!unit.value) {
  throw createError({ statusCode: 404, statusMessage: 'Unit not found' })
}

const unitMembers = computed(() =>
  [...(unit.value?.members ?? [])],
)

const title = computed(() => unit.value!.name.replace(/<br\s*\/?>/gi, ' '))
const description = computed(() =>
  unit.value!.profileText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
)

useSeo({
  title: title.value,
  description: description.value,
})
</script>

<template>
  <div v-if="unit" class="p-unitDetail">
    <AppPageHeader title="UNIT" />

    <section class="p-unitDetail__archive">
      <div class="p-unitDetail__layout">
        <nav class="p-unitDetail__tabs" aria-label="タレント一覧切り替え">
          <div class="p-unitDetail__tab">
            <NuxtLink to="/talents/">
              <span>所属タレント一覧</span>
            </NuxtLink>
          </div>
          <div class="p-unitDetail__tab" data-status="current">
            <NuxtLink to="/talents/unit/">
              <span>ユニット一覧</span>
            </NuxtLink>
          </div>
        </nav>

        <div class="p-unitDetail__main">
          <ol class="p-unitDetail__breadcrumb" aria-label="パンくずリスト">
            <li>UNIT</li>
            <li aria-current="page">{{ title }}</li>
          </ol>

          <article class="p-unitDetail__profile">
            <picture class="p-unitDetail__visual">
              <img
                :src="unit.groupImage.url"
                :width="unit.groupImage.width"
                :height="unit.groupImage.height"
                :alt="title"
              >
            </picture>

            <picture class="p-unitDetail__logo">
              <img
                :src="unit.logo.url"
                :width="unit.logo.width"
                :height="unit.logo.height"
                alt=""
              >
            </picture>

            <div class="p-unitDetail__copy">
              <h1>{{ title }}</h1>
              <div class="p-unitDetail__description" v-html="unit.profileText" />
            </div>

            <a
              v-if="unit.xTwitterUrl"
              class="p-unitDetail__xLink"
              :href="unit.xTwitterUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 30 30" aria-hidden="true">
                <path fill="currentColor" d="M8.914,6.481,14.489,0H13.168L8.327,5.628,4.46,0H0L5.847,8.51,0,15.306H1.321L6.434,9.364l4.084,5.943h4.46L8.913,6.481ZM7.1,8.585l-.592-.847L1.8.995H3.827l3.8,5.442.592.847,4.945,7.073H11.139L7.1,8.585Z" transform="translate(7.409 7.469)" />
              </svg>
              <span>Official Unit X</span>
            </a>
          </article>

          <section v-if="unitMembers.length" class="p-unitDetail__members">
            <header class="p-unitDetail__toolbar">
              <h2>TALENT LIST</h2>
              <button type="button" @click="isFilterOpen = true">
                <span>FILTER<small>(UNIT)</small></span>
                <i aria-hidden="true">
                  <svg viewBox="0 0 15 15">
                    <rect width="15" height="15" />
                    <path d="M3.5,0,7,5H0Z" transform="translate(11 11) rotate(-180)" fill="#fff" />
                  </svg>
                </i>
              </button>
            </header>

            <ul class="p-unitDetail__memberList">
              <li v-for="(member, index) in unitMembers" :key="member.id">
                <TalentCard :talent="member" :index="index" reveal-on-scroll />
              </li>
            </ul>
          </section>
        </div>
      </div>

      <footer class="p-unitDetail__footer">
        <NuxtLink to="/talents/unit/">ユニット一覧へ</NuxtLink>
      </footer>
    </section>

    <HomeTopicsSection />
    <TalentsFilterOverlay v-model="isFilterOpen" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.p-unitDetail {
  opacity: 0;
  animation: unit-page-enter 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;

  &__archive {
    padding: 4.6728971963vw 5.8411214953% 9.3457943925vw;

    @include breakpoint.mq(min, 769px) {
      padding: 4.5833333333vw 40px 0;
    }

    @include breakpoint.mq(min, 1201px) {
      padding-top: 55px;
    }
  }

  &__layout {
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
    margin: 0 0 9.3457943925vw;

    @include breakpoint.mq(min, 769px) {
      display: block;
      width: 19.1666666667%;
      margin-bottom: 0;
    }
  }

  &__tab {
    width: 47.3684210526%;

    &:not(:last-child) {
      margin-bottom: 0.45em;
    }

    @include breakpoint.mq(min, 769px) {
      width: auto;
      font-size: 1.6666666667vw;
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
        }
      }
    }

    &[data-status='current'] a {
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

    @include breakpoint.mq(min, 769px) {
      &:hover a {
        color: #60ec33;
      }
    }
  }

  &__main {
    min-width: 0;

    @include breakpoint.mq(min, 769px) {
      width: 80.8333333333%;
      padding-top: 8.5px;
    }
  }

  &__breadcrumb {
    display: none;

    @include breakpoint.mq(min, 769px) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-height: 16px;
      margin: 0 0 3.3333333333vw;
      padding: 0;
      font-family: variable.$font-display-medium;
      font-size: 1.0833333333vw;
      font-weight: 500;
      // letter-spacing: 0.08em;
      line-height: 1;
      list-style: none;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 44px;
      font-size: 13px;
    }

    li:not(:last-child)::after {
      content: ">";
      margin-inline: 0.5em;
    }
  }

  &__profile {
    margin-bottom: 16.3551401869vw;
    text-align: center;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 7.5vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 86px;
    }
  }

  &__visual,
  &__logo {
    display: block;
    margin-inline: auto;

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  &__logo {
    // width: 76%;
    // margin-top: 2.3364485981vw;

    @include breakpoint.mq(min, 769px) {
      width: 69.587628866%;
      margin-top: 0;
    }

    // @include breakpoint.mq(min, 1201px) {
    //   margin-top: 20px;
    // }
  }

  &__visual {
    width: 100%;
    padding-top: 7px;

    @include breakpoint.mq(min, 769px) {
      // width: 82%;
      padding-top: 0;
    }
  }

  &__copy {
    margin-top: -8px;

    @include breakpoint.mq(min, 769px) {
      margin-top: -9px;
    }

    // @include breakpoint.mq(min, 1201px) {
    //   margin-top: 30px;
    // }

    h1 {
      margin: 0 0 0.56em;
      font-family: variable.$font-dela;
      font-size: 6.5420560748vw;
      font-weight: 400;
      // letter-spacing: 0.04em;
      line-height: 1.35;

      @include breakpoint.mq(min, 769px) {
        margin: 0 0 0.325em;
        font-size: 4.3333333333vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 52px;
      }
    }
  }

  &__description {
    font-family: "Noto Sans JP", sans-serif;
    font-size: 3.0373831776vw;
    font-weight: 500;
    letter-spacing: 0.08em;
    line-height: 1.8;

    :deep(.is-sp) {
      @include breakpoint.mq(min, 769px) {
        display: none;
      }
    }

    @include breakpoint.mq(min, 769px) {
      font-size: 1.4166666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 17px;
    }

    :deep(p) {
      margin: 0;
    }

    :deep(p:not(:last-child)) {
      margin-bottom: 2em;
    }
  }

  &__xLink {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    min-height: 3.2em;
    margin: 7.0093457944vw auto 0;
    color: #fff;
    background: #000;
    border: 1px solid #000;
    font-family: variable.$font-display;
    font-size: 4.2056074766vw;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1;

    @include breakpoint.mq(min, 769px) {
      width: fit-content;
      min-width: 280px;
      margin-top: 2.5vw;
      padding-inline: 22px;
      font-size: 1.5vw;
      transition: color 0.3s, background-color 0.3s;
      padding-block: 0.7em;

      &:hover {
        color: #000;
        background: #fff;
      }
    }

    @include breakpoint.mq(min, 1201px) {
      margin-top: 30px;
      font-size: 18px;
    }

    span {
      @include breakpoint.mq(min, 769px) {
        margin-right: 6.5px;
      }
    }

    svg {
      width: 1.78em;
      height: 1.78em;
      margin-right: 0.25em;
    }
  }

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4.6728971963vw;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 3.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 40px;
    }

    h2 {
      margin: 0;
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
      align-items: center;
      margin: 0;
      padding: 0;
      color: #000;
      background: none;
      border: 0;
      cursor: pointer;
      font-family: variable.$font-display;
      font-size: 3.0373831776vw;
      font-weight: 700;

      @include breakpoint.mq(min, 769px) {
        font-size: 1.25vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 15px;
      }

      small {
        margin-left: 0.5em;
        font-size: 0.85em;
      }

      i {
        display: block;
        width: 3.5046728972vw;
        margin-left: 0.65em;
        line-height: 0;

        @include breakpoint.mq(min, 769px) {
          width: 1.5vw;
        }

        @include breakpoint.mq(min, 1201px) {
          width: 18px;
        }
      }

      svg {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }

  &__memberList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    list-style: none;

    @include breakpoint.mq(min, 769px) {
      justify-content: flex-start;
    }

    li {
      width: 47.3684210526%;

      @include breakpoint.mq(min, 769px) {
        width: 22.6804123711%;
        margin-right: 3.0927835052%;

        &:nth-child(4n),
        &:last-child {
          margin-right: 0;
        }
      }

      &:nth-child(n + 3) {
        margin-top: 7.0093457944vw;

        @include breakpoint.mq(min, 769px) {
          margin-top: 0;
        }
      }
    }
  }

  // Official `.l-pagelinks` + `.md-btn__pagelinks`
  &__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 16vw;
    margin-bottom: -2.8em;
    // padding-bottom: 16.3551401869vw;

    @include breakpoint.mq(min, 769px) {
      max-width: 1200px;
      margin-inline: auto;
      // padding-top: 4.1666666667vw;
      padding-top: 6.2vw;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    @include breakpoint.mq(min, 1201px) {
      // padding-top: 50px;
      // padding-bottom: 90px;
      margin-bottom: 0;
    }

    a {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 47.3684210526%;
      padding: 0.22em 0;
      border: solid 0 #000;
      border-width: 1px 0;
      color: #000;
      font-family: variable.$font-dela;
      font-size: 5.1401869159vw;

      @include breakpoint.mq(min, 769px) {
        width: 23.3333333333%;
        font-size: 1.8333333333vw;
        transition: color 0.15s, border-color 0.15s;

        &:hover {
          border-color: #60ec33;
          color: #60ec33;
        }
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 22px;
      }
    }
  }
}

@keyframes unit-page-enter {
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .p-unitDetail {
    opacity: 1;
    animation: none;
  }
}
</style>
