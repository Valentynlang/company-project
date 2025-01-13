<template>
  <main>
    <template v-for="section in sections">
      <DynamicHeroMain v-if="section.acf_fc_layout === 'heromain'" :banner="section.heromain" />
      <DynamicTitleText v-if="section.acf_fc_layout === 'titletext'" :text="section.titletext" :paddings="section.padding_settings" :size="section.size" />
      <DynamicTextImage v-if="section.acf_fc_layout === 'txt_img_dbl_building_1' || section.acf_fc_layout === 'txt_img_sngl_building_sq' || section.acf_fc_layout === 'txt_img_dbl_building_2'" :data="section.text_image_double || section.text_image_single" :type="section.acf_fc_layout" :paddings="section.padding_settings" />
      <DynamicFullScreenImage v-if="section.acf_fc_layout === 'fullimg_vid' && section.fullimg_vid.type === 'image'" :image="section.fullimg_vid.image" :inset="section.fullimg_vid.inset" :title="section.fullimg_vid.title" />
      <DynamicFullScreenVideo v-if="section.acf_fc_layout === 'fullimg_vid' && section.fullimg_vid.type === 'video'" :video="section.fullimg_vid.vimeo" :fallback="section.fullimg_vid.fallback" :inset="section.fullimg_vid.inset" :title="section.fullimg_vid.title" />
      <DynamicGalleryPeaks v-if="section.acf_fc_layout === 'gallery'" :gallery="section.gallery.images" :paddings="section.padding_settings" />
      <DynamicTextCTA v-if="section.acf_fc_layout === 'ctablock'" :data="section" :paddings="section.padding_settings" />
      <QuincyFloorplan v-if="section.acf_fc_layout === 'floorplans'" :floorplans="section.list" :paddings="section.padding_settings" />
    </template>
  </main>

  <AppBottom v-if="data[0].acf?.footer_settings" :data="data[0].acf.footer_settings" />
  <AppFooter v-else />
</template>

<script setup>
  import { ref } from 'vue'

  const appStore = useAppStore()

  const { data } = await useAsyncData(
    'quincy',
    () => $fetch('https://admin.thebrentfordproject.com/wp-json/wp/v2/pages/?slug=quincy-house'),
  )

  const sections = ref(data?.value[0]?.acf?.flexible_content)
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