<template>
  <section
    ref="sectionRef"
    class="hd_clamp flex flex-col gap-4 px-5 md:px-10 items-center pt-mob-md pt-dsk-md pb-mob-md pb-dsk-md"
  >
    <h6 class="uppercase text-black text-3.5">SHARE THIS PAGE</h6>

    <div ref="linksRef" class="flex gap-4">
      <a
        v-for="item in socials"
        :key="item.id"
        :href="item.link"
        target="_blank"
        class="border bg-white rounded-full w-14 h-14 p-3.5 hover:invert transition-all"
      >
        <NuxtImg :src="`/svg/${item.icon}.svg`" class="w-full h-full" loading="lazy" :alt="`${item.icon} icon`" />
      </a>
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  const shareLink = ref('')
  const socials = ref([
    {
      id: 1,
      icon: 'x',
      link: ''
    },
    {
      id: 2,
      icon: 'facebook',
      link: ''
    },
    {
      id: 3,
      icon: 'copylink',
      link: ''
    },
  ]);

  const sectionRef = ref(null);
  const linksRef = ref(null);

  onMounted(() => {
    shareLink.value = encodeURIComponent(window.location.href);

    socials.value = [
      {
        id: 1,
        icon: 'x',
        link: `https://twitter.com/intent/tweet?text=${shareLink.value}`
      },
      {
        id: 2,
        icon: 'facebook',
        link: `https://www.facebook.com/sharer/sharer.php?u=${shareLink.value}`
      },
      {
        id: 3,
        icon: 'copylink',
        link: `mailto:?body=${shareLink.value}`
      },
    ];

    gsap.registerPlugin(ScrollTrigger);

    const links = linksRef.value.children;

    gsap.set(links, { opacity: 0, y: 30 });

    const animation = gsap.to(links, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      paused: true,
      stagger: 0.1,
      ease: 'power2.out'
    });

    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 80%',
      onEnter: () => animation.restart(true),
      onLeaveBack: () => animation.reverse(),
    });
  });

  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
</script>
