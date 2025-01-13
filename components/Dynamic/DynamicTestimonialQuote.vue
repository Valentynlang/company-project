<template>
  <section
    ref="sectionRef"
    class="px-5 md:px-10 md:grid md:grid-cols-12 md:gap-10"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
    :style="`background-color: ${quote.bg_color};`"
  >
    <div
      ref="contentRef"
      class="col-start-4 col-end-10"
      :class="{ 'flex flex-col items-center text-center': quote.alignment === 'center' }"
    >
      <div v-if="quote.subtitle" class="mb-4">
        <span>{{ quote.subtitle }}</span>
      </div>

      <h4
        class="text-black mb-7"
        v-html="quote.quote"
      />

      <span v-if="quote.annotation" class="author mb-4">{{ quote.annotation }}</span>

      <div v-if="quote?.button?.label">
        <AppButton :text="quote?.button?.label" :route="routeLink" color="black" :target="quote?.button?.external ? '_blank' : '_self'" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps({
  quote: {
    type: Object,
    default: () => {}
  },
  paddings: {
    type: Object,
    default: () => {}
  },
});

const { routeLink } = useRouteLink(props?.quote?.button)

const sectionRef = ref(null);
const contentRef = ref(null);

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  const content = contentRef.value.children;

  gsap.from(content, {
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onEnter: () => gsap.fromTo(content, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power2.out', stagger: 0.2 }),
      onLeaveBack: () => gsap.to(content, { opacity: 0, x: 50, duration: 1, ease: 'power2.out' }),
    }
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style lang="scss" scoped>
  h4 {
    font-size: 3.5rem;
    color: var(--black);
    font-family: var(--font-secondary);
    line-height:1.2em;

    @media (max-width: $phone) {
      font-size: 2.25rem;

    }
  }

  span {
    text-transform: uppercase;
    font-size: 1rem;
    color: var(--black);

    @media (max-width: $phone) {
      font-size: 0.875rem;
    }

    &.author {
      text-transform: none;
    }
  }
</style>