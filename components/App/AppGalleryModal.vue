<template>
  <aside
    class="gallery-modal fixed top-0 left-0 w-screen h-screen flex items-center z-50"
    :class=" bg ? `bg-${bg}` : 'bg-dark_gray'"
  >
    <div class="absolute top-5 right-10 flex gap-2">
      <button v-if="galleryItems.length > 1 || !isVideoOnly" class="button rounded bg-black flex items-center justify-center z-50 text-white transition-all hover:bg-white hover:text-black" @click="toggleZoom()">
        <ZoomIcon class="w-3 h-3 sm:w-5 sm:h-5" />  
      </button>
      <button class="button rounded bg-black flex items-center justify-center z-50 text-white transition-all hover:bg-white hover:text-black" @click="closeModal()">
        <CloseIcon class="w-3 h-3 sm:w-5 sm:h-5" />  
      </button>
    </div>

    <div v-if="galleryItems.length > 1" class="numbers">
      {{ currentSlide + 1 }} / {{ galleryItems.length }}
    </div>

    <div ref="gallery" class="w-full h-full">
      <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <div v-for="(item, index) in galleryItems" :key="index" :class="['h-screen flex items-center justify-center', { 'zoomed': isZoomed }]">
              <AppImage
                v-if="item?.type?.toLowerCase() === 'image'"
                class="content w-screen md:w-3/4 object-contain h-full"
                :image="item?.img?.image || item"
                :image-type="WPImageType.fullScreen"
                is-lazy-loading="true"
              />
              <vimeo-player v-else ref="vimeoPlayers" class="content w-screen md:w-3/4 h-screen" :video-id="item.vimeo_id" @ready="onReady()"/>
            </div>
          </ul>
      </div>

      <button v-if="galleryItems.length > 1" class="button-left" @click="() => glide.go('<')">
        <ArrowIcon class="w-3 h-3 sm:w-5 sm:h-5 rotate-90 text-white" />  
      </button>
      <button v-if="galleryItems.length > 1" class="button-right" @click="() => glide.go('>')">
        <ArrowIcon class="w-3 h-3 sm:w-5 sm:h-5 -rotate-90 text-white" />  
      </button>
    </div>
  </aside>
</template>
<script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
  import Glide from '@glidejs/glide'
  import { WPImageType } from '~/types/enums/wp-image-type'

  import ArrowIcon from '@/public/svg/arrow-down.svg'
  import ZoomIcon from '@/public/svg/zoom.svg'
  import CloseIcon from '@/public/svg/close.svg'

  const props = defineProps({
    galleryItems: {
      type: Array,
      default: () => []
    },
    bg: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['close-modal'])

  gsap.registerPlugin(ScrollToPlugin)

  const gallery = ref(null)
  const glide = ref(null)
  const currentSlide = ref(0)

  const isZoomed = ref(false)
  const vimeoPlayers = ref([])

  const toggleZoom = () => {
    isZoomed.value = !isZoomed.value;
  }

  const closeModal = () => {
    gsap.fromTo(
      ".gallery-modal",
      { yPercent: 0 },
      { yPercent: -100, duration: 1, ease: "expo.out", onComplete: () => emit('close-modal') }
    )
  }

  const isVideoOnly = computed(() => {
    if (props.galleryItems.length && props.galleryItems[0].vimeo_id) return true

    return false
  })

  const pauseAllVimeoVideos = () => {
    vimeoPlayers.value.forEach(player => player.pause())
  }

  const onReady = () => {
    if (props.galleryItems.length === 1) {
      vimeoPlayers.value[0].play()
    }
  }

  onMounted(() => {
    gsap.fromTo(
      ".gallery-modal",
      { yPercent: -100 },
      { yPercent: 0, duration: 1, ease: "expo.out" }
    )

    glide.value = new Glide(gallery.value, {
      type: 'carousel',
      gap: 0,
      autoplay: false,
    })

    glide.value.on('run.after', () => {
      currentSlide.value = glide.value.index
      pauseAllVimeoVideos()
    })

    glide.value.mount()
  })

  onBeforeUnmount(() => {
    if (glide.value && glide.value.destroy) glide.value.destroy()
  })
</script>

<style lang="scss">
@import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';

  .gallery-modal {
    .numbers {
      position: absolute;
      top: 20px;
      left: 40px;
      color: var(--white);
      z-index: 11;
      font-size: 1rem;

      @media (max-width: $phone) {
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        top: unset;
      }
    }
  
    .button {
      height: 40px;
      width: 40px;
    }
  
    .button-left, .button-right {
      position: absolute;
      bottom: 50%;
      transform: translateY(-50%);
      background: var(--black);
      border-radius: 4px;
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
  
      @media (max-width: $phone) {
        bottom: 0;
      }
    }
  
    .button-left {
      left: 40px;
  
      @media (max-width: $phone) {
        left: 20px;
      }
    }
    .button-right {
      right: 40px;
  
      @media (max-width: $phone) {
        right: 20px;
      }
    }
  
    .content {
      transition: all .3s ease;
  
      iframe {
        transition: all .3s ease;
  
        width: 100%;
        height: 100%;
      }
    }
  
    .zoomed .content {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
  
      iframe {
        width: 100vw !important;
        height: 100vh !important;
      }
    }
  }
</style>
