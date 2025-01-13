<template>
  <section ref="section" class="relative px-5 p gap-x-10 md:px-10 pt-24 md:pt-32 pb-8 md:pb-18 md:grid md:grid-cols-12 ">
    <div ref="quincyFloorplansTitle" class="md:col-span-12 text-center mb-10 md:mb-20">
      <h5 class="font-bold uppercase text-10 md:text-14 mb-3">Floorplans</h5>
      <span class="text-4.5">Layouts and areas shown are typical</span>
    </div>

    <QuincyFloorplanItem
      v-for="(item, idx) in floorplans"
      :key="idx"
      :floorplan="item"
      :index="idx"
      class="col-span-3 !hidden md:!flex"
      @open-floorplan="openFloorplan"
    />

    <div ref="floorplansSlider" class="flex md:hidden">
      <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <QuincyFloorplanItem
              v-for="(item, id) in floorplans"
              :key="id"
              :index="id"
              :floorplan="item"
              @open-floorplan="openFloorplan"
            />
          </ul>
      </div>
    </div>

    <div class="block md:hidden flex gap-3 justify-center mt-15">
      <button class="py-2 px-5.5 rounded-full border border-black bg-white hover:bg-black hover:[&>svg]:text-white transition-all" @click="() => glide.go('<')">
        <ArrowIcon class="w-3 rotate-90 text-black" />  
      </button>

      <button class="py-2 px-5.5 rounded-full border border-black bg-white hover:bg-black hover:[&>svg]:text-white transition-all" @click="() => glide.go('>')">
        <ArrowIcon class="w-3 -rotate-90 text-black" />  
      </button>
    </div>
  </section>
  
  <Teleport to="body">
    <QuincyFloorplanModal v-if="isFloorplanActive" @close-modal="closeModal" :floorplanItems="floorplans" :startItem="currentItem" />
  </Teleport>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-down.svg'
  import Glide from '@glidejs/glide'
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'

  defineProps({
    floorplans: {
      type: Array,
      default: () => []
    }
  })

  const floorplansSlider = ref(null)
  const currentItem = ref(0)
  const section = ref(null)
  const glide = ref(null)
  const isFloorplanActive = ref(false)
  const quincyFloorplansTitle = ref(null);

  const openFloorplan = (value) => {
    isFloorplanActive.value = true
    currentItem.value = value
  }

  const closeModal = () => {
    isFloorplanActive.value = false
  }

  const animateComponent = () => {
    if (quincyFloorplansTitle.value) {
      gsap.fromTo(
        quincyFloorplansTitle.value,
        {
          y: 50,
          opacity: 0
        },
        {
          delay: 0.3,
          duration: 1,
          y: 0,
          opacity: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: quincyFloorplansTitle.value,
            start: 'top bottom'
          }
        }  
      );
    }
  }

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    animateComponent()
    glide.value = new Glide(floorplansSlider.value, {
      type: 'carousel',
      gap: 24,
      autoplay: false,
      perView: 1,
    })

    glide.value.mount()
  })

  onBeforeUnmount(() => {
    if (glide.value && glide.value.destroy) glide.value.destroy()
  })
</script>

<style lang="scss" scoped>
  @import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';
</style>