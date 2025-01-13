<template>
  <section ref="section" class="FeaturedHomesPromo max-md:h-screen-w md:h-30-screen px-5 md:px-10 pb-8 md:pb-14 md:pt-52 relative flex flex-col justify-end">
    <div class="backdrop" />
    <AppImage
      :image="responsiveImage(banner.image.image, banner.image.imagemob)"
      :imageType="WPImageType.fullScreen"
      class="img-bg"
    />

    <div class="flex justify-between w-full items-end z-10">
      <h1 ref="heading" v-if="banner?.main_title" class="font-bold uppercase text-13 md:text-39 text-white m-0 tracking-tight opacity-0">{{ banner.main_title }}</h1>
  
      <button class="hidden mb-3.5 md:block" @click="scrollTo()">
        <NuxtImg src="/svg/icon-scroll.svg" class="w-8" loading="lazy" alt="Scroll icon" />
      </button>
    </div>
  </section>
</template>

<script setup>
  import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { WPImageType } from '~/types/enums/wp-image-type'

  defineProps({
    banner: {
      type: Object,
      default: () => ({})
    }
  })

  const { responsiveImage } = useResponsiveImage()

  const heading = ref(null)
  const section = ref(null)

  const scrollTo = () => {
    const section = document.getElementsByTagName('section')[1]

    if (section) {
      gsap.to(window, {duration: 1, scrollTo: section, ease: 'power2.inOut'})
    }
  }

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    gsap.fromTo(
      heading.value,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        delay: 1.5,
        duration: 1,
        ease: 'power2.out',
      }
    )
  })

  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
</script>

<style lang="scss" scoped>
  .FeaturedHomesPromo {
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
  }
</style>