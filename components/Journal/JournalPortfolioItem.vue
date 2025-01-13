<template>
    <div ref="portfolioItemContainer" class="JournalPortfolioItem text-black"
    @mouseenter="toggleOpen"
    @mouseleave="toggleOpen">
      <div>
        <AppImage
          is-lazy-loading="true"
          :image="portfolioItem.img.image"
          :imageType="WPImageType.oneFourthScreen"
          class="object-cover w-full h-full aspect-[1/1]"
        />
      </div>
  
      <div class="flex w-full items-center justify-between my-5  ">
        <span class="font-medium text-4.5">{{ portfolioItem.name }}</span>
        <div ref="arrowContainer">
          <NuxtImg
            class="h-7 w-7 invert"
            v-show="!isToggleOpen"
            src="/svg/arrow-down-b.svg"
            loading="lazy"
            alt="Arrow down icon"
          />
  
          <NuxtImg
            v-show="isToggleOpen"
            src="/svg/arrow-down-b.svg"
            class="h-7 w-7 invert"
            loading="lazy"
            alt="Arrow down icon"
          />
        </div>
      </div>
  
      <div
        class="overflow-hidden transition-max-height duration-500 ease-in-out"
        :class="{'max-h-0 border-b border-b-stone-500': !isToggleOpen, 'max-h-96 border-b border-b-stone-500': isToggleOpen}"
      >
        <div class="flex text-3.5 justify-between items-end mb-5">
          <p v-html="portfolioItem.text" />
          <a :href="portfolioItem.link.url" target="_blank" rel="noopener noreferrer" class="flex justify-between gap-3 items-end cursor-pointer">
            <span class="text-3.5 block leading-none font-medium">View/Download</span>
            <ArrowIcon class="JournalPortfolioItem__arrow h-6" />
          </a>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { WPImageType } from "~/types/enums/wp-image-type"
  import ArrowIcon from '@/public/svg/arrow-top.svg'
  import type { PortfolioListItem } from "~/components/Ballymore/BallymorePortfolio.vue"

  import { ref, onMounted, nextTick, watch } from 'vue'

  interface Props {
    portfolioItem: PortfolioListItem
  }

  const props = withDefaults(defineProps<Props>(), {
    portfolioItem: null,
  })

  const isToggleOpen = ref(false)
  const arrowContainer = ref<HTMLElement | null>(null)
  const portfolioItemContainer = ref<HTMLElement | null>(null)

  const toggleOpen = () => {
    isToggleOpen.value = !isToggleOpen.value
    animateArrow()
  }

  const animateArrow = () => {
    if (arrowContainer.value) {
      gsap.to(arrowContainer.value.querySelectorAll('img'), {
        duration: 0.5,
        rotation: isToggleOpen.value ? 180 : 0,
        ease: 'power1.inOut',
      })
    }
  }
  
  const animateComponent = () => {
  if (portfolioItemContainer.value) {
    gsap.fromTo(
      portfolioItemContainer.value,
      { y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: portfolioItemContainer.value,
          start: 'top bottom',
        }
      }
    )
  }
}

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)

  await nextTick()

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateComponent()
      }
    })
  }, { threshold: 0 })

  if (portfolioItemContainer.value) {
    observer.observe(portfolioItemContainer.value)
  }

  watch(isToggleOpen, () => {
    animateArrow()
  })
})
</script>

<style lang="scss">
  .JournalPortfolioItem {
    &__arrow {
      path {
        stroke: white;
      }
    }
  }
</style>