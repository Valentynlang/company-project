<template>
  <main class="mb-10">
    <template v-for="section in sections">
      <HomeHeaderTop v-if="section.acf_fc_layout === 'homepage_header_top'" :data="section" />
      <HomeHeaderBottom v-if="section.acf_fc_layout === 'homepage_header_bottom'" :data="section" />
      <HomeJournal v-if="section.acf_fc_layout === 'journal_latest'" :articles="articles" />
      <HomeVision v-if="section.acf_fc_layout === 'homepage_vision'" :data="section" />
      <HomePromo v-if="section.acf_fc_layout === 'homepage_promo'" :data="section" />
      <HomeFeed v-if="section.acf_fc_layout === 'instagram_feed'" :data="section" />
    </template>
  </main>

  <AppFooter />
</template>

<script setup>
  import { ref, onBeforeMount } from 'vue'

  const appStore = useAppStore()

  const { data } = await useAsyncData('home', async () => {
    return await Promise.all([$fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/pages/?slug=home`), $fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/journal/?per_page=8&order=desc`), $fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/journal_category/`)])
  })
  
  const sections = ref(data?.value[0][0]?.acf?.flexible_content)
  const seoHead = ref(data?.value[0][0]?.yoast_head_json)
  const articles = ref(data?.value[1]).value.filter(article => article.acf.hide_article_promo_on_index === false).slice(0, 3);



  const categories = ref(data?.value[2])

  if (!appStore.categories.length) {
    appStore.getCategories(categories.value)
  }

  onBeforeMount(() => {
    appStore.setDarkHeader()
    appStore.setInitHeader(true)

    if(!appStore.categories.length) {
      appStore.getCategories()
    }
  })

  useSeoMeta({
    title: seoHead.value?.og_title ? seoHead.value?.og_title : 'The Brentford Project | Ballymore',
    ogTitle: seoHead.value?.og_title ? seoHead.value?.og_title : 'The Brentford Project | Ballymore',
    description: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    ogDescription: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    twitterCard: seoHead.value?.twitter_card ? seoHead.value?.twitter_card : 'summary_large_image',
  })
</script>
