<template>
  <section
    ref="sectionRef"
    class="flex flex-col justify-center gap-5 md:grid md:grid-cols-12 md:gap-10"
    :class="[
      paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '',
      { 'px-5 md:px-10': images.image_options !== 'xl' }
    ]"
  >
    <div
      v-if="images?.image1?.image"
      ref="imageContainerRef"
      class="text-center flex flex-col items-center justify-center"
      :class="[
        { 'col-start-1 col-end-13 [&>img]:aspect-[3/4] md:[&>img]:aspect-[16/9] md:[&>img]:h-full md:[&>img]:object-cover': images.image_options === 'xl' },
        { 'col-start-1 col-end-13 [&>img]:aspect-[1/1] md:[&>img]:aspect-[16/9]': images.image_options === 'l' },
        { 'col-start-2 col-end-12 [&>img]:aspect-[3/2] md:[&>img]:aspect-[16/9]': images.image_options === 'md' },
        { 'col-start-4 col-end-10 [&>img]:aspect-[3/2] md:[&>img]:aspect-[3/2]': images.image_options === 'sm' },
        { 'col-start-5 col-end-9 [&>img]:aspect-[2/3] md:[&>img]:aspect-[2/3]': images.image_options === 'p' },
      ]"
    >
      <AppImage
        class="h-auto w-full object-cover"
        :image="images?.image1?.image"
        :image-type="WPImageType.fullScreen"
        is-lazy-loading="true"
      />
      <span v-if="images?.caption" class="block text-4.5 mt-3 text-black">{{ images?.caption }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WPImageType } from '~/types/enums/wp-image-type'

const props = defineProps({
  images: {
    type: Object,
    default: () => {}
  },
  paddings: {
    type: Object,
    default: () => {}
  },
})

const sectionRef = ref(null)
const imageContainerRef = ref(null)

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  const imageContainer = imageContainerRef.value

  gsap.from(imageContainer, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    delay: .5,
    paused: true,
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => gsap.fromTo(imageContainer, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to(imageContainer, { opacity: 0, x: 50, duration: 1, ease: 'power2.out' }),
    }
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style lang="scss" scoped>
</style>