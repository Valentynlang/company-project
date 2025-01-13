<template>
  <section
    ref="section"
    class="relative overflow-hidden"
    :class="{ 'md:m-10': inset }"
  >
    <div ref="imageEl">
      <AppImage
        is-lazy-loading="true"
        :image="responsiveImage(image?.image, image?.imagemob)"
        :imageType="WPImageType.fullScreen"
        class="max-md:aspect-[2/3] w-full md:w-screen md:aspect-[16/9] object-cover"
      />
    </div>
    <h4 v-if="title" class="absolute top-3 md:top-10 left-5 md:left-10 text-10 md:text-20 font-bold uppercase text-white" ref="titleEl">{{ title }}</h4>
  </section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WPImageType } from '~/types/enums/wp-image-type'

defineProps({
  image: {
    type: Object,
    default: () => {}
  },
  title: {
    type: String,
    default: ''
  },
  inset: {
    type: Boolean,
    default: false
  },
})

const { responsiveImage } = useResponsiveImage()

const imageEl = ref(null)
const titleEl = ref(null)
const section = ref(null)

onMounted(async() => {
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

  gsap.from(imageEl.value, {
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
      trigger: section.value,
      start: 'top 80%',
      toggleActions: 'play none none reset',
    },
  });

  if (titleEl.value) {
    gsap.from(titleEl.value, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      scrollTrigger: {
        trigger: section.value,
        start: 'top 80%',
        toggleActions: 'play none none reset',
      },
    });
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>
