<template>
  <div ref="journalDynamicShare">
    <DynamicShare />
  </div>

  <section class="px-5 gap-x-10 mb-20 md:px-10 md:grid md:grid-cols-12">
    <div ref="exploreMoreTitle" class="md:col-span-12 text-center mb-8 md:mb-16">
      <h5 class="font-bold uppercase text-10 md:text-20">Explore more</h5>
    </div>

    <JournalArticleItem
      v-for="(item, id) in articles"
      :key="id"
      :article="item"
      class="col-span-3 !hidden md:!flex"
    />

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

    <div class="flex md:hidden gap-2 mt-6">
      <button class="h-8 w-8 flex items-center justify-center rounded-full border border-black bg-white" @click="() => glide.go('<')">
        <ArrowIcon class="w-3 rotate-90 text-black" />  
      </button>

      <button class="h-8 w-8 flex items-center justify-center rounded-full border border-black bg-white" @click="() => glide.go('>')">
        <ArrowIcon class="w-3 -rotate-90 text-black" />  
      </button>
    </div>

    <div class="hidden md:flex col-span-12 gap-4 items-center justify-center pt-mob-md pt-dsk-md pb-mob-md pb-dsk-md">
      <div>
        <AppButton text="View All Articles" color="black" route="/journal" />
      </div>
    </div>
  </section>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-down.svg'
  import Glide from '@glidejs/glide'
  import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'

  const props = defineProps({
    articles: {
      type: Array,
      default: () => []
    }
  })

  const articlesSlider = ref(null)
  const glide = ref(null)
  const exploreMoreTitle = ref(null);
  const journalDynamicShare = ref(null);

  onMounted(async() => {
    await nextTick()

    glide.value = new Glide(articlesSlider.value, {
      type: 'carousel',
      gap: 24,
      autoplay: false,
      perView: 1.15,
    })

    glide.value.mount()
  })

  onBeforeUnmount(() => {
    if (glide.value && glide.value.destroy) glide.value.destroy()
  })
</script>

<style lang="scss" scoped>
  @import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';
</style>