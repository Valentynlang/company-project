<template>
  <section ref="section" class="px-5 py-12 md:px-10 md:py-28 bg-white flex justify-between">
    <div class="md:grid md:gap-10 md:grid-cols-12 md:[&>*]:col-span-3 md:[&>img]:w-full">
      <div ref="content" class="flex flex-col justify-center">
        <h4 ref="heading" class="font-primary text-5 mb-5 font-medium uppercase text-center md:text-left md:font-secondary md:text-14 md:mb-6 md:font-normal md:normal-case">
          {{ data.title }}
        </h4>
        <p ref="text" class="md:max-w-146 text-4.5 text-center md:text-left">
          {{ data.text }}
        </p>
      </div>


      <div ref="image1" class="hidden md:block">
        <AppImage
          :image="responsiveImage(data.image_1.image, data.image_1.imagemob)"
          :imageType="WPImageType.oneFourthScreen"
          is-lazy-loading="true"
          class="h-full w-full aspect-[4/3] object-cover"
        />
      </div>

      <div ref="image2" class="hidden md:block">
        <AppImage
          :image="responsiveImage(data.image_2.image, data.image_2.imagemob)"
          :imageType="WPImageType.oneFourthScreen"
          is-lazy-loading="true"
          class="h-auto w-full aspect-[4/3] object-cover"
        />
      </div>
      <div ref="image3" class="hidden md:block">
        <AppImage
          :image="responsiveImage(data.image_3.image, data.image_3.imagemob)"
          :imageType="WPImageType.oneFourthScreen"
          is-lazy-loading="true"
          class="h-auto w-full aspect-[4/3] object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { WPImageType } from '~/types/enums/wp-image-type'

  const section = ref(null);
  const heading = ref(null);
  const text = ref(null);
  const image1 = ref(null);
  const image2 = ref(null);
  const image3 = ref(null);

  const { responsiveImage } = useResponsiveImage()

  defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger);

  await nextTick()

  gsap.from(heading.value, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out'
  });

  gsap.from(text.value, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out',
    delay: 1.2
  });

  gsap.from([image1.value, image2.value, image3.value], {
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    delay: .3
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style>
/* Add any custom styles here if needed */
</style>
