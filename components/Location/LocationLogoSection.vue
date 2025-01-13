<template>
  <div class="relative py-45 bg-black text-white ">
    <div class="w-full overflow-hidden whitespace-nowrap">
      <div ref="carouselInner" class="carousel-inner flex">
        <div
          v-for="logoItem in logos"
          :key="logoItem.logo.image.ID"
          class="flex items-center justify-center w-1/6 text-center carousel-item py-10 "
        >
          <AppImage
            :image="logoItem.logo.image"
            :image-type="WPImageType.oneFourthScreen"
            is-lazy-loading="true"
            :load-immediately="true"
          />
        </div>
      </div>
    </div>
    <div class="absolute bottom-10 w-full">
      <p class="text-white uppercase font-medium text-center">{{ strapline }}</p>
    </div>
  </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  import {WPImageType} from '~/types/enums/wp-image-type'

  const props = defineProps({
    logos: {
      type: Array,
      default: () => []
    },
    strapline: {
      type: String,
      default: ''
    }
  })
  
  const carouselInner = ref(null)
  
  onMounted(() => {
    window.addEventListener('DOMContentLoaded', initAnimation)
    initAnimation()
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('DOMContentLoaded', initAnimation)
  })
  
  const initAnimation = () => {
    gsap.registerPlugin(ScrollTrigger)

    const carousel = document.querySelector(".carousel-inner")
    const items = gsap.utils.toArray(".carousel-item")
  
    items.forEach(item => {
      let clone = item.cloneNode(true)
      carousel?.appendChild(clone)
    })
  
    const totalWidth = items[0].offsetWidth * items.length
  
    gsap.to(carousel, {
      x: -totalWidth -20,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(value => parseFloat(value) % totalWidth)
      }
    })
  }
</script>
  
<style lang="scss" scoped>
  .carousel-item {
    min-width: 70%;
    flex: 0 0 auto;
    
  }
  @media (min-width: 800px) {
  .carousel-item {
    min-width: 1%;
    flex: 0 0 auto;
  }
  }
</style>
  