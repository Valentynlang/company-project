<template>
  <section
    ref="section"
    class="grid md:grid-cols-6 md:gap-40 gap-5 px-5 py-20 md:py-40 md:px-10 bg-black"
  >
    <div class="h-full md:flex md:flex-col md:justify-between relative md:col-span-2">
      <div ref="stickyElement" class="relative md:sticky">
        <div ref="ballymoreTitleElement" class="opasity-0" >
          <div class="flex items-center w-full pb-5 ">
            <div class="max-w-150 text-white">
              <h1 class="font-bold uppercase text-13 md:text-19 m-0 tracking-tight">OUR WORK</h1>
              <div class="md:pb-10 text-4.5 mt-5 max-w-80 font-medium">
                <p>
                  A selection of Ballymore Group's recent projects - setting new standards in placemaking, construction,
                  design and urban planning.
                </p>
              </div>
            </div>
          </div>

          <div class="max-md:overflow-x-scroll max-md:flex-nowrap flex gap-3 flex-wrap justify-start ">
            <AppTab
              v-for="item in areasList"
              :key="item.id"
              :item="item"
              :activeCategory="activeArea"
              :isOposite="true"
              @selectCategory="handleCategorySelect"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5 md:col-span-4 grid md:grid-cols-2 gap-10">
      <div class="flex flex-col">
        <BallymorePortfolioItem
          class="mb-10"
          v-for="portfolioItem in firstPortfolioList"
          :key="portfolioItem.name"
          :portfolioItem="portfolioItem"
        />
      </div>
      <div class="flex flex-col"> 
        <BallymorePortfolioItem
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

<script setup lang="ts">
  import { gsap } from "gsap"
  import { onBeforeMount, ref, computed, nextTick, onBeforeUnmount } from "vue"
  import ScrollTrigger from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  export interface PortfolioListItem {
    area: string
    text: string
    name: string
    img: {
      image: WPImage
    }
    link: {
      url: string
    }
  }

  interface PortfolioListProps {
    portfolioList: PortfolioListItem[]
  }

  const props = withDefaults(defineProps<PortfolioListProps>(), {
    portfolioList: [],
  })

  const section = ref(null)
  const stickyElement = ref(null)
  const endElement = ref(null)
  const isDesktop = ref(false)
  const activeArea = ref(0)
  const areasPortfolioHashTable = ref({})
  const ballymoreTitleElement = ref(null);
  let resizeTimeout: number | null = null;

  const filteredPortfolioList = computed(() => {
    const areaCategory = areasList.value.find((item: Category) => item.id === activeArea.value)

    if (areaCategory) {
      return areasPortfolioHashTable.value[areaCategory.name] || []
    }

    return []
  })

  const firstPortfolioList = computed(() => filteredPortfolioList.value.filter((_, index) => index % 2 === 0))
  const secondPortfolioList = computed(() => filteredPortfolioList.value.filter((_, index) => index % 2 !== 0))

  const areasList = computed(() => Object.keys(areasPortfolioHashTable.value)
    .map((areaName, index) => ({ id: index, name: areaName, count: areasPortfolioHashTable.value[areaName].length }))
  )

  const setAreasList = () => {
    areasPortfolioHashTable.value = props.portfolioList.reduce((acc, current) => {
      if (!acc[current.area]) {
        acc[current.area] = []
      }

      acc[current.area].push(current)
      return acc
    }, {})
  }

  const onSelectCategory = (value: number) => {
    activeArea.value = value
  }

  const handleCategorySelect = (value: number) => {
    onSelectCategory(value)
    onResize()
  }

  const onResize = () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(async() => {
      isDesktop.value = window.innerWidth >= 768
      
      gsap.fromTo(ballymoreTitleElement.value,
      {
        x: '-50px',
        opacity: 0
      },
      {
        delay: 0.01,
        duration: 1,
        x: '0px',
        opacity: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: ballymoreTitleElement.value,
          start: 'top bottom'
        }
      }
      )

      const stickyTrigger = ScrollTrigger.getById('stickyTrigger')
      if (stickyTrigger) {
        stickyTrigger.kill()
      }

      if (isDesktop.value) {
        gsap.set(stickyElement.value, { clearProps: "all" })

        await nextTick()

        const stickyHeight = stickyElement?.value?.offsetHeight

        gsap.to(stickyElement.value, {
          scrollTrigger: {
            trigger: stickyElement.value,
            start: "top top",
            endTrigger: endElement.value,
            end: () => `top-=${stickyHeight + 180} top`,
            pin: true,
            pinSpacing: false,
            id: 'stickyTrigger'
          }
        })
      }
    }, 100)
  }

  onBeforeMount(async() => {
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

    setAreasList()
    window.addEventListener('resize', onResize)
    onResize()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
</script>