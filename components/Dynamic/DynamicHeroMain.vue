<template>
  <section
    class="DynamicHeroMain h-125 md:h-screen bg-black overflow-hidden relative px-5 md:px-10 pb-6 md:pb-8 flex items-end"
    ref="section"
  >
    <div class="backdrop" />
    <template v-if="banner.type === 'image'">
      <AppImage
        :image="responsiveImage(banner.hero_img.image, banner.hero_img.imagemob)"
        :imageType="WPImageType.fullScreen"
        class="img-bg"
      />
    </template>
    <template v-else>
      <div class="overflow-hidden vimeo-video">
        <AppImage
          v-if="banner.video_fallback_image.image"
          :image="banner.video_fallback_image.image"
          :imageType="WPImageType.fullScreen"
          class="img-bg"
        />
        <ClientOnly>
        <iframe
          :src="`https://player.vimeo.com/video/${banner.vimeo_id}?dnt=1&background=1&controls=0&autoplay=1&muted=1&loop=1`"
          frameborder="0"
          tabindex="-1"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          allow="autoplay; fullscreen"
        ></iframe>
      </ClientOnly>
      </div>
    </template>
    
    <div class="flex justify-between w-full items-end z-10">
      <div class="flex flex-col gap-4" ref="textContainer">
        <h1 v-if="banner?.main_title" class="font-bold uppercase text-13 md:text-39 text-white m-0 tracking-tight opacity-0">{{ banner.main_title }}</h1>
        <p v-if="banner?.subtitle" class="text-white uppercase text-4.5 md:text-6 opacity-0">{{ banner.subtitle }}</p>
      </div>
  
      <button class="hidden mb-3.5 md:block" @click="scrollTo()">
        <NuxtImg src="/svg/icon-scroll.svg" class="w-8" loading="lazy" alt="Scroll icon" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WPImageType } from '~/types/enums/wp-image-type'

defineProps({
  banner: {
    type: Object,
    default: () => ({})
  }
})

const { responsiveImage } = useResponsiveImage()
const appStore = useAppStore()

const section = ref(null)
const textContainer = ref(null)

const scrollTo = () => {
  const nextSection = document.getElementsByTagName('section')[1]

  if (nextSection) {
    gsap.to(window, { duration: 1, scrollTo: nextSection, ease: 'power2.inOut' })
  }
}

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  ScrollTrigger.create({
    trigger: section.value,
    start: 'top bottom',
    end: 'bottom top',
    toggleActions: 'play none none reverse',
    onEnter: () => {
      gsap.fromTo(
        textContainer.value.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          delay: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
        }
      )
    },
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style lang="scss" >
  .DynamicHeroMain {
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
  
    .vimeo-video iframe {
      pointer-events: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: max(101vw, 178vh);
      height: max(101vh, 57vw);

      @media (max-width: $phone) {
        width: 238vw;
        height: 134vw;
      }
    }
  }
</style>