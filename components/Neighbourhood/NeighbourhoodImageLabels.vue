<template>
  <div class="relative w-full h-screen mb-10">
    <NuxtImg class="object-cover w-full h-full" src="/img/view.webp" loading="lazy" alt="View image" />
    
    <div
      :ref="ref => tagsRef[index] = ref"
      v-for="(tag, index) in tags"
      :key="index"
      class="absolute tag flex items-center gap-2"
      :style="getStyle(tag.top, tag.left)"
    >
      <div class="w-2 h-2 bg-white rounded-full"></div>
      <span>{{ tag.name }}</span>
    </div>

    <div class="absolute" :style="getStyle(1288, 1744)">
      <NuxtImg src="/svg/logo-white.svg" class="min-h-20" loading="lazy" alt="The Brentford logo" />
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ref, onMounted, nextTick } from 'vue'

const tags = [
  { name: "THE WICK", top: 390, left: 120 },
  { name: "WORKHOUSE DOCK", top: 752, left: 276 },
  { name: "RIVER BRENT", top: 1400, left: 667 },
  { name: "THE LANES", top: 760, left: 1011  },
  { name: "QUINCY HOUSE", top: 671, left: 1171 },
  { name: "TOWN WHARF", top: 900, left: 1245 },
  { name: "THE HIGH STREET", top: 654, left: 1375 },
];

const getStyle = (top, left) => {
  const topPercentage = (top / 1448) * 100 + "%";
  const leftPercentage = (left / 1920) * 100 + "%";
  return {
    top: topPercentage,
    left: leftPercentage,
  };
};

const tagsRef = ref([]);

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  tagsRef.value.forEach((item, index) => {
    if (item) {
      gsap.fromTo(
        item,
        {
            y: '-100%',
            opacity: 0
        },
        {
            delay: 0.01 + (index * 0.1),
            duration: 1,
            y: '0%',
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
});
</script>

<style scoped>
.tag {
  color: white;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(1.15px);
  border-radius: 17px;
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 800px) {
  .tag {
    display: none;
  }
}
</style>
