<template>
  <section class="HomePromo relative overflow-hidden">
    <AppLink :to="routeLink" :target="data?.promo_link?.external ? '_blank' : '_self'">
    <div :class="[orderClass]" class="absolute top-0 left-0 w-full h-full !opacity-100"></div>
    <div ref="promoSection" class="relative">
      <AppImage
        is-lazy-loading="true"
        :image="responsiveImage(data.promo_image.image, data.promo_image.imagemob)"
        :imageType="WPImageType.fullScreen"
        class="object-cover w-full opacity-0 transform"
        :class="{'h-screen': isFullHeight}"
      />
      <div ref="content" class="overlay">
        <h2 class="text-13 md:text-31 font-bold uppercase text-center text-white mb-3 opacity-0">{{ data.promo_title }}</h2>
        <p class="text-4 md:text-4.5 text-white text-center mb-6 opacity-0">{{ data.promo_text }}</p>
        <AppLink :to="routeLink" class="opacity-0" :target="data?.promo_link?.external ? '_blank' : '_self'">
          <ArrowIcon class="hover:fill-white hover:text-black transition-all text-white h-6" />
        </AppLink>
      </div>
    </div>
  </AppLink>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ArrowIcon from '@/public/svg/arrow-outline-transparent.svg'
import { WPImageType } from '~/types/enums/wp-image-type'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const { responsiveImage } = useResponsiveImage()

const promoSection = ref(null)
const content = ref(null)
const isFullHeight = ref(true)
const orderClass = ref('')


const routeLink = computed(() => {
  return props.data?.promo_link?.internal ? new URL(props.data?.promo_link.internal).pathname : '#BAD_URL'
})

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  const allSections = document.querySelectorAll('section.HomePromo');
  const index = Array.from(allSections).indexOf(promoSection.value?.parentElement);

  if (index === 0) {
    orderClass.value = 'first-promo';
  } else if (index === allSections.length - 1) {
    orderClass.value = 'last-promo';
  } else {
    orderClass.value = 'promo'
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: promoSection.value,
      start: 'top 90%',
      end: 'bottom top',
      scrub: true,
      onEnter: () => {
        animateBack()
      }
    }
  })


  tl.fromTo(
    promoSection.value.querySelector('img'),
    {
      opacity: 0,
      y: '-40vh',
      zIndex: 1,
    },
    {
      opacity: 1,
      y: '0vh',
      zIndex: 20,
      ease: 'power2.out',
      duration: 2,
      onComplete: () => {
        animate()
      },
    }
  )

  tl.to(
    promoSection.value.querySelector('img'),
    {
      opacity: 0,
      y: '40vh',
      zIndex: 0,
      ease: 'power2.in',
      duration: 4, 
    }
  )
})

const animate = () => {
  gsap.fromTo(
    content.value?.children,
    {
      opacity: 0,
      y: '70px'
    },
    {
      opacity: 1,
      stagger: .2,
      duration: 1,
      y: '0px',
      ease: 'power2.out',
    },
  )
}

const animateBack = () => {
  gsap.to(
    content.value?.children,
    {
      opacity: 0,
      y: '70px',
      ease: 'power2.out',
    },
  )
}

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style lang="scss" scoped>
  .HomePromo {
    background: #000;

    &:hover {
      svg {
        fill: white;
        color: black;
      }
    }
  }

  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: radial-gradient(62.27% 62.27% at 50% 50%, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
  }
</style>
