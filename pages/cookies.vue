<template>
  <main class="flex flex-col gap-10 md:gap-26">
    <PrivacyContent title="Cookies" :date="new Date()" />
  </main>
</template>

<script setup>
  import { onMounted, onBeforeMount } from 'vue'

  onMounted(() => {
    if (process.client) {
      const script = document.createElement('script')
      const el = document.getElementById('cookie-bot')
      script.type = 'text/javascript'
      script.id = 'CookieDeclaration'
      script.async = true
      script.src = 'https://consent.cookiebot.com/d2076c17-122f-4bcd-9b9d-edcfdc3b556e/cd.js'

      el.appendChild(script)
    }
  })

  const appStore = useAppStore()

  onBeforeMount(() => {
    appStore.setDarkHeader()
    appStore.setInitHeader(true)
  })

  useSeoMeta({
    title: 'Cookies | The Brentford Project | Ballymore',
    ogTitle: 'Cookies | The Brentford Project | Ballymore',
    description: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    ogDescription: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    twitterCard: 'summary_large_image',
  })
</script>

<style>

</style>