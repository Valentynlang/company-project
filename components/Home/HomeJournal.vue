<template>
  <section class="px-5 gap-x-10 mt-24 md:mt-36 mb-20 md:px-10 md:grid md:grid-cols-12 md:pb-20">
    <div class="md:col-span-12 mb-8 md:mb-20 flex flex-col md:flex-row justify-between gap-6">
      <div ref="journalBlockTitle" class="flex flex-col gap-4">
        <h5 class="font-bold uppercase text-14 md:text-20">Journal</h5>
        <p class="text-4.5">Explore the stories behind The Brentford Project and the people that live & work here.</p>
      </div>

      <div>
        <AppButton text="VIEW ALL" color="black" route="/journal" />
      </div>
    </div>

    <div 
    v-for="(item, id) in articles" 
    :key="id" 
    :ref="ref => journalArticleItems[id] = ref" 
    class="col-span-4 !hidden md:!flex opacity-0 transition-opacity duration-200 ease-in-out"
    >
      <JournalArticleItem 
      :article="item"
      class="w-full"
      />
    </div>

    <div ref="articlesSlider" class="flex md:hidden">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <JournalArticleItem
            v-for="(item, id) in articles"
            :key="id"
            :article="item"
          />
        </ul>
      </div>
    </div>

    <div class="flex md:hidden gap-3 mt-6">
      <button class="py-1.5 px-4 rounded-full border border-black bg-white hover:bg-black hover:[&>svg]:text-white transition-all" @click="() => glide.go('<')">
        <ArrowIcon class="w-2 rotate-90 text-black" />  
      </button>

      <button class="py-1.5 px-4 rounded-full border border-black bg-white hover:bg-black hover:[&>svg]:text-white transition-all" @click="() => glide.go('>')">
        <ArrowIcon class="w-2 -rotate-90 text-black" />  
      </button>
    </div>
  </section>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-down.svg'
  import Glide from '@glidejs/glide'
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'

  defineProps({
    articles: {
      type: Array,
      default: () => []
    }
  })

  const articlesSlider = ref(null)
  const glide = ref(null)
  const journalArticleItems = ref([]);
  const journalBlockTitle = ref(null);

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    journalArticleItems.value.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          {
            y: '40px',
            opacity: 0
          },
          {
            delay: 0.1 + (index * 0.3),
            duration: 1,
            y: '0',
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

    gsap.fromTo(
      journalBlockTitle.value?.children,
      {
        y: '50px',
        opacity: 0
      },
      {
        delay: 0.1,
        duration: 1,
        y: '0%',
        opacity: 1,
        stagger: .2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: journalBlockTitle.value,
          start: 'top bottom'
        }
      }
    );

    glide.value = new Glide(articlesSlider.value, {
      type: 'carousel',
      gap: 24,
      autoplay: false,
      perView: 1.15
    });

    glide.value.mount();
  });

  onBeforeUnmount(() => {
    if (glide.value && glide.value.destroy) glide.value.destroy()
  })
</script>

<style lang="scss" scoped>
  @import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';
</style>