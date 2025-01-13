<template>
  <section
    class="hd_clamp flex flex-col gap-16 px-5 md:px-10 md:grid md:grid-cols-12 md:gap-10"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
  >
    <div
      ref="journalImageSection"
      class="flex flex-col text-center"
      :class="[{
        'col-start-2 col-end-7 md:order-1': data.alignment === 'left',
        'col-start-7 col-end-12 md:order-2': data.alignment === 'right'
      }]"
    >
      <AppImage
        is-lazy-loading="true"
        :image="data.image.image"
        :imageType="WPImageType.halfScreen"
      />

      <span v-if="data?.image_caption" class="block text-4.5 mt-3 text-black">{{ data?.image_caption }}</span>
    </div>

    <div
    ref="journalTextSection"
      class="flex flex-col justify-center"
      :class="[{
        'col-start-8 col-end-12 md:order-2': data.alignment === 'left',
        'col-start-2 col-end-6 md:order-1': data.alignment === 'right'
      }]"
      v-if="data.subtitle || data.main_title || data.description || data?.button?.label"
    >
      <div class="flex flex-col gap-4">
        <span v-if="data.subtitle">{{ data.subtitle }}</span>
        <h5 v-if="data.main_title" class="text-8 md:text-12 font-secondary leading-tight">{{ data.main_title }}</h5>
  
        <p v-if="data.description" class="text-4.5">{{ data.description }}</p>
      </div>

      <div v-if="data?.button?.label" class="mt-8">
        <AppButton :text="data?.button?.label" :route="routeLink" color="black" :target="data?.button?.external ? '_blank' : '_self'" />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import {WPImageType} from '~/types/enums/wp-image-type'
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger'

  const props = defineProps({
    data: {
      type: Object,
      default: () => {}
    },
    paddings: {
      type: Object,
      default: () => {}
    },
  })

  const { routeLink } = useRouteLink(props?.data?.button)

  const journalImageSection = ref(null);
  const journalTextSection = ref(null);

  onMounted(async () => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()
    
    gsap.fromTo(
      journalImageSection.value,
      {
        y: 0,
        opacity: 0
      },
      {
        delay: 0.1,
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: journalImageSection.value,
          start: 'top bottom'
        }
      }
    );

    gsap.fromTo(
      journalTextSection.value,
      {
        y: 50,
        opacity: 0
      },
      {
        delay: 0.1,
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: journalTextSection.value,
          start: 'top bottom'
        }
      }
    );
  });
</script>

<style>

</style>