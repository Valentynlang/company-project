<template>
  <section
    ref="locationsSection"
    class="px-5 md:px-10 flex flex-col gap-5 md:gap-10 md:grid md:grid-cols-12"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
  >
    <div class="max-md:mb-9 md:col-start-1 md:col-end-5">
      <h3 class="text-10 md:text-16 font-secondary m-0">{{ data.title }}</h3>
      <p class="mt-5 text-4.5">
        {{ data.text }}
      </p>
    </div>

    <div class="max-md:overflow-x-scroll no-scrollbar max-md:flex-nowrap md:col-start-8 md:col-end-13 flex gap-3 flex-wrap justify-start md:items-end md:justify-end">
      <AppTab
        v-for="item in categories"
        :key="item"
        :item="item"
        :activeCategory="activeCategory"
        @selectCategory="tabSelectCategory"
      />
    </div>

    <div ref="locationsSlider" class="col-span-12 md:border-t md:border-light_gray relative">
      <div
        class="flex transition-transform duration-500 ease-in-out py-10 overflow-x-scroll no-scrollbar"
        ref="slidesContainer"
        @scroll="handleScroll"
      >
        <NeighbourhoodLocationItem
          v-for="location in filteredLocations"
          :key="location.id"
          :location="location"
          :categories="categories"
          class="flex-shrink-0 w-full px-2.5 md:px-5"
          :style="{ width: slideWidth + 'px' }"
        />
      </div>

      <div class="flex justify-center gap-3">
        <button class="group py-2 px-5 rounded-full border border-black bg-white hover:bg-black transition-all" @click="prevSlide">
          <ArrowIcon class="group-hover:text-white w-3 rotate-90 text-black" />  
        </button>
  
        <button class="group py-2 px-5 rounded-full border border-black bg-white hover:bg-black transition-all" @click="nextSlide">
          <ArrowIcon class="group-hover:text-white w-3 -rotate-90 text-black" />  
        </button>
      </div>
    </div>

  </section>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-down.svg'
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'

  const props = defineProps({
    locations: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => {}
    },
    paddings: {
      type: Object,
      default: () => {}
    },
  })

  const { isDesktop } = useMediaQuery()

  const activeCategory = ref(6)
  const filteredLocations = ref([])
  const currentSlide = ref(0)
  const slideWidth = ref(0)
  const slidesContainer = ref(null)

  const tabSelectCategory = (value) => {
    activeCategory.value = value
    filteredLocations.value = props.locations.filter(item => item.locations_category.includes(value))
    currentSlide.value = 0
  }

  const prevSlide = () => {
    if (currentSlide.value > 0) {
      currentSlide.value--;
      scrollToSlide(currentSlide.value);
    }
  }

  const nextSlide = () => {
    if (currentSlide.value < filteredLocations.value.length - perView.value) {
      currentSlide.value++;
      scrollToSlide(currentSlide.value);
    }
  }

  const scrollToSlide = (index) => {
    const scrollAmount = index * slideWidth.value;
    slidesContainer.value.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  // Handle manual scroll event to keep currentSlide in sync
  const handleScroll = () => {
    const scrollLeft = slidesContainer.value.scrollLeft;
    const newSlide = Math.round(scrollLeft / slideWidth.value);
    currentSlide.value = newSlide;
  }

  const perView = ref(4.1)
  const updateSlideWidth = () => {
    const viewportWidth = window.innerWidth

    if (viewportWidth <= 767) {
      perView.value = 1.15
    } else {
      perView.value = 4.1
    }

    slideWidth.value = slidesContainer.value.clientWidth / perView.value
  }

  const locationsSection = ref(null);

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    filteredLocations.value = props.locations.filter(item => item.locations_category.includes(activeCategory.value))
    updateSlideWidth()
    window.addEventListener('resize', updateSlideWidth)

    gsap.fromTo(
      locationsSection.value,
      {
        y: 50,
        opacity: 0
      },
      {
        delay: 0.5,
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: locationsSection.value,
          start: 'top bottom'
        }
      }
    );
  })

  watch(filteredLocations, () => {
    currentSlide.value = 0
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSlideWidth)
  })
</script>
