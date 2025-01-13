<template>
  <section
    ref="section"
    class="flex flex-col gap-5 px-5 md:px-10 md:grid md:grid-cols-12 md:gap-10"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}` : '']"
  >
    <div
      ref="leftColumn"
      class="col-start-4 col-end-7"
      v-html="text.text1"
    />

    <div
      ref="rightColumn"
      class="col-start-7 col-end-10"
      v-html="text.text2"
    />
  </section>
</template>


<script setup>
import { onMounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  text: {
    type: Object,
    default: () => ({}),
  },
  paddings: {
    type: Object,
    default: () => ({}),
  },
})

const section = ref(null)
const leftColumn = ref(null)
const rightColumn = ref(null)

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()
  
  if (leftColumn.value) {
    gsap.from(leftColumn.value, {
      x: -100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }

  if (rightColumn.value) {
    gsap.from(rightColumn.value, {
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      scrollTrigger: {
        trigger: section.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }
})
</script>


<style lang="scss" scoped>
div > * {
  color: var(--black);
  font-size: 1.125rem;
}
</style>
