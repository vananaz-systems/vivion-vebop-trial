<script setup lang="ts">
import { contactPage } from '~/data/pages'

useSeo({
  title: 'CONTACT',
  description: contactPage.intro,
})

const form = reactive({
  name: '',
  email: '',
  message: '',
})

function onSubmit() {
  // Submit to `brand.contact.endpoint` once the form API is connected.
}
</script>

<template>
  <article class="l-content p-contact">
    <AppPageHeader
      eyebrow="CONTACT"
      :title="contactPage.title"
      :description="contactPage.intro"
    />

    <form class="p-contact__form" @submit.prevent="onSubmit">
      <label>
        お名前
        <input v-model="form.name" type="text" name="name" autocomplete="name">
      </label>
      <label>
        メールアドレス
        <input v-model="form.email" type="email" name="email" autocomplete="email">
      </label>
      <label>
        お問い合わせ内容
        <textarea v-model="form.message" name="message" rows="6" />
      </label>
      <button type="submit">送信（準備中）</button>
    </form>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/foundation/config/variable' as variable;

.p-contact {
  &__form {
    display: grid;
    gap: 1.25rem;
    max-width: 36rem;
  }

  label {
    display: grid;
    gap: 0.45rem;
  }

  input,
  textarea,
  button {
    width: 100%;
    padding: 0.85rem 0.9rem;
    color: variable.$text;
    background: variable.$surface;
    border: 1px solid variable.$border;
  }

  button {
    width: fit-content;
    letter-spacing: 0.08em;
  }
}
</style>
