<template>
  <main>
    <template v-for="section in sections">
      <JournalImageBanner v-if="section.acf_fc_layout === 'herotitleimg'" :banner="section.herotitleimg" />
      <DynamicSingleColumnText v-if="section.acf_fc_layout === 'single_text' && section.single_text.options === 'single'" :text="section.single_text" :paddings="section.padding_settings" />
      <DynamicDoubleColumnText v-if="section.acf_fc_layout === 'single_text' && section.single_text.options === 'double'" :text="section.single_text" :paddings="section.padding_settings" />
      <DynamicRichText v-if="section.acf_fc_layout === 'free_html'" :text="section" :paddings="section.padding_settings" />
      <JournalTextImage v-if="section.acf_fc_layout === 'text_image'" :data="section.text_image" :paddings="section.padding_settings" />
      <DynamicCTA v-if="section.acf_fc_layout === 'ctablock'" :button="section" :paddings="section.padding_settings" />
      <DynamicVideo v-if="section.acf_fc_layout === 'vimeo'" :video="section" :paddings="section.padding_settings" />
      <DynamicTestimonialQuote v-if="section.acf_fc_layout === 'intro_quote'" :quote="section.intro_quote" :paddings="section.padding_settings" />
      <DynamicGallery v-if="section.acf_fc_layout === 'gallery'" :galleryItems="section.gallery.media_item" :paddings="section.padding_settings" />
      <DynamicDoubleImage v-if="section.acf_fc_layout === 'single_double_image' && section.single_double_image.image2.image" :images="section.single_double_image" :paddings="section.padding_settings" />
      <DynamicSingleImage v-if="section.acf_fc_layout === 'single_double_image' && !section.single_double_image.image2.image" :images="section.single_double_image" :paddings="section.padding_settings" />
      <JournalPortfolio v-if="section.acf_fc_layout === 'asset_library'" :assets="section.asset_library" />
    </template>
   <JournalExploreMore :articles="exploreArticles" />
  </main>

  <AppFooter />
</template>

<script setup>
  import { ref } from 'vue'

  const { $preview } = useNuxtApp();

  const appStore = useAppStore()
  const route = useRoute()

  const categories = ref(null)
  const sections = ref(null)
  const exploreArticles = ref(null)
  const seoHead = ref(null)

  const { data } = await useAsyncData(route.params.slug, async () => {
    const [categoriesResponse, sectionsResponse, exploreArticlesResponse] = await Promise.all([fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/journal_category/`), fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/journal/?slug=${route.params.slug}`), fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/journal?per_page=8`)])
 
    const categoriesRes = await categoriesResponse.json()
    const sectionsRes = await sectionsResponse.json()
    const exploreArticlesRes = await exploreArticlesResponse.json()

    const filteredExploreMore = exploreArticlesRes
      .filter(article => article.acf.hide_article_promo_on_index === false && article.slug !== route.params.slug) 
      // Filter the array
      .slice(0, 4);

    if ($preview.value) {
      categories.value = categoriesRes
      sections.value = sectionsRes[0]?.acf?.flexible_content      
      exploreArticles.value = filteredExploreMore
      
      seoHead.value = sectionsRes[0].yoast_head_json
    }

    return {
      categoriesRes,
      sectionsRes,
      filteredExploreMore
    } 
  })

  if (!appStore.categories.length) {
    appStore.getCategories(categories.value)
  }


  onBeforeMount(() => {
    appStore.setLightHeader()
    appStore.setInitHeader(false)

    if(!appStore.categories.length) {
      appStore.getCategories()
    }
  })

  onMounted(() => {
    if (!$preview.value) {
      categories.value = data.value?.categoriesRes
      sections.value = data.value?.sectionsRes[0]?.acf?.flexible_content      
      exploreArticles.value = data.value?.filteredExploreMore
      seoHead.value = data.value?.sectionsRes[0].yoast_head_json
    }
  })

  useSeoMeta({
    title: seoHead.value?.og_title ? seoHead.value?.og_title : 'The Brentford Project | Ballymore',
    ogTitle: seoHead.value?.og_title ? seoHead.value?.og_title : 'The Brentford Project | Ballymore',
    /*description: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    ogDescription: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',*/
    twitterCard: seoHead.value?.twitter_card ? seoHead.value?.twitter_card : 'summary_large_image',
  })
</script>

<style>
</style>