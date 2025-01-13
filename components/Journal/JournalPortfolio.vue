<template>
  <section
    ref="section"
    class="grid md:grid-cols-6 md:gap-40 gap-5 px-5 py-20 md:pb-0 md:px-10 bg-white min-h-dvh mb-40 md:pt-40"
  >
    <div class="h-full relative md:col-span-2">
      <div ref="stickyElement" class="relative md:sticky">
        <div ref="journalTitleElement" >
            <h1 class="font-bold uppercase text-13 md:text-19 m-0 tracking-tight text-black">Downloads</h1>
        </div>
      </div>
    </div>

    <div class="pt-5 md:col-span-4 grid md:grid-cols-2 gap-10">
      <div class="flex flex-col">
        <JournalPortfolioItem
          class="mb-10"
          v-for="portfolioItem in firstPortfolioList"
          :key="portfolioItem.name"
          :portfolioItem="portfolioItem"
        />
      </div>
      <div class="flex flex-col"> 
        <JournalPortfolioItem
          class="mb-10"
          v-for="portfolioItem in secondPortfolioList"
          :key="portfolioItem.name"
          :portfolioItem="portfolioItem"
        />
      </div>
    </div>
    <button class="hidden" ref="endElement"></button>
  </section>
</template>

<script setup>
  import { gsap } from "gsap"
  import { onBeforeMount, ref, computed, nextTick, onBeforeUnmount } from "vue"
  import ScrollTrigger from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  const props = defineProps({
    assets: {
      type: Array,
      default: () => []
    }
  })

  const section = ref(null)
  const stickyElement = ref(null)
  const endElement = ref(null)
  const isDesktop = ref(false)
  const journalTitleElement = ref(null)

  let resizeTimeout = null

  const firstPortfolioList = computed(() => props.assets.filter((_, index) => index % 2 === 0))
  const secondPortfolioList = computed(() => props.assets.filter((_, index) => index % 2 !== 0))

  const animateComponent = () => {
    if (journalTitleElement.value) {
      gsap.fromTo(
        journalTitleElement.value,
        {
          y: 50,        
          opacity: 0
        },
        {
          y: 0,
          delay: 0.3,
          duration: 1,
          opacity: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section.value,
            start: 'top bottom'
          }
        }  
      );
    }
  }

  const onResize = () => {
    isDesktop.value = window.innerWidth >= 768

    const stickyTrigger = ScrollTrigger.getById('stickyTrigger')
    if (stickyTrigger) {
      stickyTrigger.kill()
    }

    gsap.set(stickyElement.value, { clearProps: "all" })

    animateComponent()

    if (isDesktop.value) {
      gsap.registerPlugin(ScrollTrigger)

      const stickyHeight = stickyElement.value.offsetHeight

      gsap.to(stickyElement.value, {
        scrollTrigger: {
          trigger: stickyElement.value,
          start: () => `top-=${stickyHeight} top`,
          endTrigger: endElement.value,
          end: () => `top-=${stickyHeight} top`,
          pin: true,
          pinSpacing: false,
          id: 'stickyTrigger'
        }
      })
    }
  }

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    const waitForImages = new Promise((resolve) => {
      const images = section.value.querySelectorAll('img')
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

    window.addEventListener('resize', onResize)
    onResize()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
</script>