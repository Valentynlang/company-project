<template>
  <div class="relative w-full h-screen">
    <NuxtImg class="object-cover w-full h-full" src="/img/imageLocatMap.webp" loading="lazy" alt="Location map" />
    <div
      :ref="ref => tagsRef[index] = ref"
      v-for="(tag, index) in tags"
      :key="index"
      class="absolute tag flex items-center gap-2"
      :style="getStyle(tag.top, tag.left)"
    >
      <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center -ml-2"><NuxtImg src="/svg/locaT.svg" class="w-6 h-6" loading="lazy" alt="Plus icon" /></div>
      <span>{{ tag.name }}</span>
    </div>

    <div class="hidden md:block absolute" :style="getStyle(622, 1068)">
      <NuxtImg src="/svg/logo-white.svg" class="min-h-20" loading="lazy" alt="The Brentford Logo" />
    </div>
  </div>
</template>

<script setup>
  import gsap from 'gsap';
  import { onMounted, ref, nextTick } from 'vue'
  import ScrollTrigger from 'gsap/ScrollTrigger';

  const tags = [
    { name: "CENTRAL LONDON", top: 94, left: 26 },
    { name: "BRENTFORD FOOTBALL CLUB", top: 166, left: 8 },
    { name: "THE CITY", top: 60, left: 198 },
    { name: "KEW BRIDGE", top: 213, left: 242 },
    { name: "CANARY WHARF", top: 60, left: 371 },
    { name: "RIVER THAMES", top: 318, left: 524 },
    { name: "CONSERVATORY", top: 242, left: 1058 },
    { name: "BRENTFORD HIGH STREET", top: 879, left: 885 },
    { name: "KEW GARDENS", top: 329, left: 1295 },
    { name: "SYON PARK", top: 559, left: 1482 },
    { name: "RIVER BRENT", top: 756, left: 1561 },
    { name: "THE WICK", top: 961, left: 1428 },
  ];

  const getStyle = (top, left) => {
    const topPercentage = (top / 1080) * 100 + "%";
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
              delay: 0.1 + (index * 0.1),
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
