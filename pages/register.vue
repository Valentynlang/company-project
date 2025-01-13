<template>
  <main>
    <RegisterPromo :data="{ title: sections.page_title, image: sections.hero_image.image }" />
    <RegisterForm :data="{ title: sections.panel_title, intro: sections.intro_text, pricing: sections.pricing_text, retail: sections.retail_offer, hours: sections.sales_gallery_hours }" />
    <RegisterMap :data="{ link: sections.get_directions_link, image: sections.illustrated_map_image.image }" />
  </main>

  <AppFooter />
</template>

<script setup>
  import { onBeforeUnmount } from 'vue'

  const appStore = useAppStore()

  const { data } = await useAsyncData(
    'contact',
    () => $fetch('https://admin.thebrentfordproject.com/wp-json/wp/v2/pages/?slug=register'),
  )

  const sections = ref(data?.value[0]?.acf)
  const seoHead = ref(data?.value[0].yoast_head_json)

  onBeforeMount(() => {
    appStore.setLightHeader()
    appStore.setInitHeader(false)
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