<template>
  <main>
    <template v-for="section in sections">
      <DynamicTitleText
        v-if="section.acf_fc_layout === 'titletext'"
        :text="section.titletext"
        :paddings="section.padding_settings"
        :size="section.size"
      />

      <BallymorePromo
        v-if="section.acf_fc_layout === 'header_ballymore'"
        :title="section.ballymore_hero_title"
        :image="section.ballymore_hero_image.image"
        :paddings="section.padding_settings"
      />

      <BallymoreNumbers
        v-if="section.acf_fc_layout === 'facts_list_ballymore'"
        :number-facts-list="section.number_list_facts_list"
        :paddings="section.padding_settings"
      />

      <BallymorePortfolio
        v-if="section.acf_fc_layout === 'portfolio_ballymore'"
        :portfolio-list="section.portfolio"
        :paddings="section.padding_settings"
      />

      <DynamicTextCTA
        v-if="section.acf_fc_layout === 'ctablock'"
        :data="section"
        :paddings="section.padding_settings"
      />

      <DynamicVideo v-if="section.acf_fc_layout === 'vimeo'" :video="section" :paddings="section.padding_settings" />
    </template>
  </main>

  <AppBottom v-if="footer" :data="footer"/>
  <AppFooter v-else/>
</template>

<script setup>
  import { ref, onBeforeMount } from 'vue'

  const appStore = useAppStore()

  const { data } = await useAsyncData(
    'ballymore',
    () => $fetch('https://admin.thebrentfordproject.com/wp-json/wp/v2/pages/?slug=ballymore'),
  )

  console.log(data.value);
  
  
  const sections = ref(data?.value[0]?.acf?.flexible_content)
  const footer = ref(data?.value[0]?.acf?.footer_settings)

  onBeforeMount(() => {
    appStore.setDarkHeader()
    appStore.setInitHeader(true)
  })
</script>
