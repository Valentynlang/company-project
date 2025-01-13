<template>
  <div class="max-md:mb-12.5 md:m-10">
    <div class="relative">
      <AppImage
        :image="responsiveImage(siteplan.image, siteplan.imagemob)"
        :imageType="WPImageType.fullScreen"
        is-lazy-loading="true"
        class="w-full h-120 object-cover md:h-auto"
      />
  
      <div class="absolute top-6 right-6">
        <AppButton class="hidden md:block" color="black" text="LOCATION MAP" icon="expand" size="small" @click="openModal()" />
        <AppButton class="block md:hidden" color="black" icon="expand" size="small" @click="openModal()" />
      </div>
    </div>
  </div>

  <ClientOnly>
    <Teleport to="body">
      <FeaturedHomesExpandModal :siteplan="siteplan" v-if="isExpand" @close-modal="closeModal" />
    </Teleport>
  </ClientOnly>
</template>

<script setup>
  import { ref } from 'vue'
  import { WPImageType } from '~/types/enums/wp-image-type'

  defineProps({
    siteplan: {
      type: Object,
      default: () => ({})
    }
  })

  const { responsiveImage } = useResponsiveImage()

  const isExpand = ref(false)

  const openModal = () => {
    isExpand.value = true
  }

  const closeModal = () => {
    isExpand.value = false
  }
</script>

<style>

</style>