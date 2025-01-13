<template>
  <main>
    <FeaturedHomesPromo :banner="{ image: section.hero_image, main_title: section.main_title || 'Featured Homes' }" />
    <FeaturedHomesInfo :data="{ title: section.title, text: section.text, image_1: section.image_1, image_2: section.image_2, image_3: section.image_3 }" />
    <FeaturedHomesProperties v-if="isDesktop" :intro="section.intro_text" :properties="properties" />
    <FeaturedHomesPropertiesMobile v-else :intro="section.intro_text" :properties="properties" />
    <FeaturedHomesSiteplan :siteplan="section.siteplan_image" />
  </main>

  <AppBottom v-if="section.footer_settings" :data="section.footer_settings" />
  <AppFooter v-else />
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, onBeforeMount } from 'vue'

  const { data } = await useAsyncData('featured-homes', async () => {
    return await Promise.all([$fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/pages/?slug=featured-homes`), $fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/property?orderby=menu_order&order=asc&per_page=99`)])
  })

  const section = ref(data?.value[0][0]?.acf)
  const properties = ref(data?.value[1])
  const seoHead = ref(data?.value[0][0].yoast_head_json)

  const appStore = useAppStore()

  const isDesktop = ref(false)

  const onResize = () =>  {
    isDesktop.value = window.innerWidth > 768 ? true : false 
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
    onResize()
  })

  onBeforeMount(() => {
    appStore.setLightHeader()
    appStore.setInitHeader(false)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
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