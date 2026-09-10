<script setup lang="ts">
defineProps<{
  name: string
  image: string
  description: string[]
  ctaLabel: string
  ctaStacked?: boolean
  to: string
}>()

type BodyPart = {
  text: string
  br?: 'always' | 'sp'
}

function bodyParts(paragraph: string): BodyPart[] {
  const parts: BodyPart[] = []
  const tokens = paragraph.split(/(\{sp\}|\n)/)

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (!token || token === '{sp}' || token === '\n') continue

    const next = tokens[i + 1]
    parts.push({
      text: token,
      br: next === '{sp}' ? 'sp' : next === '\n' ? 'always' : undefined,
    })
  }

  return parts
}
</script>

<template>
  <article class="c-talentSlide">
    <div class="c-talentSlide__visual">
      <img :src="image" :alt="name" loading="eager" decoding="async">
    </div>
    <div class="c-talentSlide__main">
      <h3 class="c-talentSlide__name">{{ name }}</h3>
      <div class="c-talentSlide__body">
        <p v-for="(paragraph, index) in description" :key="index">
          <template v-for="(part, partIndex) in bodyParts(paragraph)" :key="partIndex">
            {{ part.text }}<br v-if="part.br === 'sp'" class="c-talentSlide__br-sp"><br v-else-if="part.br">
          </template>
        </p>
      </div>
      <div class="c-talentSlide__footer">
        <AppCtaButton :to="to" :stacked="ctaStacked">
          <template v-if="ctaStacked">
            <span v-for="word in ctaLabel.split(/\s+/)" :key="word">{{ word }}</span>
          </template>
          <template v-else>
            {{ ctaLabel }}
          </template>
        </AppCtaButton>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;
@use '~/assets/scss/foundation/config/breakpoint' as breakpoint;

.c-talentSlide {
  width: 100%;
  max-width: 1000px;
  margin-inline: auto;
  padding-bottom: 14.0186915888vw;
  text-align: center;
  color: variable.$black;

  @include breakpoint.mq(min, 769px) {
    padding-bottom: 8.3333333333vw;
  }

  @include breakpoint.mq(min, 1201px) {
    padding-bottom: 100px;
  }

  &__visual {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    aspect-ratio: 1000 / 530;
    margin-bottom: 3.5046728972vw;
    background: variable.$white;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 1.6666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      width: 1000px;
      height: 530px;
      aspect-ratio: auto;
      margin-bottom: 20px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }
  }

  &__main {
    @include breakpoint.mq(max, 768px) {
      width: 93.4895833333%;
      margin-left: auto;
    }
  }

  &__name {
    margin-bottom: 4.6728971963vw;
    font-family: variable.$font-dela;
    font-size: 6.5420560748vw;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1;
    text-align: center;
    white-space: pre-line;

    @include breakpoint.mq(min, 769px) {
      margin-bottom: 2.5vw;
      font-size: 4.3333333333vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-bottom: 30px;
      font-size: 52px;
    }
  }

  &__body {
    font-family: "Noto Sans JP", sans-serif;
    font-optical-sizing: auto;
    font-size: 3.0373831776vw;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.08em;
    line-height: 1.8;
    text-align: center;

    @include breakpoint.mq(min, 769px) {
      font-size: 1.4166666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      font-size: 17px;
    }

    p {
      letter-spacing: 0.08em;
      text-align: center;
    }

    p:not(:last-child) {
      margin-bottom: 2em;
    }
  }

  &__br-sp {
    @include breakpoint.mq(min, 769px) {
      display: none !important;
    }
  }

  &__footer {
    margin-top: 9.3457943925vw;

    @include breakpoint.mq(min, 769px) {
      margin-top: 4.1666666667vw;
    }

    @include breakpoint.mq(min, 1201px) {
      margin-top: 50px;
    }
  }
}
</style>
