<template>
  <aside class="floorplan-modal bg-white fixed top-0 left-0 w-screen h-screen flex items-center z-50">
    <div ref="floorplan" class="w-full h-full">
      <div ref="quincyFloorplanModalAnimated" class="h-full"> 
        <div
          class="w-full h-full p-5 relative max-md:pb-[120px]"
          :class="[
            { 'w-full h-screen flex flex-col gap-5 md:px-10 md:grid md:grid-cols-12 md:gap-10 md:p-10': isDesktop },
            { 'flex h-full flex-col gap-5': !isDesktop },
          ]"
        >
          <div class="hidden md:flex flex-col justify-between">
            <div>
              <h6 class="mb-3 text-10 uppercase font-bold">Plans</h6>

              <p
                v-for="(option, idx) in floorplanItems"
                :key="option.idx"
                class="text-light_gray uppercase m-0 text-3.5 transition-all cursor-pointer"
                :class="{ '!text-black': idx === activeIndex }"
                @click="() => activeIndex = idx"
                >
                {{ option.type }}
              </p>
            </div>

            <div class="flex flex-col gap-2">
              <p
                v-for="service in services"
                :key="service.id"
                class="text-3 m-0 whitespace-nowrap"
              >
                <span class="font-bold text-3.5">{{ service.label }}</span> {{ service.name }}
              </p>
            </div>

            <div v-if="isDesktop" class="flex gap-3">
              <button class="group py-2 px-5 rounded-full border border-black bg-white hover:bg-black transition-all" @click="prevItem()">
                <ArrowIcon class="group-hover:text-white w-3 rotate-90 text-black" />  
              </button>
      
              <button class="group py-2 px-5 rounded-full border border-black bg-white hover:bg-black transition-all" @click="nextItem()">
                <ArrowIcon class="group-hover:text-white w-3 -rotate-90 text-black" />  
              </button>
            </div>
          </div>

          <div
            v-if="!isDesktop"
            class="flex justify-between gap-2 items-center"
          >
            <h3 v-if="!isDesktop" class="uppercase text-7 font-bold">{{ activeItem.type }}</h3>

            <button class="button rounded-full bg-black flex items-center justify-center z-50 h-12 w-12 border transition-all hover:bg-white text-white hover:text-black" @click="closeModal()">
              <CloseIcon class="text-white w-4 h-4" />  
            </button>
          </div>

          <TransitionGroup
            name="slide-fade"
            tag="div"
            class="col-span-10 relative max-md:overflow-scroll"
            @enter="onEnter"
            @leave="onLeave"
          >
            <div
              v-for="(item, index) in floorplanItems"
              :key="index"
              v-show="activeIndex === index"
              class="QuincyFloorplanModal__item md:grid md:grid-cols-10 md:gap-10 h-full md:absolute md:top-0 md:left-0 w-full"
            >
              <div class="col-span-7 flex items-center">
                <AppImage
                  is-lazy-loading="true"
                  :image="item.img.image"
                  :imageType="WPImageType.oneFourthScreen"
                  class="QuincyFloorplanModal__image w-full h-auto object-contain"
                />
              </div>
  
              <div class="col-span-3 flex flex-col justify-center gap-8">
                <div v-if="isDesktop">
                  <span class="text-3 mb-2 uppercase">FLOOR PLANS</span>
                  <h3 class="uppercase text-18 font-bold">{{ item.type }}</h3>
                </div>
  
                <div class="[&>div]:border-b [&>div]:border-light_gray [&>div]:py-2 [&>div]:flex [&>div]:justify-between [&>*]:uppercase [&>*]:text-3.5">
                  <div v-if="item.internal_area">
                    <span>Internal Area</span>
                    <span>{{ item.internal_area }}</span>
                  </div>
  
                  <div v-if="item.living_area">
                    <span>Living / Dining / Kitchen Area</span>
                    <span>{{ item.living_area }}</span>
                  </div>
  
                  <div v-if="item.bedroom_1">
                    <span>Bedroom 1</span>
                    <span>{{ item.bedroom_1 }}</span>
                  </div>
  
                  <div v-if="item.bedroom_2">
                    <span>Bedroom 2</span>
                    <span>{{ item.bedroom_2 }}</span>
                  </div>
  
                  <div v-if="item.bedroom_3">
                    <span>Bedroom 3</span>
                    <span>{{ item.bedroom_3 }}</span>
                  </div>
  
                  <div v-if="item.balcony_area_1">
                    <span>Balcony Area 1</span>
                    <span>{{ item.balcony_area_1 }}</span>
                  </div>
  
                  <div v-if="item.balcony_area_2">
                    <span>Balcony Area 2</span>
                    <span>{{ item.balcony_area_2 }}</span>
                  </div>
                </div>
  
                <div
                  :class="[
                    { 'flex justify-center': !isDesktop }
                  ]"
                >
                  <!--<AppButton text="REGISTER INTEREST" color="black" route="/register"/>-->
                </div>
              </div>
            </div>
          </TransitionGroup>

          <div
            v-if="isDesktop"
            class="flex md:flex-col items-center md:items-end justify-between"
            :class="[
              { 'fixed bottom-0 left-0 w-full ': !isDesktop }
            ]"
          >
            <button v-if="isDesktop" class="button rounded-full bg-black flex items-center justify-center z-50 h-12 w-12 border transition-all hover:bg-white text-white hover:text-black" @click="closeModal()"  >
              <CloseIcon class="w-3 h-3 md:w-4 md:h-4" />  
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="!isDesktop"
        class="fixed bottom-[50px] left-0 w-full p-5"
      >
        <div class="flex justify-center gap-3">
          <button class="group py-2 px-5 rounded-full border border-black bg-transparent hover:bg-black transition-all" @click="prevItem()">
            <ArrowIcon class="group-hover:text-white w-2.5 rotate-90 text-black" />  
          </button>
  
          <button class="group py-2 px-5 rounded-full border border-black bg-transparent hover:bg-black transition-all" @click="nextItem()">
            <ArrowIcon class="group-hover:text-white w-2.5 -rotate-90 text-black" />  
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-down.svg'
  import CloseIcon from '@/public/svg/close.svg'

  import gsap from 'gsap'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

  import { onMounted, onBeforeMount, onBeforeUnmount, ref } from 'vue'

  import { WPImageType } from '~/types/enums/wp-image-type'

  const props = defineProps({
    floorplanItems: {
      type: Array,
      default: () => []
    },
    startItem: {
      type: Number,
      default: 0,
    },
  })

  const { isDesktop } = useMediaQuery()

  const services = ref ([
    {
      id: 1,
      label: 'F',
      name: 'Fridge',
    },
    {
      id: 2,
      label: 'P',
      name: 'Pantry',
    },
    {
      id: 3,
      label: 'WD',
      name: 'Washer/Dryer'
    },
    {
      id: 4,
      label: 'DW',
      name: 'Dishwasher' 
    },
    {
      id: 5,
      label: 'C',
      name: 'Cupboard' 
    },
    {
      id: 6,
      label: 'U',
      name: 'Utility Cupboard' 
    },
    {
      id: 7,
      label: 'W',
      name: 'Wardrobe' 
    },
    {
      id: 8,
      label: 'B',
      name: 'Balcony' 
    },
  ])

  const emit = defineEmits(['close-modal'])

  gsap.registerPlugin(ScrollToPlugin)

  const activeIndex = ref(0)
  const floorplan = ref(null)
  const activeItem = ref(null)
  const quincyFloorplanModalAnimated = ref(null);

  const closeModal = () => {
    gsap.fromTo(
      ".floorplan-modal",
      { yPercent: 0 },
      { yPercent: -100, duration: 1, ease: "expo.out", onComplete: () => {
        emit('close-modal')
      }}
    )
  }

  const prevItem = () => {
    if (activeIndex.value === 0) {
      activeIndex.value = props.floorplanItems.length - 1
    } else {
      activeIndex.value = activeIndex.value - 1
    }

    selectActive(activeIndex.value)
  }

  const nextItem = () => {
    if (activeIndex.value === props.floorplanItems.length - 1) {
    activeIndex.value = 0
    } else {
      activeIndex.value = activeIndex.value + 1
    }

    selectActive(activeIndex.value)
  }

  const onEnter = (el) => {
    gsap.to(el, {
      opacity: 1,
      ease: 'power3.inOut',
      duration: 1,
    })
  }

  const onLeave = (el) => {
    gsap.to(el, {
      opacity: 0,
      ease: 'power3.inOut',
      duration: 1,
    })
  }

  const selectActive = (idx) => {
    props.floorplanItems.forEach((item, id) => {
      if (idx === id) activeItem.value = item
    })
  }

  onBeforeMount(() => {
    activeIndex.value = props.startItem

    selectActive(props.startItem)
  })

  onMounted(() => {
    const items = floorplan.value.querySelectorAll('.QuincyFloorplanModal__item')

    if (items?.length) {
      items.forEach((item, index) => {
        if (props.startItem === index) {
          item.classList.add('opacity-100')
        } else {
          item.classList.add('opacity-0')
        }
      })
    }

    gsap.fromTo(
      ".floorplan-modal",
      { yPercent: -100 },
      { yPercent: 0, duration: 1, ease: "expo.out" }
    )
    if (quincyFloorplanModalAnimated.value) {  
      gsap.fromTo(
        quincyFloorplanModalAnimated.value,
        {
          y: 0,
          opacity: 0
        },
        {
          delay: 0.2,
          duration: 1,
          y: 0,
          opacity: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: quincyFloorplanModalAnimated.value,
            start: 'top bottom'
          }
        }  
      );
    }
  })
</script>

<style lang="scss" scoped>
  .QuincyFloorplanModal {
    &__image {
      @media (min-width: $phone) {
        max-height: calc(100vh - 5rem);
      }
    }
  }
</style>