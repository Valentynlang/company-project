<template>
  <section
    ref="section"
    class="px-5 md:px-10 md:grid md:grid-cols-12 md:gap-10"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
  >
    <div
      ref="content"
      class="dynamic-content col-start-4 col-end-10 text-4.5 text-black"
      v-html="text.text1"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  text: {
    type: Object,
    default: () => {}
  },
  paddings: {
    type: Object,
    default: () => {}
  },
})

const section = ref(null)
const content = ref(null)

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  gsap.from(content.value.children, {
    opacity: 0,
    y: 20,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: section.value,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
    }
  })
})
</script>

<style lang="scss">
  .dynamic-content {
    div {
      &:not(:last-of-type) {
        margin-bottom: 2.5rem;
      }
    }

    h4 {
      font-size: 2rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    p {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    a {
      display: block;
      width: fit-content;
      text-decoration: underline;
      margin-bottom: 1rem;
    }

    ul {
      margin-bottom: 1rem;

      li {
        margin-bottom: 0.5rem;
      }

      &.dots {
        list-style: disc;
        padding-left: 1.25rem;
      }

      &.number {
        list-style: numbers;
        padding-left: 1.25rem;
      }
    }
  }
</style>
