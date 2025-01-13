<template>
  <section ref="feedSection" class="px-5 pt-24 md:pt-36 pb-5 md:pb-10 md:px-10 gap-5 md:gap-10 grid grid-cols-2 md:grid-cols-12">
    <div class="col-span-2 md:col-span-12 gap-6 flex flex-col md:flex-row justify-between items-center md:items-end max-md:mb-7.5">
      <h6 ref="feedBlockTitle" class="text-10 md:text-14 uppercase font-bold">Follow us</h6>
      <div>
        <AppButton text="#thebrentfordproject" color="white" class="border" size="small" />
      </div>
    </div>

    <div
      v-for="(id) in 18"
      :key="id"
      :ref="ref => feedImages[id] = ref"
      class="md:col-span-2 w-full h-full aspect-[1/1] transition-opacity duration-300 ease-in-out"
    >
      <NuxtImg
        src="/img/floorplate.png"
        class="w-full h-full object-cover"
        loading="lazy"
        alt="Floorplate"
      />
    </div>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted, nextTick } from 'vue'

const feedSection = ref(null);
const feedImages = ref([]);
const feedBlockTitle = ref(null);

function getRandomDelay(min, max) {
  return Math.random() * (max - min) + min;
}

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  feedImages.value.forEach(item => {
    if (item) {
      gsap.fromTo(
        item,
        {
          opacity: 0
        },
        {
          delay: 0.1 + getRandomDelay(0.1, 0.25),
          duration: 1,
          opacity: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom'
          }
        }
      );
    }
  });

  gsap.fromTo(
    feedBlockTitle.value,
    {
      y: '40px',
      opacity: 0
    },
    {
      delay: 0.1,
      duration: 0.5,
      y: '0%',
      opacity: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: feedBlockTitle.value,
        start: 'top bottom'
      }
    }
  );

  ScrollTrigger.create({
      trigger: feedSection.value,
      start: 'top bottom',
      onEnter: () => {
        gsap.to(window, {
          scrollTo: {
            y: feedSection.value,
            offsetY: window.innerHeight / 2 - feedSection.value.offsetHeight / 2,
          },
          duration: 1,
          ease: 'power3.inOut'
        });
      }
    });
});
</script>

<style scoped>
</style>