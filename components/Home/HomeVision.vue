<template>
  <section class="flex bg-black py-24 md:py-36 text-white flex-col gap-16 px-5 md:px-10 md:grid md:grid-cols-12 md:gap-x-10 md:gap-y-20">
    <h3 ref="headlineBlock" class="order-1 col-start-5 col-end-12 font-secondary text-11 md:text-18">{{ data.headline }}</h3>

    <div ref="subtitleBlock" class="order-3 md:order-2 col-start-1 col-end-4 flex flex-col gap-5">
      <h6 class="text-10 md:text-14 uppercase font-bold">{{ data.subtitle }}</h6>
      <p class="text-4.5" v-html="data.text" />
    </div>

    <div ref="mainImageBlock" class="order-2 md:order-3 col-start-5 col-end-13">
      <AppImage
        :image="data.main_image.image"
        :imageType="WPImageType.halfScreen"
        class="w-full h-full aspect-[4/3] object-cover"
      />
    </div>
  </section>
</template>

<script setup>
  import { WPImageType } from '~/types/enums/wp-image-type'
  import { ref, onMounted, nextTick } from 'vue'
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  defineProps({
    data: {
      type: Object,
      default: () => {}
    }
  })

  const headlineBlock = ref(null);
  const subtitleBlock = ref(null);
  const mainImageBlock = ref(null);

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()
    
    gsap.fromTo(headlineBlock.value, 
      {
        x: '-50px',
        opacity: 0  
      }, 
      {
        delay: 0.1,
        duration: 1.5,
        x: '0%',
        opacity: 1, 
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: headlineBlock.value,
          start: 'top bottom' 
        }
      }
    );

    gsap.fromTo(mainImageBlock.value, 
      {
        opacity: 0  
      }, 
      {
        delay: 0.1,
        duration: 1,
        opacity: 1, 
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: mainImageBlock.value,
          start: 'top bottom' 
        }
      }
    );
  });
</script>

