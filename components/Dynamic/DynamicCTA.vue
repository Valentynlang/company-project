<template>
  <section
    ref="sectionRef"
    class="px-5 md:px-10 flex items-center justify-center"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}` : '' ]"
  >
    <div ref="buttonRef">
      <AppButton :text="button.cta_block_label" :route="routeLink" color="black" :target="button?.cta_block_external ? '_blank' : '_self'" />
    </div>
  </section>
</template>

<script setup>
  import { computed, onMounted, ref, onUnmounted } from 'vue'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const props = defineProps({
    button: {
      type: Object,
      default: () => ({})
    },
    paddings: {
      type: Object,
      default: () => ({})
    },
  })

  const routeLink = computed(() => {
    if (props.button?.cta_block_type === 'external') return props.button?.cta_block_external || '#BAD_URL'
    else if (props.button?.cta_block_type === 'custom') return props.button?.cta_block_custom || '#BAD_URL'
    else if (props.button?.cta_block_type === 'internal') return props.button?.cta_block_internal ? new URL(props.button.cta_block_internal).pathname : '#BAD_URL'
    return '#BAD_URL'
  })

  const sectionRef = ref(null)
  const buttonRef = ref(null)

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    const buttonEl = buttonRef.value

    const animation = gsap.from(buttonEl, {
      opacity: 0,
      y: 20,
      duration: 1,
      paused: true,
    })

    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 80%',
      onEnter: () => animation.play(),
      onLeaveBack: () => animation.reverse(),
      toggleActions: 'play none none reverse',
    })
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
</script>
