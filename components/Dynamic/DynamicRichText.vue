<template>
  <section
    class="px-5 md:px-10 md:grid md:grid-cols-12 md:gap-10"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
    ref="section"
  >
    <div
      class="dynamic-content col-start-4 col-end-10 text-4.5 text-black"
      v-html="text.html_component_html_component"
      ref="content"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  text: {
    type: Object,
    default: () => ({})
  },
  paddings: {
    type: Object,
    default: () => ({})
  }
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

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  h1 { font-size: 2.75rem; text-transform: uppercase; }
  h2 { font-size: 2.25rem; }
  h3 { font-size: 2rem; }
  h4 { font-size: 1.75rem; }
  h5 { font-size: 1.5rem; }
  h6 { font-size: 1.25rem; }

  p, a, ul {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  ul.dots { list-style: disc; padding-left: 1.25rem; }
  ul.number { list-style: decimal; padding-left: 1.25rem; }
}
</style>
