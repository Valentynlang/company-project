<template>
  <section
    ref="section"
    class="h-screen-w md:h-screen bg-white overflow-hidden vimeo-video relative"
    :class="{ 'md:m-10': inset }"
  >
    <div>
      <AppImage
        is-lazy-loading="true"
        v-if="fallback.image"
        :image="fallback.image"
        :imageType="WPImageType.fullScreen"
        class="img-bg"
      />
    </div>
    <ClientOnly>
      <iframe
        :src="`https://player.vimeo.com/video/${video}?dnt=1&background=1&controls=0&autoplay=1&muted=1&loop=1`"
        width="1920"
        height="1080"
        frameborder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
        allow="autoplay; fullscreen"
      ></iframe>
    </ClientOnly>
    <h4 v-if="title" ref="titleEl" class="absolute top-3 md:top-10 left-5 md:left-10 text-10 md:text-20 font-bold uppercase text-white">{{ title }}</h4>
  </section>
</template>

<script setup>
  import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { WPImageType } from '~/types/enums/wp-image-type'

  defineProps({
    video: {
      type: String,
      default: ''
    },
    fallback: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    },
    inset: {
    type: Boolean,
    default: false
  },
  })

  const titleEl = ref(null)
  const section = ref(null)

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    if (titleEl.value) {
      gsap.fromTo(
        titleEl.value, 
        {
          opacity: 0,
          y: 50,
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: section.value,
            start: 'top 80%',
            end: 'bottom 100%',
            onEnter: () => {
              gsap.fromTo(
                titleEl.value, 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1 }
              );
            },
            onLeave: () => {
              gsap.set(titleEl.value, { opacity: 0, y: 50 });
            },
            onEnterBack: () => {
              gsap.fromTo(
                titleEl.value, 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1 }
              );
            },
            onLeaveBack: () => {
              gsap.set(titleEl.value, { opacity: 0, y: 50 });
            },
          }
        }
      );
    }
  });

  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
</script>

<style lang="scss" scoped>
  .vimeo-video iframe {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max(101vw, 178vh);
    height: max(101vh, 57vw);

    @media (max-width: $phone) {
      width: 238vw;
      height: 134vw;
    }
  }
</style>