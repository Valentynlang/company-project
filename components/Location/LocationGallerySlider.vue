<template>
  <section
    ref="locationGallerySlider"
    class="pl-5 md:mx-10"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
  >
    <div ref="locationSlider">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <LocationGalleryItem
            v-for="(item, id) in data"
            :key="id"
            :item="item"
            class="h-full mr-10 md:m-0"
          />
        </ul>
      </div>
    </div>

    <div class="flex justify-center gap-3 mt-6">
      <button class="py-2 px-5.5 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white transition-all" @click="() => glide.go('<')">
        <ArrowIcon class="w-3 rotate-90" />  
      </button>

      <button class="py-2 px-5.5 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white transition-all" @click="() => glide.go('>')">
        <ArrowIcon class="w-3 -rotate-90" />  
      </button>
    </div>
  </section>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-down.svg'
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger'
  import Glide from '@glidejs/glide'
  import { ref, onMounted } from 'vue'

  defineProps({
    data: {
      type: Array,
      default: () => []
    },
    paddings: {
      type: Object,
      default: () => {}
    },
  })

  const locationSlider = ref(null);
  const locationGallerySlider = ref(null);
  const glide = ref(null)

  const animateComponent = () => {
    if (locationGallerySlider.value) {
      gsap.fromTo('.LocationGalleryItem img', 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 1, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: locationGallerySlider.value,
          start: 'top 80%',
          end: 'bottom 0%',
        }
      }
    );
    }  
  }

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    glide.value = new Glide(locationSlider.value, {
      type: 'carousel',
      autoplay: false,
      perView: 2,
      breakpoints: {
        767: {
          perView: 1.25,
          gap: 48,
        },
      }
    });

    glide.value.mount();
  
    animateComponent()
  });
</script>

<style lang="scss" scoped>
  @import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';
.carousel-container {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.carousel {
  display: flex;
  cursor: grab;
}

.carousel-item {
  min-width: 100%;
  flex: 1;
}
</style>

  