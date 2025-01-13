<template>
  <section class="relative flex flex-col justify-start pt-30">
    <div ref="bannerTitle" class="px-5 py-14 md:px-10 md:py-20 opacity-0">
      <h1 class="font-bold uppercase text-18 md:text-25 m-0 ">
        {{ title }}
      </h1>
    </div>

    <div ref="bannerImage" class="flex-grow w-full h-auto md:aspect-w-16 md:aspect-h-9 opacity-0">
      <AppImage
        :image="image"
        :imageType="WPImageType.fullScreen"
        class="object-cover w-full md:h-full h-70 max-h-screen"
      />
    </div>
  </section>
</template>

<script setup>
  import { WPImageType } from '~/types/enums/wp-image-type'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  import { ref, onMounted, nextTick } from 'vue'

  const props = defineProps({
    image: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  })

  const bannerTitle = ref(null);
  const bannerImage = ref(null);

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    setTimeout(() => {
      gsap.fromTo(bannerTitle.value,
        {
          x: '-50px',
          opacity: 0
        },
        {
          delay: 1,
          duration: 1,
          x: '0',
          opacity: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: bannerTitle.value,
            start: 'top bottom',
            toggleActions: 'play none none none',
          }
        }
      );
  
      gsap.fromTo(bannerImage.value,
        {
          opacity: 0
        },
        {
          duration: 1,
          opacity: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: bannerImage.value,
            start: 'top bottom'
          }
        }
      );
    }, 1000);
  });
</script>
