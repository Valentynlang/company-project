<template>
  <div class="md:h-230 pt-40 md:px-10 px-5 relative md:max-h-screen">
    <div v-if="isMask && isDesktop && !appStore.isHomeVideoPlayed" ref="mask" class="bg-white absolute top-0 left-0 h-screen w-full z-20 rotate-180" />
    <div ref="leftBlock" class="w-full flex items-start justify-start mb-5 md:mb-0 md:opacity-0 overflow-hidden">
      <h1 class="md:text-27 text-10.5 font-secondary max-w-200">
        {{ data.main_title }}
      </h1>
    </div>

    <h3 v-if="!appStore.isHomeVideoPlayed" ref="textPart" class="hidden absolute md:flex overflow-hidden absolute top-20 left-20 text-white uppercase font-bold text-24 z-50">
      <span
        v-for="(item, id) in data.video_text_slides"
        :key="id"
        class="relative block opactity-0"
      >
        {{ item.text_slide }}
      </span>
    </h3>

    <div ref="videoBlock" class="HomeHeaderTop__video-block flex-shrink-0 w-full lg:w-auto z-[0] relative lg:absolute" :class="{ 'cursor-pointer bg-black hover': appStore.isHomeVideoPlayed || !isDesktop }" @click="openModal()">
      <video
        preload="true"
        class="w-full object-cover lg:absolute md:h-full h-80 max-h-screen"
        loop
        muted
        playsinline
        autoplay
      >
        <source
          :src="data.video_no_sound"
          type="video/mp4"
        />
      </video>      

      <button v-show="appStore.isHomeVideoPlayed || !isDesktop || appStore.isHomeVideoPlayed" class="absolute-center flex flex-col items-center z-20">
        <NuxtImg src="/svg/play.svg" class="mb-6 w-20" loading="lazy" alt="Play icon" />

        <span class="text-4.5 font-medium uppercase text-white">watch the film</span>
      </button>
    </div>
  </div>

  <ClientOnly>
    <Teleport to="body">
      <AppGalleryModal v-if="isGalleryActive" @close-modal="closeModal" :galleryItems="[{ vimeo_id: data?.video_popup }]" />
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const { isDesktop } = useMediaQuery()

const appStore = useAppStore()

const videoBlock = ref(null)
const leftBlock = ref(null)

const textPart = ref(null)
const isGalleryActive = ref(false)
const isMask = ref(true)
const mask = ref(null)

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const openModal = () => {
  if ((isDesktop && appStore.isHomeVideoPlayed) || !isDesktop) {
    isGalleryActive.value = true
  }
}

const closeModal = () => {
  isGalleryActive.value = false
}

const animateMask = () => {
  gsap.to(mask.value, {
    duration: 2,
    delay: .5,
    y: '100%',
    ease: 'power3.inOut',
    onComplete: () => {
      isMask.value = false
    }
  })
}

onMounted(() => {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    if (!appStore.isHomeVideoPlayed) {
      document.body.classList.add('no-scroll');

      gsap.set(videoBlock.value, {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 21,
      })

      gsap.utils.toArray(textPart.value.children).forEach((child, index) => {
        gsap.fromTo(
          child,
          {
            y: '30px',
            opacity: 0,
          },
          {
            delay: 1 + index,
            duration: 1,
            opacity: 1,
            y: '0',
            ease: 'power3.inOut',
          }
        )
      })

      gsap.to(videoBlock.value, {
        delay: 3,
        duration: 2,
        width: 'calc(100vw - 80px)',
        height: 'calc(100vh - 80px)',
        top: '40px',
        right: '40px',
        ease: 'power3.inOut',
        onComplete: () => {
          animateMask()
        }
      })

      gsap.to(textPart.value.children, {
        delay: 5,
        duration: 0.5,
        opacity: 0,
        ease: 'power3.inOut',
      })

      gsap.to(videoBlock.value, {
      delay: 5,
      duration: 2,
      width: 'calc(45vw - 6rem)',
      height: '22vw',
      bottom: '0',
      top: 'unset',
      right: '0',
      ease: 'power3.inOut',
      position: 'absolute',
      paddingRight: '2.5rem',
      onComplete: () => {
        gsap.fromTo(leftBlock.value,
        {
          opacity: 0,
          y: '30px'
        },
        {
          duration: 1.5,
          delay: 0.5,
          opacity: 1,
          y: '0'
        })
        document.body.classList.remove('no-scroll')
        appStore.playHomeVideo()
        window.dispatchEvent(new Event('headerTopAnimationComplete'))
      }
    })
    } else {
      gsap.fromTo(leftBlock.value,
      {
        opacity: 0,
        y: '30px'
      },
      {
        duration: 1.5,
        opacity: 1,
        y: '0',
        onComplete: () => {
          window.dispatchEvent(new Event('headerTopAnimationComplete'))
        }
      })

      gsap.set(videoBlock.value, {
        width: 'calc(45vw - 6rem)',
        height: '22vw',
        bottom: '0',
        top: 'unset',
        right: '0',
        ease: 'power3.inOut',
        position: 'absolute',
        paddingRight: '2.5rem',
      })

      gsap.fromTo(videoBlock.value, {
        opacity: 0,
        y: '30px'
      },
      {
        duration: 1.5,
        delay: 1,
        opacity: 1,
        y: '0',
      })
    }
  })
})
</script>

<style lang="scss" scoped>
.no-scroll {
  overflow: hidden;
}

.HomeHeaderTop {
  &__video-block.hover {
    overflow: hidden;

    video {
      opacity: 1;
      transform: scale(1);
      transition: all .5s ease;
    }

    &:hover {
      video {
        transform: scale(1.1);
        opacity: .6;
      }
    }
  }
}

</style>
