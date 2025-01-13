<template>
  <section
    ref="mainImageWrapper"
    class="px-5 md:px-10 pool-section-wrapper"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}` : '' ]"
  >
    <!-- Desktop Content -->
    <div v-if="isDesktop" ref="poolSectionDesktop" class="grid grid-cols-3 md:grid-cols-7 gap-10">
      <div ref="mainImageContainer" class=" pt-10 md:col-span-3 order-1 md:order-2 ">
        <div class=" flex flex-col md:gap-10">
          <div class="basis-3/5 overflow-hidden">
            <NuxtImg
              ref="mainImage"
              src="/img/The-Wick-Spa-Interior.webp"
              alt="The-Wick-Spa-Interior"
              class="w-full h-full object-cover md:scale-[2.8]"
              loading="lazy"
            />
          </div>
          <div class=" basis-1/4 pt-20 pb-20">
            <div ref="mainImageText" class="flex align-center justify-center h-full">
              <p class="text-center text-4.5 w-1/2">
                To start the day, relax at the weekend, or leave the kids for a spot of pampering, The Wick’s team will take care of everything. No lines, and no time wasted getting there. Just a warm welcome, and a tranquil space.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div ref="leftImageContainer" class="md:col-span-2 order-2 md:order-1 pt-10">
        <div class="flex flex-col md:gap-10 gap-2 overflow-x-auto">
          <div class="basis-1/4 inline-block order-1 md:order-2">
            <NuxtImg
              src="/img/The-Wick-Sauna-Interior.webp"
              alt="The-Wick-Sauna-Interior"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="basis-3/4 order-2 md:order-1 inline-block">
            <NuxtImg
              src="/img/The-Wick-Pool-and-Clubhouse.webp"
              alt="The-Wick-Pool-and-Clubhouse"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div ref="rightImageContainer" class="pt-10 md:col-span-2 order-4 md:order-3">
        <div class="flex flex-col md:gap-10 gap-2 overflow-x-auto whitespace-nowrap">
          <div class="basis-3/4 inline-block order-1 md:order-2">
            <NuxtImg
              src="/img/The-Wick-Steam-Interior.webp"
              alt="The-Wick-Steam-Interior"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="basis-1/4 inline-block">
            <NuxtImg
              src="/img/The-Wick-Spa-Pool.webp"
              alt="The-Wick-Spa-Pool"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Content -->
    <div v-else ref="poolSectionMobile" >
      <NuxtImg
        ref="mainImageMobile"
        src="/img/The-Wick-Spa-Interior-MOB.webp"
        alt="The-Wick-Spa-Interior"
        class="w-full h-full object-cover aspect-[4/5] mb-29"
        loading="lazy"
      />

      <p class="text-center text-4.5">
        To start the day, relax at the weekend, or leave the kids for a spot of pampering, The Wick’s team will take care of everything. No lines, and no time wasted getting there. Just a warm welcome, and a tranquil space.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

defineProps({
  paddings: {
    type: Object,
    default: () => {}
  },
})

const mainImageContainer = ref(null)
const leftImageContainer = ref(null)
const rightImageContainer = ref(null)
const mainImageContainerMobile = ref(null)
const leftImageContainerMobile = ref(null)
const rightImageContainerMobile = ref(null)
const mainImageMobile = ref(null)
const mainImage = ref(null)
const mainImageWrapper = ref(null)
const poolSectionDesktop = ref(null)
const poolSectionMobile = ref(null)
const mainImageText = ref(null)

const isDesktop = ref(false)
  
  const onResize = async () => {
    isDesktop.value = window.innerWidth >= 768
  }

  const setupMobileAnimations = async () => {
    const waitForImages = new Promise((resolve) => {
      const images = poolSectionMobile.value.querySelectorAll('img')
      let loadedImages = 0
      images.forEach((img) => {
        if (img.complete) {
          loadedImages++
        } else {
          img.addEventListener('load', () => {
            loadedImages++
            if (loadedImages === images.length) resolve()
          })
          img.addEventListener('error', () => {
            loadedImages++
            if (loadedImages === images.length) resolve()
          })
        }
      })
      if (loadedImages === images.length) resolve()
    })

    await waitForImages

    gsap.to([mainImageContainerMobile.value, leftImageContainerMobile.value, rightImageContainerMobile.value], {
      xPercent: -(100 * 2), 
      ease: 'none',
      scrollTrigger: {
        trigger: mainImageWrapper.value,
        start: '20% top',
        end: () => `+=${poolSectionMobile.value.scrollWidth}`,
        scrub: true,
        anticipatePin: 1,
      }
    });

    ScrollTrigger.create({
      trigger: mainImageWrapper.value,
      start: 'top top',
      end: () => `+=${poolSectionMobile.value.scrollWidth}`,
      pin: true,
      pinSpacing: true,
    });

    ScrollTrigger.create({
        trigger: mainImageContainer.value,
        start: 'top center',
        end: 'bottom-=40% top',
        scrub: true,
        onUpdate: (self) => {
          gsap.to(mainImageMobile.value.$el, { scale: 2.8 - self.progress * 1.7, transformOrigin: "center center" })
        },
      });

      if (mainImageWrapper.value && poolSectionMobile.value && leftImageContainerMobile.value && rightImageContainerMobile.value) {
      setTimeout(() => {
        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: poolSectionMobile.value,
            start: '15% top', 
            end: 'bottom+=80% bottom', 
            scrub: true,
          }
        });

        tlMobile.fromTo(leftImageContainerMobile.value,
          {
            opacity: 1,
            yPercent: -120,
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 3,
            ease: 'power1.out'
          }
        )
        .to(leftImageContainerMobile.value,
          {
            opacity: 1,
            yPercent: 0,
            duration: 3,
            ease: 'none'
          }
        );
      }, 100); 
    } else {
      console.error('error');
    }
  }

  const setupDesktopAnimations = async () => {
    const waitForImages = new Promise((resolve) => {
      const images = poolSectionDesktop.value.querySelectorAll('img')
      let loadedImages = 0
      images.forEach((img) => {
        if (img.complete) {
          loadedImages++
        } else {
          img.addEventListener('load', () => {
            loadedImages++
            if (loadedImages === images.length) resolve()
          })
          img.addEventListener('error', () => {
            loadedImages++
            if (loadedImages === images.length) resolve()
          })
        }
      })
      if (loadedImages === images.length) resolve()
    })

    await waitForImages
    
    ScrollTrigger.create({
      trigger: mainImageContainer.value,
      start: 'top center',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.to(mainImage.value.$el, { scale: 2.8 - self.progress * 1.7, transformOrigin: "center center" })
      }
    });

    if (mainImageWrapper.value) {
      ScrollTrigger.create({
        trigger: mainImageWrapper.value,
        start: "top top",
        end: "bottom bottom",
        pin: mainImageWrapper.value,
        pinSpacing: false, 
      });
    }

    gsap.fromTo(mainImageText.value,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: -20,
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: mainImageContainer.value,
          start: 'top+=20% center',
          end: 'bottom+=40% top',
          scrub: 1.5,
        }
      }
    );

    const tlFSC = gsap.timeline({
      scrollTrigger: {
        trigger: mainImageWrapper.value,
        start: 'top+=20% center',
        end: 'bottom+=20% top',    
        scrub: 1.5,
      }
    });

    const tlFS = gsap.timeline({
      scrollTrigger: {
        trigger: mainImageWrapper.value,
        start: 'top+=20% center',
        end: 'bottom+=20% top',    
        scrub: 1.5,
      }
    });

    tlFSC.fromTo(leftImageContainer.value,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: -18.5,
        duration: 3,
        ease: 'power1.out'
      }
    ).to(leftImageContainer.value,
      {
        opacity: 1,
        yPercent: -18.5,
        duration: 4,
        ease: 'none'
      }
    );

    tlFS.fromTo(rightImageContainer.value,
      {
        opacity: 0,
        yPercent: -100,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 2,
        ease: 'power1.out'
      }
    ).to(rightImageContainer.value,
      {
        opacity: 1,
        yPercent: 0,
        duration: 3,
        ease: 'none'
      }
    );
  }

  onMounted(async () => {
    window.addEventListener('resize', onResize)
    onResize()

    gsap.registerPlugin(ScrollTrigger);

    await nextTick();

    isDesktop.value ? setupDesktopAnimations() : null
    // isDesktop ? setupDesktopAnimations() : setupMobileAnimations();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
</script>

<style scoped>
.sticky-container {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.container {
  height: 90%;
  width: 100%;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .pool-section-wrapper {
    height: 180vh;
    margin-bottom: 500px;
  }
}

@media (max-width: 1023px) {
  /* .pool-section-wrapper {
    height: 100vh;
  } */

  .horizontal-scroll {
    display: flex;
    width: 300vw;
    overflow-x: hidden;
    flex-wrap: nowrap;
  }

}
</style>