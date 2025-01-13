<template>
  <section ref="registerPromoImage"  class="max-md:h-screen-w md:h-160 px-5 pb-4 md:pb-5 relative flex flex-col justify-end">
    <div class="backdrop" />
    <AppImage
      class="img-bg"
      :image="data.image"
      :image-type="WPImageType.fullScreen"
      preload
    />
    
    <div class="flex justify-between w-full items-end z-10">
      <h1 ref="title" class="font-bold uppercase text-13 md:text-39 text-white m-0 tracking-tight z-10 opacity-0">{{ data.title }}</h1>

      <button class="hidden mb-3.5 md:block" @click="scrollTo()">
        <NuxtImg src="/svg/icon-scroll.svg" class="w-8" loading="lazy" alt="Scroll icon" />
      </button>
    </div>
  </section>
</template>

<script setup>
  import gsap from 'gsap';
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  import {WPImageType} from '~/types/enums/wp-image-type'

  defineProps({
    data: {
      type: Object,
      default: () => {}
    }
  })

  const registerPromoImage = ref(null);
  const title = ref(null);

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
      trigger: registerPromoImage.value,
      start: 'top bottom',
      end: 'bottom top',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        gsap.fromTo(
          title.value,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            delay: 1,
            duration: 1,
            ease: 'power2.out',
          }
        )
      },
    })
  })

  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
</script>

<style lang="scss" scoped>
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 69.4%, rgba(0, 0, 0, 0.55) 118.02%);
  }
</style>
