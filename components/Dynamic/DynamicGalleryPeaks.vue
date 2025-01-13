<template>
  <section
    class="relative"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
    ref="section"
  >
    <div ref="galleryPeaks" class="w-full">
      <div class="glide__track md:ml-10" data-glide-el="track">
          <ul
            class="glide__slides"
            :class="[
              { 'items-end': floating === 'bottom' },
              { 'items-start': floating === 'top' },
            ]"
          >
            <div
              v-for="(item, index) in gallery"
              :key="index"
              :class="['h-full flex items-center justify-center']"
              class="image-wrapper"
            >
              <AppImage
                is-lazy-loading="true"
                :image="item?.img?.image"
                :imageType="WPImageType.oneFourthScreen"
                class="object-cover w-full h-auto"
                :class="[
                  { 'aspect-[4/3]': index % 2 === 0 },
                  { 'aspect-[4/5]': index % 2 === 1 },
                ]"
                :alt="item?.img?.image?.alt"
              />
            </div>
          </ul>
      </div>

      <div class="mt-8 flex justify-center items-center gap-6.5 px-5 md:px-10">
        <div class="flex gap-3">
          <button class="py-2 px-5.5 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white transition-all" @click="() => glide.go('<')">
            <ArrowIcon class="w-3 rotate-90" />  
          </button>
  
          <button class="py-2 px-5.5 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white transition-all" @click="() => glide.go('>')">
            <ArrowIcon class="w-3 -rotate-90" />  
          </button>
        </div>

        <div class="hidden md:block glide__progress">
          <div class="glide__progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-down.svg'
  import Glide from '@glidejs/glide'
  import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  const props = defineProps({
    gallery: {
      type: Array,
      default: () => []
    },
    paddings: {
      type: Object,
      default: () => {}
    },
    floating: {
      type: String,
      default: 'bottom'
    },
  })

  import {WPImageType} from '~/types/enums/wp-image-type'

  const galleryPeaks = ref(null)
  const glide = ref(null)
  const progress = ref(0);
  const section = ref(null)

  onMounted(async() => {
    glide.value = new Glide(galleryPeaks.value, {
      type: 'carousel',
      gap: 40,
      autoplay: false,
      perView: 4.5,
      breakpoints: {
        767: {
          focusAt: 'center',
          perView: 1.15,
          gap: 12,
        },
      }
    })

    glide.value.on('move.after', () => {
      progress.value = ((glide.value.index + 1) / props.gallery.length) * 100;
    });

    glide.value.mount()

    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    gsap.fromTo('.image-wrapper img', 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 1, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: section.value,
          start: 'top 80%',
          end: 'bottom 0%',
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

.glide__progress {
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.25);
}

.glide__progress-bar {
  height: 100%;
  background: var(--black);
  transition: width 0.3s ease;
}
</style>
