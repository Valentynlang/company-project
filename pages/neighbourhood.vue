<template>
    <main>
      <!-- <NeighbourhoodInteractiveMap /> -->
      <template v-for="section in sections">
        <DynamicHeroMain v-if="section.acf_fc_layout === 'heromain'" :banner="section.heromain" />
        <DynamicTitleText v-if="section.acf_fc_layout === 'titletext'" :text="section.titletext" :paddings="section.padding_settings" colspan="2" :size="section.size" />
        <DynamicTextImage v-if="['txt_img_dbl_neighb', 'txt_img_sngl_withpromo_neighb', 'txt_img_dbl_neighb_2', 'txt_img_dbl_promo_neighb', 'txt_img_dbl_neighb_3', 'txt_img_sngl_withpromo_neighb'].includes(section.acf_fc_layout)" :data="section.text_image_double || section.text_image_single" :type="section.acf_fc_layout" :paddings="section.padding_settings" />
        <NeighbourhoodImageLabels v-if="section.acf_fc_layout === 'image_with_labels_neighb'" :paddings="section.padding_settings" />
        <NeighbourhoodGalleryAnimationBlock v-if="section.acf_fc_layout === 'floating_animation_neighb'" :paddings="section.padding_settings" class="hidden md:block"/>
        <NeighbourhoodLocations v-if="section.acf_fc_layout === 'places_gallery_neighb'" :locations="locations" :data="{ title: section.title, text: section.text }" :categories="categories" :paddings="section.padding_settings" />
        <NeighbourhoodMap v-if="section.acf_fc_layout === 'interactive_map'" :paddings="section.padding_settings" />
        <DynamicFullScreenImage v-if="section.acf_fc_layout === 'fullimg_vid' && section.fullimg_vid.type === 'image'" :image="section.fullimg_vid.image" :title="section.fullimg_vid.title" :inset="section.fullimg_vid.inset" />
        <DynamicFullScreenVideo v-if="section.acf_fc_layout === 'fullimg_vid' && section.fullimg_vid.type === 'video'" :video="section.fullimg_vid.vimeo" :title="section.fullimg_vid.title" :fallback="section.fullimg_vid.fallback" :inset="section.fullimg_vid.inset" />
        <DynamicTextCTA v-if="section.acf_fc_layout === 'ctablock'" :data="section" :paddings="section.padding_settings" />
      </template>
    </main>

    <AppBottom v-if="data[0][0].acf?.footer_settings" :data="data[0][0].acf.footer_settings" />
    <AppFooter v-else />
  </template>
  
<script setup>
  import { ref, onBeforeMount,  } from 'vue'

  const appStore = useAppStore()

  const { data } = await useAsyncData('neighbourhood', async () => {
    return await Promise.all([$fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/pages/?slug=neighbourhood`), $fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/locations/?per_page=50`)])
  })

  const sections = ref(data?.value[0][0]?.acf?.flexible_content)

  console.log(sections.value);
  
  const locations = ref(data?.value[1])

  const calculateCount = (id) => {
    return locations?.value.filter(item => item.locations_category.includes(id)).length
  }

  const categories = ref([
    {
      id: 6,
      value: 'food-drink',
      name: 'Food & Drink',
      count: calculateCount(6)
    },
    {
      id: 4,
      value: 'retail',
      name: 'Retail',
      count: calculateCount(4)
    },
    {
      id: 5,
      value: 'arts-culture',
      name: 'Arts & Culture',
      count: calculateCount(5)
    },
    {
      id: 3,
      value: 'leisure',
      name: 'Leisure',
      count: calculateCount(3)
    },
  ])
  const seoHead = ref(data?.value[0][0].yoast_head_json)

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