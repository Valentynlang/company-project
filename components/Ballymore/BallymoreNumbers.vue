
<template>
  <div class="md:grid grid-cols-4 gap-4 md:pb-2 px-10 pb-10 ">
    <div 
    v-for="(item, id) in numberFactsList" 
    :key="item.nr" 
    class="py-9 pb-19  md:pr-10 flex flex-col gap-5 border-t border-gray-300 md:border-0 "
    :ref="ref => numberFacts[id] = ref"
    >
      <div class="font-secondary text-20 md:text-25 ">{{ item.nr }}</div>
      <div class="md:mt-10 text-4 mt-2 font-medium">{{ item.text }}</div>
    </div>
  </div>
</template>
  
<script setup>
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'

  const props = defineProps({
    numberFactsList: {
      type: Array,
      default: []
    }
  })

  const numberFacts = ref([]);

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger);

    await nextTick()

    numberFacts.value.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          {
            y: '70',
            opacity: 0
          },
          {
            delay: 0.2 + (index * 0.3),
            duration: 1,
            y: '0',
            opacity: 1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    });
});

onBeforeUnmount(() => {
  if (numberFacts.value && numberFacts.value.destroy) numberFacts.value.destroy()   
})
</script>
  
