<template>
  <section class="relative overflow-hidden">
    <div ref="stickyWrapper" class="sticky">
      <div ref="foAll" class="relative h-full w-full">
        <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-10 font-bold text-45">#THEBRENTFORDPROJECT</p>

        <div ref="top" class="my-5 md:my-20 inset-0 flex gap-20 md:gap-110 z-[3] absolute">
          <template v-for="(image, index) in imagesSrcTop" :key="image.id">
            <NuxtImg
              :src="image.src"
              class="large object-cover"
              :class="[index % 2 === 0 ? 'self-start' : 'self-end']"
              loading="lazy"
              alt="Image"
            />
          </template>
        </div>

        <div ref="mid" class="md:ml-90 my-5 md:my-20 inset-0 flex md:gap-140 z-[2] absolute">
          <template v-for="(image, index) in imagesSrcMid" :key="image.id">
            <NuxtImg
              :src="image.src"
              class="medium object-cover"
              :class="[index % 2 === 0 ? 'self-start' : 'self-end']"
              loading="lazy"
              alt="Image"
            />
          </template>
        </div>

        <div ref="low" class="md:ml-100 my-5 md:my-20 inset-0 flex md:gap-180 z-[1] absolute">
          <template v-for="(image, index) in imagesSrcLow" :key="image.id">
            <NuxtImg
              :src="image.src"
              class="small object-cover"
              :class="[index % 2 === 0 ? 'self-end' : 'self-start']"
              loading="lazy"
              alt="Image"
            />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const section = ref(null);
const stickyWrapper = ref(null);
const top = ref(null);
const mid = ref(null);
const low = ref(null);
const foAll = ref(null);

const imagesSrcTop = [
  { id: 1, src: '/img/Sideways-Scroller/Top-Layer/Top-01-Eating-Out.webp' },
  { id: 2, src: '/img/Sideways-Scroller/Top-Layer/Top-02-Dockside-Music-Event.webp' },
  { id: 3, src: '/img/Sideways-Scroller/Top-Layer/Top-03-The-Lanes-Car-Boot.webp' },
  { id: 4, src: '/img/Sideways-Scroller/Top-Layer/Top-04-River-Brent-Canal-Boats.webp' },
  { id: 5, src: '/img/Sideways-Scroller/Top-Layer/Top-05-Paddleboarding.webp' },
  { id: 6, src: '/img/Sideways-Scroller/Top-Layer/Top-06-Brentford-Apartments.webp' },
  { id: 7, src: '/img/Sideways-Scroller/Top-Layer/Top-07-Kids-Kayaking.webp' },
  { id: 8, src: '/img/Sideways-Scroller/Top-Layer/Top-08-Apartment-Balconies.webp' }
];

const imagesSrcMid = [
  { id: 1, src: '/img/Sideways-Scroller/Mid-Layer/Mid-01-The-Waterside.webp' },
  { id: 2, src: '/img/Sideways-Scroller/Mid-Layer/Mid-02-Gails-Bakery-Worker.webp' },
  { id: 3, src: '/img/Sideways-Scroller/Mid-Layer/Mid-03-Sams-Waterside.webp' },
  { id: 4, src: '/img/Sideways-Scroller/Mid-Layer/Mid-04-Dog-Walkers-The-Lanes.webp' },
  { id: 5, src: '/img/Sideways-Scroller/Mid-Layer/Mid-05-Duke-of-London-Showroom.webp' },
  { id: 6, src: '/img/Sideways-Scroller/Mid-Layer/Mid-06-Sams-Waterside-Waiter.webp' },
  { id: 7, src: '/img/Sideways-Scroller/Mid-Layer/Mid-07-Rottura-Restaurant-Chefs.webp' },
  { id: 8, src: '/img/Sideways-Scroller/Mid-Layer/Mid-08-The-Lanes-Car-Boot-Sale.webp' }
];

const imagesSrcLow = [
  { id: 1, src: '/img/Sideways-Scroller/Low-Layer/Low-01-Hewson-Books.webp' },
  { id: 2, src: '/img/Sideways-Scroller/Low-Layer/Low-02-Duke-of-London-Event.webp' },
  { id: 3, src: '/img/Sideways-Scroller/Low-Layer/Low-03-Sams-Waterside-Chefs.webp' },
  { id: 4, src: '/img/Sideways-Scroller/Low-Layer/Low-04-Coffee-Shop-Barista.webp' },
  { id: 5, src: '/img/Sideways-Scroller/Low-Layer/Low-05-The-Brentford-Cobbler.webp' },
  { id: 6, src: '/img/Sideways-Scroller/Low-Layer/Low-06-Waterside-Living.webp' },
  { id: 7, src: '/img/Sideways-Scroller/Low-Layer/Low-07-Sams-Larder-Chef.webp' }
];

let topTween, midTween, lowTween;

const initAnimations = () => {
  const createHorizontalLoop = (container, speed) => {
    const distance = container.scrollWidth;
    return gsap.fromTo(container, { x: 0 }, {
      x: -distance,
      duration: distance / speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % distance)
      }
    });
  };


  topTween = createHorizontalLoop(top.value, 35);
  midTween = createHorizontalLoop(mid.value, 25);
  lowTween = createHorizontalLoop(low.value, 20);

  let prevScrollY = window.scrollY;
  

  ScrollTrigger.create({
    trigger: stickyWrapper.value,
    start: 'top bottom',
    end: `bottom+=${foAll.value.scrollWidth }`,
    onUpdate: (self) => {
      const currentScrollY = window.scrollY;
      const direction = prevScrollY < currentScrollY ? 1 : -1;

      gsap.to(topTween, { timeScale: direction, duration: 0.5, ease: 'power1.out' });
      gsap.to(midTween, { timeScale: direction, duration: 0.5, ease: 'power1.out' });
      gsap.to(lowTween, { timeScale: direction, duration: 0.5, ease: 'power1.out' });

      prevScrollY = currentScrollY;
    }
  });

  topTween.play();
  midTween.play();
  lowTween.play();

  gsap.to(top.value, {
    xPercent: -30 * (top.value.children.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: stickyWrapper.value,
      start: 'top top',
      end: `+=${foAll.value.scrollWidth}`,
      scrub: true,
      pin: true,
      invalidateOnRefresh: true,
    },
  });

  gsap.to(mid.value, {
    xPercent: -25 * (mid.value.children.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: stickyWrapper.value,
      start: 'top top',
      end: `+=${foAll.value.scrollWidth}`,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  gsap.to(low.value, {
    xPercent: -15 * (low.value.children.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: stickyWrapper.value,
      start: 'top top',
      end: `+=${foAll.value.scrollWidth}`,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
};

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger);

  await nextTick();
  
  initAnimations();

  const setVhProperty = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Update the --vh variable on page load and resize
  window.addEventListener('resize', setVhProperty);
  setVhProperty(); // Initial call
});

onBeforeUnmount(() => {
  if (topTween) topTween.kill();
  if (midTween) topTween.kill();
  if (lowTween) topTween.kill();
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style lang="scss" scoped>
  .sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
  }

  .large {
    width: calc(var(--vh, 1vh) * 38.88888888888889);
    height: calc(var(--vh, 1vh) * 48.61111111111111);

  }

  .medium {
    width: calc(var(--vh, 1vh) * 28.77777777777778);
    height: calc(var(--vh, 1vh) * 35.97222222222222);
  }

  .small {
    width: calc(var(--vh, 1vh) * 18.88888888888889);
    height: calc(var(--vh, 1vh) * 23.61111111111111);
  }

  @media (max-width: $phone) {
    .large {
      width: calc(var(--vh, 1vh) * 34);
      height: calc(var(--vh, 1vh) * 42.5);

    }

    .medium {
      width: calc(var(--vh, 1vh) * 23.333333333333332);
      height: calc(var(--vh, 1vh) * 29.166666666666668);
    }

    .small {
      width: calc(var(--vh, 1vh) * 20);
      height: calc(var(--vh, 1vh) * 25);
    }
  }
</style>
