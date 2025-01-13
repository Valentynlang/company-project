<template>
  <div class="sitemap-modal fixed top-0 left-0 w-full h-full bg-white z-20 flex items-center justify-center">
    <button
      class="rounded-full bg-black absolute top-10 right-10 w-8 h-8 sm:w-16 sm:h-16 flex items-center justify-center z-50"
      @click="closeModal()"
    >
      <CloseIcon class="text-white w-3 h-3 sm:w-5 sm:h-5" />  
    </button>

    <AppImage
      :image="responsiveImage(siteplan.image, siteplan.imagemob)"
      :imageType="WPImageType.fullScreen"
      is-lazy-loading="true"
      class="w-full h-full object-contain"
    />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
  import CloseIcon from '@/public/svg/close.svg'
  import { WPImageType } from '~/types/enums/wp-image-type'

  const props = defineProps({
    siteplan: {
      type: Object,
      default: () => {}
    }
  })

  const { responsiveImage } = useResponsiveImage()

  gsap.registerPlugin(ScrollToPlugin)

  const emit = defineEmits(['close-modal'])

  const closeModal = () => {
    gsap.fromTo(
      ".sitemap-modal",
      { yPercent: 0 },
      { yPercent: -100, duration: 1, ease: "expo.out", onComplete: () => emit('close-modal') }
    )
  }

  onMounted(() => {
    gsap.fromTo(
      ".sitemap-modal",
      { yPercent: -100 },
      { yPercent: 0, duration: 1, ease: "expo.out" }
    )
  })
</script>

<style>

</style>