<template>
  <section ref="journalPromoSection" class="px-5 md:px-10 pt-38 md:pt-70 md:grid md:grid-cols-12 items-end opacity-0">
    <div class="md:col-start-1 col-end-6">
      <h1 class="font-bold uppercase text-14 md:text-25 m-0">Journal</h1>
      <p class="mt-5 max-md:mb-7 text-4.5">Explore the stories behind The Brentford Project and the people that live & work here.</p>
    </div>

   <!-- <div class="md:col-start-8 md:col-end-13 flex gap-3 flex-wrap justify-start md:justify-end">
      <template v-if="isDesktop">
        <AppTab
          v-for="item in [...categories, ...appStore.categories]"
          :key="item"
          :item="item"
          :activeCategory="activeCategory"
          @selectCategory="tabSelectCategory"
        />
      </template>
      <div v-else class="relative inline-block">
        <select
          v-model="category"
          class="appearance-none text-transparent text-3 border border-black rounded-full py-2 pl-4 pr-8 focus:outline-none"
          @change="selectCategory"
        >
          <option
            v-for="option in [...props.categories, ...appStore.categories]"
            :key="option.value"
            :value="option"
          >
           <span v-html="option.name" />
          </option>
        </select>

        <span class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <svg
            class="w-4 h-4 fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </span>

        <span class="absolute left-0 top-1/2 -translate-y-1/2 ml-4 text-3 text-black">
          <span v-html="category?.name"></span>
          <sup v-if="category" class="ml-1">{{ category?.count }}</sup>
        </span>
      </div>
    </div>
    -->
  </section>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger'

  const props = defineProps({
    categories: {
      type: Array,
      default: () => []
    },
    activeCategory: {
      type: Number,
      default: 0
    },
  })

  const emit = defineEmits(['selectCategory'])

  const appStore = useAppStore()

  const category = ref(null)
  const isDesktop = ref(false)
  const journalPromoSection = ref(null);


  const tabSelectCategory = (value) => {
    emit('selectCategory', value)
  }

  const selectCategory = () => {
    emit('selectCategory', category.value.id)
  }


  const onResize = () => {
    isDesktop.value = window.innerWidth >= 768

    if (!isDesktop.value) {
      category.value = [...props.categories, ...appStore.categories][0]
    }

    gsap.fromTo(
      journalPromoSection.value,
      {
        y: 50,
        opacity: 0
      },
      {
        delay: 0.1,
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: journalPromoSection.value,
          start: 'top bottom'
        }
      }
    );
  }

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    window.addEventListener('resize', onResize)
    onResize()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
</script>

<style>

</style>