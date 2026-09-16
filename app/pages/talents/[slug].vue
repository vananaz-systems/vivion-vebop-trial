<script setup lang="ts">
const route = useRoute()
const { getTalentBySlug, getUnitBySlug } = useTalents()

const talent = computed(() => getTalentBySlug(String(route.params.slug)))

if (!talent.value) {
  throw createError({ statusCode: 404, statusMessage: 'Talent not found' })
}

const unit = computed(() => (
  talent.value?.unit ? getUnitBySlug(talent.value.unit.slug) : undefined
))

const unitMembers = computed(() =>
  [...(unit.value?.members ?? [])],
)

const seoDescription = computed(() =>
  talent.value?.profileText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? '',
)

// const unitName = computed(() => unit.value?.name.replace(/<br\s*\/?>/gi, ' ') ?? '')
const unitName = unit.value?.name

const socialLinks = computed(() => {
  const links = []

  if (talent.value?.xTwitterLink) {
    links.push({
      type: 'x',
      url: talent.value.xTwitterLink,
      label: `@${getSocialHandle(talent.value.xTwitterLink)}`,
    })
  }

  if (talent.value?.youtubeLink) {
    links.push({
      type: 'youtube',
      url: talent.value.youtubeLink,
      label: getSocialHandle(talent.value.youtubeLink),
    })
  }

  return links
})

function getSocialHandle(url: string) {
  const pathname = new URL(url).pathname.replace(/\/$/, '')
  return decodeURIComponent(pathname.split('/').pop() || url)
}

useSeo({
  title: talent.value.name,
  description: seoDescription.value,
})
</script>

<template>
  <div v-if="talent" class="p-talentDetail">
    <AppPageHeader title="TALENTS" />

    <main class="p-talentDetail__main">
      <section class="p-talentDetail__visual">
        <div class="p-talentDetail__catch" aria-hidden="true">
          <img src="/images/common/deco/txt_deco_alignleft.svg" alt="">
        </div>

        <picture class="p-talentDetail__portrait">
          <img
            :src="talent.portrait.url"
            :width="talent.portrait.width"
            :height="talent.portrait.height"
            :alt="talent.name"
          >
        </picture>

        <h1 class="p-talentDetail__name">
          <span>{{ talent.name }}</span>
          <small :style="{ color: talent.theme }">{{ talent.nameEn }}</small>
        </h1>
      </section>

      <section class="p-talentDetail__info">
        <div class="p-talentDetail__infoMain">
          <dl class="p-talentDetail__profile">
            <dt :style="{ color: talent.theme }">PROFILE</dt>
            <dd v-html="talent.profileText" />
          </dl>

          <div v-if="talent.data.length" class="p-talentDetail__metadata">
            <dl v-for="entry in talent.data" :key="entry.headline">
              <dt :style="{ color: talent.theme }">
                <span :style="{ borderColor: talent.theme }">{{ entry.headline }}</span>
              </dt>
              <dd>{{ entry.content }}</dd>
            </dl>
          </div>
        </div>

        <dl v-if="socialLinks.length" class="p-talentDetail__socials">
          <dt :style="{ color: talent.theme }">I’m Here.</dt>
          <dd>
            <ul>
              <li v-for="social in socialLinks" :key="social.type">
                <a :href="social.url" target="_blank" rel="noopener noreferrer">
                  <svg v-if="social.type === 'x'" viewBox="0 0 30 30" aria-hidden="true">
                    <path fill="currentColor" d="M8.914,6.481,14.489,0H13.168L8.327,5.628,4.46,0H0L5.847,8.51,0,15.306H1.321L6.434,9.364l4.084,5.943h4.46L8.913,6.481ZM7.1,8.585l-.592-.847L1.8.995H3.827l3.8,5.442.592.847,4.945,7.073H11.139L7.1,8.585Z" transform="translate(7.409 7.469)" />
                  </svg>
                  <svg v-else viewBox="0 0 30 30" aria-hidden="true">
                    <path fill="#f00" d="M24.46 10.54a2.418 2.418 0 0 0-1.7-1.71c-1.5-.4-7.52-.4-7.52-.4s-6.02 0-7.52.4a2.418 2.418 0 0 0-1.7 1.71 27.228 27.228 0 0 0 0 9.33 2.382 2.382 0 0 0 1.7 1.68c1.5.4 7.52.4 7.52.4s6.02 0 7.52-.4a2.382 2.382 0 0 0 1.7-1.68 27.228 27.228 0 0 0 0-9.33Zm-11.19 7.52v-5.72l5.03 2.86Z" />
                  </svg>
                  <span>{{ social.label }}</span>
                </a>
              </li>
            </ul>
          </dd>
        </dl>
      </section>

      <section v-if="unit" class="p-talentDetail__unit">
        <header class="p-talentDetail__unitHeader">
          <h2>所属ユニット</h2>
        </header>

        <div class="p-talentDetail__unitLink">
          <picture class="p-talentDetail__unitVisual">
            <img
              :src="unit.groupImage.url"
              :width="unit.groupImage.width"
              :height="unit.groupImage.height"
              :alt="unitName"
            >
          </picture>

          <picture class="p-talentDetail__unitLogo">
            <img
              :src="unit.logo.url"
              :width="unit.logo.width"
              :height="unit.logo.height"
              alt=""
            >
          </picture>
        </div>

        <div class="p-talentDetail__unitProfile">
          <h3 v-html="unitName" />
          <div v-html="unit.profileText" />
        </div>

        <section v-if="unitMembers.length" class="p-talentDetail__unitMembers">
          <h3><span>UNIT MEMBER</span></h3>
          <ul>
            <li v-for="(member, index) in unitMembers" :key="member.id">
              <TalentCard :talent="member" :index="index" surface="white" />
            </li>
          </ul>
        </section>
      </section>

      <footer class="p-talentDetail__footer">
        <NuxtLink to="/talents/">タレント一覧へ</NuxtLink>
      </footer>
    </main>

    <HomeTopicsSection />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.p-talentDetail {
  opacity: 0;
  animation: talent-page-enter 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;

  &__main {
    padding-top: 3.5046728972vw;

    @include breakpoint.mq(min, 769px) {
      padding: 1.6666666667vw 40px 0;
    }

    @include breakpoint.mq(min, 1201px) {
      padding-top: 20px;
    }
  }

  &__visual,
  &__info,
  &__unit,
  &__footer {
    @include breakpoint.mq(min, 769px) {
      max-width: 1200px;
      margin-inline: auto;
    }
  }

  &__visual {
    position: relative;
    margin-bottom: 8.1775700935vw;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 5.8333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 70px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      width: 100%;
      aspect-ratio: 430 / 408;
      background: #fff;
      transform: translate(-50%, -60%);

      @include breakpoint.mq(min, 769px) {
        aspect-ratio: 1200 / 620;
        transform: translate(-50%, -50%);
      }
    }
  }

  &__catch {
    position: absolute;
    top: 10.5vw;
    left: 4.6511627907%;
    z-index: 4;
    width: 28.5046728972vw;

    @include breakpoint.mq(min, 769px) {
      top: 12.3966942149%;
      left: 1.6666666667%;
      width: 20%;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &__portrait {
    position: relative;
    z-index: 3;
    display: block;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 3.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 40px;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      // aspect-ratio: 1200 / 968;
      object-fit: contain;
      object-position: center;

      @include breakpoint.mq(min, 769px) {
        aspect-ratio: 1200 / 968;
      }
    }
  }

  &__name {
    position: relative;
    z-index: 3;
    margin: 0;
    padding: 5.7vw 5.8411214953% 0;

    @include breakpoint.mq(min, 769px) {
      padding: 0;
    }

    span,
    small {
      display: block;
      line-height: 1;
      text-align: center;
    }

    span {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 8.4112149533vw;
      font-weight: 900;
      letter-spacing: 0;

      @include breakpoint.mq(min, 769px) {
        font-size: 4.3333333333vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 52px;
      }
    }

    small {
      margin-top: 1em;
      font-family: variable.$font-display-medium;
      font-size: 2.3364485981vw;
      font-weight: 500;
      letter-spacing: 0.2em;

      @include breakpoint.mq(min, 769px) {
        font-size: 1.3333333333vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 16px;
      }
    }
  }

  &__info {
    padding-inline: 5.8411214953%;

    @include breakpoint.mq(min, 769px) {
      padding-inline: 0;
    }
  }

  &__infoMain {
    @include breakpoint.mq(min, 769px) {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 3.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 40px;
    }
  }

  &__profile,
  &__socials {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0;

    @include breakpoint.mq(min, 769px) {
      width: 58.5%;
    }

    > dt {
      width: 10.5263157895%;
      padding-top: 0.3em;
      font-family: variable.$font-display-medium;
      font-size: 2.3364485981vw;
      font-weight: 500;
      letter-spacing: 0.2em;
      line-height: 1;
      writing-mode: vertical-lr;

      @include breakpoint.mq(min, 769px) {
        width: 20.7977207977%;
        // padding-top: 0;
        font-size: 1vw;
        writing-mode: horizontal-tb;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 12px;
      }
    }

    > dd {
      width: 88.4210526316%;
      margin: 0;

      @include breakpoint.mq(min, 769px) {
        width: 79.2022792023%;
      }
    }
  }

  &__profile > dd {
    font-family: variable.$font-sans;
    font-size: 3.0373831776vw;
    line-height: 1.8;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.1666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 14px;
    }

    :deep(p) {
      margin: 0;
    }

    :deep(p:not(:last-child)) {
      margin-bottom: 1.4em;
    }
  }

  &__metadata {
    width: 88.4210526316%;
    margin-left: auto;

    &::before {
      content: "";
      display: block;
      width: 3.5046728972vw;
      height: 1px;
      margin: 5.8411214953vw 0;
      background: #000;
    }

    @include breakpoint.mq(min, 769px) {
      width: 33.0833333333%;

      &::before {
        display: none;
      }
    }

    dl {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding-bottom: 2.3364485981vw;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      &:not(:last-child) {
        margin-bottom: 2.8037383178vw;
      }

      @include breakpoint.mq(min, 769px) {
        padding-bottom: 0.8333333333vw;

        &:not(:last-child) {
          margin-bottom: 1.25vw;
        }
      }

      @include breakpoint.mq(min, 1201px) {
        padding-bottom: 10px;

        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }

    dt {
      width: 26.7857142857%;
      font-family: variable.$font-dela;
      font-size: 3.738317757vw;
      font-weight: 400;

      @include breakpoint.mq(min, 769px) {
        width: 21.1586901763%;
        font-size: 1.25vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 15px;
      }

      span {
        display: block;
        padding-left: 0.6em;
        color: #000;
        border-left: 3px solid;
        line-height: 1;

        @include breakpoint.mq(min, 769px) {
          padding-left: 0;
          color: inherit;
          border-left: 0;
        }
      }
    }

    dd {
      width: 73.2142857143%;
      margin: 0;
      font-family: "Noto Sans JP", sans-serif;
      font-size: 3.0373831776vw;
      font-weight: 700;

      @include breakpoint.mq(min, 769px) {
        width: 76.8261964736%;
        font-size: 1.1666666667vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 14px;
      }
    }
  }

  &__socials {
    margin-top: 7.0093457944vw;

    @include breakpoint.mq(min, 769px) {
      margin-top: 0;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li:not(:last-child) {
      margin-bottom: 1.8691588785vw;

      @include breakpoint.mq(min, 769px) {
        margin-bottom: 0.6666666667vw;
      }

      @include breakpoint.mq(min, 1201px) {
        margin-bottom: 8px;
      }
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000;

      @include breakpoint.mq(min, 769px) {
        justify-content: flex-start;
        transition: opacity 0.3s;

        &:hover {
          opacity: 0.5;
        }
      }

      svg {
        display: block;
        width: 10.2739726027%;
        height: auto;

        @include breakpoint.mq(min, 769px) {
          width: 2.5vw;
        }

        @include breakpoint.mq(min, 1201px) {
          width: 30px;
        }
      }

      span {
        width: 88.3561643836%;
        font-family: variable.$font-display-medium;
        font-size: 2.8037383178vw;
        font-weight: 500;

        @include breakpoint.mq(min, 769px) {
          width: auto;
          margin-left: 0.8333333333vw;
          font-size: 1vw;
        }

        @include breakpoint.mq(min, 1201px) {
          margin-left: 10px;
          font-size: 12px;
        }
      }
    }
  }

  &__unit {
    margin-top: 16.3551401869vw;
    // padding: 21.0280373832vw 5.8411214953% 18.691588785vw;
    padding: 21.0280373832vw 0 18.691588785vw;
    background: #fff;

    @include breakpoint.mq(min, 769px) {
      margin-top: 7.5vw;
      padding: 7.5vw 8.3333333333vw 6.6666666667vw;
      max-width: 1400px;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-top: 90px;
      padding: 90px 100px 80px;
    }
  }

  &__unitHeader {
    position: relative;
    margin-bottom: 2.3364485981vw;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 3.75vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 45px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 25.7009345794vw;
      aspect-ratio: 1;
      background: url("/images/common/icon-thunder.svg") center / contain no-repeat;
      opacity: 0.12;
      transform: translate(-50%, -50%);

      @include breakpoint.mq(min, 769px) {
        width: 9.1666666667vw;
      }

      @include breakpoint.mq(min, 1201px) {
        width: 110px;
      }
    }

    h2 {
      position: relative;
      z-index: 1;
      width: fit-content;
      margin: 0 auto;
      font-family: variable.$font-dela;
      font-size: 5.1401869159vw;
      font-weight: 400;
      line-height: 1;

      @include breakpoint.mq(min, 769px) {
        font-size: 2.1666666667vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 26px;
      }
    }
  }

  &__unitLink {
    display: block;
    color: #000;

    // @include breakpoint.mq(min, 769px) {
    //   transition: opacity 0.3s;

    //   &:hover {
    //     opacity: 0.7;
    //   }
    // }
  }

  &__unitVisual,
  &__unitLogo {
    display: block;
    margin-inline: auto;

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  &__unitVisual {
    width: 100%;

    @include breakpoint.mq(min, 769px) {
      width: 76.8%;
    }
  }

  &__unitLogo {
    width: 76%;

    @include breakpoint.mq(min, 769px) {
      width: 47%;
    }
  }

  &__unitProfile {
    margin-bottom: 14.0186915888vw;
    text-align: center;
    margin-top: -0.4em;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 5vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 65px;
    }

    h3 {
      margin: 0 0 0.75em;
      font-family: variable.$font-dela;
      font-size: 6.5420560748vw;
      font-weight: 400;
      line-height: 1.3;

      @include breakpoint.mq(min, 769px) {
        margin-bottom: 0.35em;
        font-size: 3.3333333333vw;
      }

      @include breakpoint.mq(min, 1201px) {
        font-size: 40px;
      }
    }

    > div {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 3.0373831776vw;
      font-weight: 500;
      line-height: 2;

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

    }

    :deep(p) {
      margin: 0;
      letter-spacing: 0.08em;
      line-height: 1.8;
    }

    :deep(p:not(:last-child)) {
      margin-bottom: 2em;
    }
  }

  &__unitMembers {
    padding-inline: 5.8411214953%;

    @include breakpoint.mq(min, 769px) {
      padding-inline: 0;
    }

    > h3 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 4.6728971963vw;
      color: #6a6b76;
      font-family: variable.$font-display;
      font-size: 2.3364485981vw;
      font-weight: 600;
      letter-spacing: 0.2em;
      line-height: 1;

      @include breakpoint.mq(min, 769px) {
        margin-bottom: 1.6666666667vw;
        font-size: 1.1666666667vw;
      }

      @include breakpoint.mq(min, 1201px) {
        margin-bottom: 26px;
        font-size: 14px;
      }

      &::before,
      &::after {
        content: "";
        flex-grow: 1;
        height: 1px;
        background: #6a6b76;
      }

      span {
        margin-inline: 0.7em 0.5em;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0;
      padding: 0;
      list-style: none;

      @include breakpoint.mq(min, 769px) {
        justify-content: center;
      }
    }

    li {
      width: 47.3684210526%;

      @include breakpoint.mq(min, 769px) {
        width: 22.6804123711%;
        margin-right: 3.0927835052%;

        &:last-child,
        &:nth-child(4n) {
          margin-right: 0;
        }
      }

      &:nth-child(n + 3) {
        margin-top: 3.3vw;

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
    padding: 11.6822429907vw 0 16.3551401869vw;

    @include breakpoint.mq(min, 769px) {
      padding: 4.1666666667vw 0 7.5vw;
    }

    @include breakpoint.mq(min, 1201px) {
      padding: 50px 0 0px;
    }

    a {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 47.3684210526%;
      padding: 0.23em 0;
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

@keyframes talent-page-enter {
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .p-talentDetail {
    opacity: 1;
    animation: none;
  }
}
</style>
