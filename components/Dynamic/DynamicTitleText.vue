<template>
  <section
    ref="sectionRef"
    class="flex flex-col gap-5 px-5 md:px-10 md:grid md:grid-cols-12 md:gap-10"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
    :style="`background: ${bg || 'white'}`"
  >
    <div
      ref="leftText"
      v-if="(text.subtitle_alignment.includes('left') && text?.subtitle) || (text.title_alignment.includes('left') && text?.title) || (text.text_alignment.includes('left') && text?.text)"
      class="left-text order-1 flex flex-col gap-3"
      :class="[
        { 'col-span-4': text.subtitle_alignment === 'center_left' },
        { 'col-span-4': text.title_alignment === 'center_left' },
        { 'col-span-7': (text.title_alignment !== 'center_left' && text.subtitle_alignment !== 'center_left') && colspan === '2' },
        { 'col-span-4': text.title_alignment === 'left' && colspan === '5' },
        { 'col-span-6': text.title_alignment === 'left' && colspan === '3' },
        { 'col-span-3': text.text_alignment === 'left' && colspan !== '2' },
      ]"
    >
      <span v-if="text?.subtitle && text.subtitle_alignment === 'left'" class="text-3 uppercase font-medium">{{ text.subtitle }}</span>
      <h3 v-if="text?.title && text.title_alignment === 'left'" class="font-secondary leading-tight" :class="[{ 'text-8 md:text-16': size === 'standard' }, { 'text-14 md:text-29': size === 'large' }]">{{ text.title }}</h3>
      <p v-if="text?.text && text.text_alignment === 'left'" class="text-4.5" v-html="text.text"></p>
    </div>

    <div
      ref="centerText"
      class="center-text flex flex-col gap-3"
      :class="[
        `col-span-${colspan} order-2`,
        { 'col-start-5 col-end-9 grid text-center': text.title_alignment === 'center' && text.subtitle_alignment },
        { '!col-span-6': text.title_alignment === 'center_left' },
        { '!col-span-6': text.subtitle_alignment === 'center_left' },
        { '!col-span-4': text.title_alignment === 'center_left' && text.subtitle_alignment === 'center_left' },
      ]"
    >
      <span v-if="text?.subtitle && text.subtitle_alignment === 'center_left' || text.subtitle_alignment === 'center'" class="text-3 uppercase font-medium">{{ text.subtitle }}</span>
      <h3 v-if="text?.title && text.title_alignment === 'center_left' || text.title_alignment === 'center'" class="font-secondary leading-tight" :class="[{ 'text-8 md:text-16': size === 'standard' }, { 'text-14 md:text-29': size === 'large' }]">{{ text.title }}</h3>
      <p v-if="text?.text && text.text_alignment === 'center'" class="mt-7 text-4.5" v-html="text.text"></p>
    </div>

    <div
      ref="rightText"
      v-if="(text.subtitle_alignment.includes('right') && text?.subtitle) || (text.title_alignment.includes('right') && text?.title) || (text.text_alignment.includes('right') && text?.text)"
      class="right-text order-3 flex flex-col gap-3"
      :class="[
        { '!col-span-6': text.title_alignment === 'right' && page === 'residents-club' },
        { 'col-span-4': text.title_alignment === 'right' },
        { 'col-span-3': text.text_alignment === 'right' },
        { 'col-span-2': text.title_alignment === 'center_left' || text.subtitle_alignment === 'center_left' },
      ]"
    >
      <span v-if="text?.subtitle && text.subtitle_alignment === 'right'" class="text-3 uppercase font-medium">{{ text.subtitle }}</span>
      <h3 v-if="text?.title && text.title_alignment === 'right'" class="font-secondary leading-tight" :class="[{ 'text-8 md:text-16': size === 'standard' }, { 'text-14 md:text-29': size === 'large' }]">{{ text.title }}</h3>
      <p v-if="text?.text && text.text_alignment === 'right'" class="text-4.5" v-html="text.text"></p>
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  const props = defineProps({
    text: {
      type: Object,
      default: () => {}
    },
    paddings: {
      type: Object,
      default: () => {}
    },
    colspan: {
      type: String,
      default: '5'
    },
    page: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    bg: {
      type: String,
      default: ''
    },
  });

  const sectionRef = ref(null)
  const leftText = ref(null)
  const centerText = ref(null)
  const rightText = ref(null)

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    const allTextElements = [leftText.value, centerText.value, rightText.value];

    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 80%',
      end: 'bottom top',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        const els = allTextElements.filter(item => item !== null)
        
        if (els && els.length) {
          gsap.fromTo(
            els, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power2.out' }
          );
        }
      },
      onLeaveBack: () => {
        const els = allTextElements.filter(item => item !== null)
        if (els && els.length) {
          gsap.to(els, { opacity: 0, y: 50, duration: 1.5 });
        }
      }
    })
  })

  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
</script>


<style lang="scss" scoped>
.left-text, .center-text, .right-text {
    opacity: 0;
    transform: translateY(50px);
  }
</style>