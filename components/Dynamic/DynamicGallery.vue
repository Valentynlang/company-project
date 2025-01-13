<template>
  <section
    class="dynamic-gallery relative"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
  >
    <div ref="gallery" class="w-full">
      <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <div v-for="(item, index) in getGalleryItems" :key="index" :class="['h-full flex items-center justify-center']" @click="toggleZoom()">
              <AppImage
                is-lazy-loading="true"
                :image="item.img.image"
                :imageType="WPImageType.oneFourthScreen"
                class="content w-screen h-sreen aspect-video object-cover"
              />
            </div>
          </ul>
      </div>

      <div class="max-md:relative max-md:mt-3 flex justify-between items-center px-5">
        <button class="h-8 w-8 md:h-14 md:w-14 flex items-center justify-center md:absolute md:left-10 md:bottom-1/2 md:translate-y-1/2 rounded-full border border-black bg-white md:bg-black" @click="() => glide.go('<')">
          <ArrowIcon class="w-3 rotate-90 text-black md:text-white" />  
        </button>

        <div class="numbers md:absolute md:right-1/2 md:translate-x-1/2 p-2 rounded bg-white md:bg-black flex gap-2 items-center">
          <button class="button rounded flex items-center justify-center z-50" @click="toggleZoom()">
            <ZoomIcon class="text-black md:text-white w-4 h-4" />  
          </button>

          <div class="text-black md:text-white">
            {{ currentSlide + 1 }} / {{ galleryItems.length }}
          </div>
        </div>

        <button class="h-8 w-8 md:h-14 md:w-14 flex items-center justify-center md:absolute md:right-10 md:bottom-1/2 md:translate-y-1/2 rounded-full border border-black bg-white md:bg-black" @click="() => glide.go('>')">
          <ArrowIcon class="w-3 -rotate-90 text-black md:text-white" />  
        </button>
      </div>
    </div>
  </section>

  <ClientOnly>
    <Teleport to="body">
      <AppGalleryModal v-if="isZoomed" @close-modal="closeModal" :galleryItems="galleryImage" />
    </Teleport>
  </ClientOnly>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-down.svg'
  import ZoomIcon from '@/public/svg/zoom-in.svg'
  
  import Glide from '@glidejs/glide'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'


  import { onMounted, onBeforeUnmount, ref } from 'vue'

  import {WPImageType} from '~/types/enums/wp-image-type'

  const getGalleryItems = computed(() =>
    props.galleryItems.filter((item) => !!item.img.image)
  )

  const props = defineProps({
    galleryItems: {
      type: Array,
      default: () => []
    },
    paddings: {
      type: Object,
      default: () => {}
    },
  })

  const galleryImage = ref([])
  const gallery = ref(null)
  const glide = ref(null)
  const currentSlide = ref(0)
  const isZoomed = ref(false)

  const toggleZoom = () => {
    isZoomed.value = !isZoomed.value;
  }

  const closeModal = () => {
    isZoomed.value = false
  }

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    galleryImage.value = props.galleryItems.filter(item => item.type.toLowerCase() === 'image')

    glide.value = new Glide(gallery.value, {
      type: 'carousel',
      gap: 40,
      autoplay: false,
      perView: 1.33,
      focusAt: 'center',
      breakpoints: {
        767: {
          perView: 1.15,
          gap: 12,
        },
      }
    })

    glide.value.on('move.after', () => {
      currentSlide.value = glide.value.index
    })

    glide.value.mount()

    gsap.fromTo('.dynamic-gallery .glide__slides img',
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: .5, 
        stagger: 0.2, 
        scrollTrigger: {
          trigger: '.dynamic-gallery',
          start: 'top 80%',
          end: 'bottom top',
          toggleActions: 'play none none none',
        }
      }
    );
  })

  onBeforeUnmount(() => {
    if (glide.value && glide.value.destroy) glide.value.destroy()

    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
</script>

<style lang="scss">
@import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';

  .dynamic-gallery {
    .numbers {
      bottom: 11rem;

      @media (max-width: $phone) {
        bottom: unset;
      }
    }
  }

</style>
