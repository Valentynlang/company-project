<template>
  <main class="flex flex-col gap-10 md:gap-26">
    <PrivacyContent :content="terms[0].acf.terms_content" title="Terms" :date="terms[0].acf.last_updated" />
  </main>

  <AppBottom v-if="terms[0].acf?.footer_settings" :data="terms[0].acf.footer_settings" />
  <AppFooter v-else />
</template>

<script setup>
  import { onBeforeMount } from 'vue'

  const { data: terms } = await useAsyncData(
    'terms',
    () => $fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/pages/?slug=terms`),
  )

  const seoHead = ref(terms?.value[0].yoast_head_json)

  const appStore = useAppStore()

  onBeforeMount(() => {
    appStore.setDarkHeader()
    appStore.setInitHeader(true)
  })

  useSeoMeta({
    title: seoHead.value?.og_title ? seoHead.value?.og_title : 'The Brentford Project | Ballymore',
    ogTitle: seoHead.value?.og_title ? seoHead.value?.og_title : 'The Brentford Project | Ballymore',
    description: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    ogDescription: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    twitterCard: seoHead.value?.twitter_card ? seoHead.value?.twitter_card : 'summary_large_image',
  })
</script>

<style>

</style>