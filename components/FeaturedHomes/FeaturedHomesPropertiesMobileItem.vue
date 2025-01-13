<template>
  <div
    class="row relative cursor-pointer transition-all duration-300 ease-linear before:transition-all before:duration-300 before:ease-linear after:transition-all after:duration-300 after:ease-linear"
    :class="[{ 'bg-gray row-left-bg row-right-bg': isOpen }, { 'border-t border-light_gray last-of-type:border-b last-of-type:border-light_gray': !isOpen }]"
    @click="toggleItem()"
  >
    <div
      class="py-5 flex flex-col gap-5 [&>span]:text-3.5 [&>span]:tracking-tight"
    >
      <div class="flex justify-between gap-4">
        <div class="flex flex-col gap-1">
          <span class="font-medium">{{ item.property_id }}</span>
          <span>{{ item.building }}</span>
        </div>

        <button
          class="px-5 py-2.5 w-fit border border-black rounded-full flex gap-2 items-center"
          :class="{ 'open': isOpen }"
        >
          <span class="">{{ isOpen ? 'Close' : 'Details' }}</span>
          <NuxtImg src="/svg/arrow-down.svg" class="arrow h-3" loading="lazy" alt="Arrow down icon" />
        </button>
      </div>
      <div class="flex justify-between gap-4 items-end">
        <div class="flex flex-col gap-1">
          <span>{{ item.level }}{{ nth(item.level) }} Floor</span>
          <span>{{ item.bedrooms }} Bedrooms</span>
          <span>{{ item.size }}</span>
        </div>
        <div>
          <span class="text-4 font-medium">{{ item.price }}</span>
        </div>
      </div>
    </div>

    <div
      class="max-h-0 overflow-hidden transition-all	duration-300 ease-linear"
      :class="{ 'max-h-206': isOpen }"
    >
      <div class="pt-5 pb-8">
        <div class="mb-7 [&>p]:m-0 [&>p]:text-3.5">
          <p>View: {{ item.view }}</p>
          <p v-if="item.move_in">Move in: {{ item.move_in }}</p>
        </div>
        <div v-if="item?.building_gallery && item?.building_gallery_promo_image?.image" class="relative flex flex-col gap-3 mb-6" @click.stop="openGallery(item?.building_gallery?.media_item)">
          <div class="absolute top-6 right-6">
            <button class="bg-black rounded-full p-2 h-8 w-8 flex items-center justify-center"><ExpandIcon class="w-full" /></button>
          </div>

          <div class="bg-white py-11 w-full h-full flex-1 flex items-center justify-center">
            <AppImage
              class="h-40"
              :image="item?.building_gallery_promo_image?.image"
              :image-type="WPImageType.oneFourthScreen"
              is-lazy-loading="true"
            />
          </div>
    
          <button class="flex gap-2 items-center uppercase hover:underline transition-all">
            <span class="font-medium">BUILDING & PLANS</span>
            <NuxtImg src="/svg/arrow-right.svg" class="w-3.5" loading="lazy" alt="Arrow right icon" />
          </button>
        </div>
        <div  v-if="item?.photos_videos_gallery && item?.photos_gallery_promo_image?.image" class="relative flex flex-col gap-3 mb-10" @click.stop="openGallery(item?.photos_videos_gallery?.media_item)">
          <div class="absolute top-6 right-6">
            <button class="bg-black rounded-full p-2 h-8 w-8 flex items-center justify-center"><ExpandIcon class="w-full" /></button>
          </div>

          <AppImage
            class="w-full max-h-62.5 object-cover"
            :image="item?.photos_gallery_promo_image?.image"
            :image-type="WPImageType.oneFourthScreen"
            is-lazy-loading="true"
          />

          <button class="flex gap-2 items-center uppercase hover:underline transition-all">
            <span class="font-medium">PHOTOS & VIDEOS</span>
            <NuxtImg src="/svg/arrow-right.svg" class="w-3.5" loading="lazy" alt="Arrow right icon" />
          </button>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <AppButton color="black" text="REQUEST VIEWING" class="w-fit" route="/register" />
          <a v-if="item?.pdf?.url" :href="item.pdf.url" target="_blank" class="underline">Download PDF</a>
        </div>
      </div>
    </div>
  </div>

  <ClientOnly>
    <Teleport to="body">
      <AppGalleryModal v-if="isGalleryActive" @close-modal="closeModal" :galleryItems="gallery" bg="white" />
    </Teleport>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import ExpandIcon from '@/public/svg/expand.svg'

  import {WPImageType} from '~/types/enums/wp-image-type'

  const props = defineProps({
    item: {
      type: Object,
      default: () => {}
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: null,
    },
  })

  const emit = defineEmits(['toggle'])

  const isGalleryActive = ref(false)
  const gallery = ref([])

  const toggleItem = () => {
    emit('toggle', props.id)
  }

  const openGallery = (galleryItem: any) => {
    if (galleryItem) {
      gallery.value = galleryItem
      isGalleryActive.value = true
    }
  }

  const nth = (d: any) => {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
      case 1:  return "st"
      case 2:  return "nd"
      case 3:  return "rd"
      default: return "th"
    }
  }

  const closeModal = () => {
    isGalleryActive.value = false
    gallery.value = []
  }
</script>

<style lang="scss" scoped>
  .arrow {
    transition: transform 0.3s;
  }

  .open {
    .arrow {
      transform: rotate(-180deg);
    }
  }
</style>