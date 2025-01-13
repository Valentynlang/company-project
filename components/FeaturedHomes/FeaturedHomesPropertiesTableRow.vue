<template>
  <div
    class="row relative cursor-pointer transition-all duration-300 ease-linear before:transition-all before:duration-300 before:ease-linear after:transition-all after:duration-300 after:ease-linear"
    :class="{ 'bg-gray row-left-bg row-right-bg': isOpen }"
    @click="toggleItem()"
    >
    <div
      class="grid gap-14 grid-cols-custom items-center py-3 [&>span]:text-4.5 [&>span]:tracking-tight"
      :class="{ 'border-b border-light_gray': !isOpen }"
    >
      <AppImage
        class="h-20"
        :image="item?.building_gallery_promo_image?.image"
        :image-type="WPImageType.oneFourthScreen"
        is-lazy-loading="true"
      /> 

      <span>{{ item.building }}</span>
      <span>{{ item.property_id }}</span>
      <span>{{ item.bedrooms }}</span>
      <span>{{ item.level }}</span>
      <span class="whitespace-nowrap">{{ item.size }}</span>
      <span>{{ item.price }}</span>

      <button
        class="px-5 py-2.5 w-fit border border-black rounded-full flex gap-2 items-center"
        :class="{ 'open': isOpen }"
      >
        <span class="">{{ isOpen ? 'Close' : 'Details' }}</span>
        <NuxtImg src="/svg/arrow-down.svg" class="arrow h-3" loading="lazy" alt="Arrow down icon" />
      </button>
    </div>

    <div
      class="max-h-0 overflow-hidden transition-all	duration-300 ease-linear"
      :class="{ 'max-h-200': isOpen }"
    >
    <div class="py-14 grid gap-10 grid-cols-12">
        <div v-if="item?.building_gallery && item?.building_gallery_promo_image?.image" class="relative col-span-3 flex flex-col gap-5"  @click.stop="openGallery(item?.building_gallery?.media_item)">
          <div class="absolute top-6 right-6">
            <button class="bg-black rounded-full p-2 h-8 w-8 flex items-center justify-center"><ExpandIcon class="w-full" /></button>
          </div>

          <div class="bg-white w-full h-full flex-1 flex items-center justify-center flex-1">
            <AppImage
              class="h-38.5"
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
        <div v-if="item?.photos_videos_gallery && item?.photos_gallery_promo_image?.image" class="relative col-span-3 flex flex-col gap-5" @click.stop="openGallery(item?.photos_videos_gallery?.media_item)">
          <div class="absolute top-6 right-6">
            <button class="bg-black rounded-full p-2 h-8 w-8 flex items-center justify-center"><ExpandIcon class="w-full" /></button>
          </div>

          <AppImage
            class="w-full flex-1 max-h-83.5 object-fit"
            :image="item?.photos_gallery_promo_image?.image"
            :image-type="WPImageType.oneFourthScreen"
            is-lazy-loading="true"
          />

          <button class="flex gap-2 items-center uppercase hover:underline transition-all">
            <span class="font-medium">PHOTOS & VIDEOS</span>
            <NuxtImg src="/svg/arrow-right.svg" class="w-3.5" loading="lazy" alt="Arrow right icon" />
          </button>
        </div>
        <div />
        <div class="col-start-8 col-span-4">
          <div class="mb-6">
            <h6 class="uppercase text-7 mb-3">APARTMENT: {{ item.property_id }}</h6>

            <p class="text-4.5 flex">
              <span>{{ item.building }} Building</span>
              <span class="mx-4">|</span>
    
              <NuxtImg src="/svg/bed.svg" class="w-4 mr-2" loading="lazy" alt="Bed icon" />
              <span class="mr-3">{{ item.bedrooms }}</span>
              <NuxtImg src="/svg/bath.svg" class="w-4 mr-2" loading="lazy" alt="Bath icon" />
              <span>{{ item.bathrooms }}</span>
            </p>
          </div>
          
          <div class="py-5 border-y border-light_gray mb-4 [&>p]:m-0 [&>p]:text-4.5">
            <p><span class="font-medium">Size:</span> {{ item.size }}</p>
            <p><span class="font-medium">Level:</span> {{ item.level }}</p>
            <p><span class="font-medium">View:</span> {{ item.view }}</p>
            <p v-if="item.move_in"><span class="font-medium">Move in:</span> {{ item.move_in }}</p>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-3.5 inline-flex items-center">Price: <span class="ml-3 text-6 font-medium">{{ item.price }}</span></span>

            <div class="flex gap-5 items-center">
              <a v-if="item?.pdf?.url" :href="item.pdf.url" target="_blank" class="underline">Download PDF</a>
              <AppButton color="black" text="REQUEST VIEWING" route="/register" />
            </div>
          </div>
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

  const closeModal = () => {
    isGalleryActive.value = false
    gallery.value = []
  }
</script>

<style lang="scss" scoped>
  .grid-cols-custom {
    grid-template-columns: repeat(5, 1fr) minmax(200px, 1fr) repeat(2, 1fr);
  }

  .arrow {
    transition: transform 0.3s;
  }

  .open {
    .arrow {
      transform: rotate(-180deg);
    }
  }
</style>