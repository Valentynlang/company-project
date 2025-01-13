<template>
  <section ref="mapImage" class="relative md:px-10 mb-10">
    <AppImage
      class="w-full md:rounded-3xl max-md:mb-8"
      :image="data.image"
      :image-type="WPImageType.fullScreen"
      is-lazy-loading="true"
    />

    <div class="flex justify-center md:absolute md:bottom-14 md:left-1/2 md:-translate-x-1/2">
      <AppButton text="GET DIRECTIONS" color="black" :route="data.link" :target="'_blank'" />
    </div>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { ref, onMounted } from 'vue'

import {WPImageType} from '~/types/enums/wp-image-type'

defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})

const mapImage = ref(null)

onMounted(() => {
  gsap.fromTo(
    mapImage.value,
    {        
      opacity: 0
    },
    {
      delay: 0.3,
      duration: 1,
      opacity: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: mapImage.value,
        start: 'top bottom'
      }
    }  
  );
});
</script>

<style>

</style>