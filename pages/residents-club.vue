<template>
    <main>
      <template v-for="section in sections">
        <DynamicHeroMain v-if="section.acf_fc_layout === 'heromain'" :banner="section.heromain" />
        <DynamicTitleText v-if="section.acf_fc_layout === 'titletext'" :text="section.titletext" :paddings="section.padding_settings" page="residents-club" :size="section.size" />
        <ResidentClubPoolGrid v-if="section.acf_fc_layout === 'animation_gallery_res_club'" :paddings="section.padding_settings" />
        <ResidentClubGymScrool v-if="section.acf_fc_layout === 'scrolling_panel_res_club'" :data="section" :paddings="section.padding_settings" />
        <DynamicTextImage v-if="['txt_img_dbl_res_club', 'txt_img_dbl_dark_bg_res'].includes(section.acf_fc_layout)" :data="section.text_image_double || section.text_image_single" :type="section.acf_fc_layout" :paddings="section.padding_settings" />        
        <DynamicFullScreenImage v-if="section.acf_fc_layout === 'fullimg_vid' && section.fullimg_vid.type === 'image'" :image="section.fullimg_vid.image" :title="section.fullimg_vid.title" :inset="section.fullimg_vid.inset" />
        <DynamicFullScreenVideo v-if="section.acf_fc_layout === 'fullimg_vid' && section.fullimg_vid.type === 'video'" :video="section.fullimg_vid.vimeo" :title="section.fullimg_vid.title" :fallback="section.fullimg_vid.fallback" :inset="section.fullimg_vid.inset" />
      </template>
    </main>

    <AppBottom v-if="data[0].acf?.footer_settings" :data="data[0].acf.footer_settings" />
    <AppFooter v-else />
  </template>
  
<script setup>
  import { ref, onBeforeMount,  } from 'vue'

  const appStore = useAppStore()

  const { data } = await useAsyncData(
    'residents-club',
    () => $fetch('https://admin.thebrentfordproject.com/wp-json/wp/v2/pages/?slug=residents-club'),
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