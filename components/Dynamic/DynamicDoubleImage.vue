<template>
  <section
    class="hd_clamp flex flex-col gap-10 px-5 md:px-10 md:grid md:grid-cols-12 md:gap-10"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}` : '' ]"
    ref="section"
  >
    <div v-if="images?.image1?.image" class="col-start-2 col-end-7 text-center" ref="leftImageContainer">
      <AppImage
        class="h-auto w-full object-contain"
        :image="images?.image1?.image"
        :image-type="WPImageType.fullScreen"
        is-lazy-loading="true"
      />
      <span v-if="images?.caption" class="block text-4.5 mt-3 text-black">{{ images?.caption }}</span>
    </div>

    <div v-if="images?.image2?.image" class="col-start-7 col-end-12" ref="rightImageContainer">
      <AppImage
        class="w-full h-auto object-contain"
        :image="images?.image2?.image"
        :image-type="WPImageType.fullScreen"
        is-lazy-loading="true"
      />
      <span v-if="images?.caption_2" class="block text-4.5 mt-3 text-black">{{ images?.caption_2 }}</span>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { WPImageType } from '~/types/enums/wp-image-type'

defineProps({
  images: {
    type: Object,
    default: () => ({})
  },
  paddings: {
    type: Object,
    default: () => ({})
  },
})

const section = ref(null)
const leftImageContainer = ref(null)
const rightImageContainer = ref(null)

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  const waitForImages = new Promise((resolve) => {
    const images = section.value.querySelectorAll('img')
    let loadedImages = 0
    images.forEach((img) => {
      if (img.complete) {
        loadedImages++
      } else {
        img.addEventListener('load', () => {
          loadedImages++
          if (loadedImages === images.length) resolve()
        })
        img.addEventListener('error', () => {
          loadedImages++
          if (loadedImages === images.length) resolve()
        })
      }
    })
    if (loadedImages === images.length) resolve()
  })

  await waitForImages

  gsap.from(leftImageContainer.value, {
    opacity: 0,
    x: -100,
    duration: 1,
    scrollTrigger: {
      trigger: section.value,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none none',
    }
  })

  gsap.from(rightImageContainer.value, {
    opacity: 0,
    x: 100,
    duration: 1,
    scrollTrigger: {
      trigger: section.value,
      start: 'top 70%',
      end: 'top 40%',
      toggleActions: 'play none none none',
    }
  })
})
</script>
