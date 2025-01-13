<template>
  <section class="h-screen relative px-5 md:px-10 pb-8 md:pb-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-end" ref="section">
    <div class="backdrop" />
    <AppImage
      is-lazy-loading="true"
      :image="responsiveImage(banner.img.image, banner.img.imagemob)"
      :imageType="WPImageType.fullScreen"
      class="img-bg"
    />
    <div class="md:col-start-3 md:col-end-11 relative flex flex-col items-center z-10" ref="content">
      <span v-if="banner.subtitle" class="text-white text-center uppercase text-4 md:text-4.5 mb-4" ref="subtitle">{{ banner.subtitle }}</span>
      <h1 v-if="banner.title" class="w-full text-center font-bold uppercase text-11 md:text-18 text-white m-0 tracking-tight" ref="title">{{ banner.title }}</h1>
      <p v-if="banner.desc_text" class="text-white text-center text-4.5 mt-6" ref="descText">{{ banner.desc_text }}</p>
      <button class="mt-8 md:mt-13" @click="scrollTo()" ref="button">
        <NuxtImg src="/svg/circle-arrow-down.svg" class="h-13" loading="lazy" alt="Circle arrow down icon" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WPImageType } from '~/types/enums/wp-image-type'

const props = defineProps({
  banner: {
    type: Object,
    default: () => ({})
  }
})

const { responsiveImage } = useResponsiveImage()

const section = ref(null)
const image = ref(null)
const content = ref(null)
const subtitle = ref(null)
const title = ref(null)
const descText = ref(null)
const button = ref(null)

const scrollTo = () => {
  const sectionElement = document.getElementsByTagName('section')[1]

  if (sectionElement) {
    gsap.to(window, {duration: 1, scrollTo: sectionElement, ease: 'power2.inOut'})
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  if (subtitle.value) {
    gsap.from(subtitle.value, {
      y: 50,
      opacity: 0,
      duration: 1,
    })
  }

  if (title.value) {
    gsap.from(title.value, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: .5,
    })
  }

  if (descText.value) {
    gsap.from(descText.value, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: .5,
    })
  }

  if (button.value) {
    gsap.from(button.value, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 1,
    })
  }
})
</script>

<style lang="scss" scoped>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: .2;
  background-color: var(--coal_black);
}

.img-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
