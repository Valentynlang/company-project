<template>
  <section
    class="flex flex-col gap-6 md:gap-y-6 md:gap-x-10 px-5 md:px-10 md:grid md:grid-cols-12"
    :class="[
      paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '',
      data.bg_color ? 'text-white' : 'text-black'
    ]"
    :style="`background: ${data.bg_color || 'white'}`"
    ref="section"
  >
    <span
      v-if="data.subtitle"
      class="col-span-12 text-3 uppercase font-medium"
      :class="[
        { 'text-left': data.alignment === 'left' },
        { 'text-center': data.alignment === 'center' },
      ]"
      ref="subtitle"
    >
      {{ data.subtitle }}
    </span>

    <h3
      class="font-secondary text-8 md:text-14 leading-tight"
      :class="[
        { 'col-start-1 col-end-6': data.alignment === 'left' },
        { 'col-start-3 col-end-11 text-center': data.alignment === 'center' },
      ]"
      v-html="data.cta_block_text"
      ref="ctaBlockText"
    />

    <div
      class="col-span-12 flex"
      :class="[
        { 'justify-start': data.alignment === 'left' },
        { 'justify-center': data.alignment === 'center' },
      ]"
      ref="ctaButton"
    >
      <AppButton v-if="data.cta_block_label" :text="data.cta_block_label" :route="routeLink" :color="data.bg_color ? 'white' : 'black'" :target="data?.cta_block_external ? '_blank' : '_self'" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  paddings: {
    type: Object,
    default: () => ({})
  },
})

const routeLink = computed(() => {
  if (props.data?.cta_block_type === 'external') return props.data?.cta_block_external || '#BAD_URL'
  else if (props.data?.cta_block_type === 'custom') return props.data?.cta_block_custom || '#BAD_URL'
  else if (props.data?.cta_block_type === 'internal') return props.data?.cta_block_internal ? new URL(props.data.cta_block_internal).pathname : '#BAD_URL'
  return '#BAD_URL'
})

const section = ref(null)
const subtitle = ref(null)
const ctaBlockText = ref(null)
const ctaButton = ref(null)

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  const animate = () => {
    if (subtitle.value) {
      gsap.fromTo(
        subtitle.value,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
        }
      );
    }

    if (ctaBlockText.value) {
      gsap.fromTo(
        ctaBlockText.value,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
        }
      );
    }

    if (ctaButton.value) {
      gsap.fromTo(
        ctaButton.value,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
        }
      );
    }
  };

  ScrollTrigger.create({
    trigger: section.value,
    start: 'top bottom',
    onEnter: () => {
      animate()
    },
    onEnterBack: () => {
      animate()
    },
  });
})
</script>
