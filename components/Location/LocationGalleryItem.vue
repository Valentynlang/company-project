<template>
  <div class="LocationGalleryItem flex flex-col md:flex-row">
    <AppImage
      class="w-auto h-[17.5rem] md:h-[26.875rem] object-cover aspect-[1/1]"
      :image="item.image.image"
      :image-type="WPImageType.oneFourthScreen"
      is-lazy-loading="true"
    />
    <div class="basis-1/2 p-0 max-md:pt-6 md:ml-10">
      <div class="w-full h-full flex flex-col items-start justify-between">
        <div class="pb-14">
          <span class="text-20 md:text-31 font-secondary">{{ item.number }}</span><span class="font-secondary text-6">{{ item.text }}</span>
        </div>
        <div class="flex items-center justify-start w-full">
          <NuxtImg :src="`/svg/${item.icon}.svg`" class="mr-3 w-9" loading="lazy" :alt="`${item.icon} icon`" />
          <span class="mr-1">to</span><span class="uppercase font-medium">{{ item.destination }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {WPImageType} from '~/types/enums/wp-image-type'

  defineProps({
    item: {
      type: Object,
      default: () => {}
    }
  })
</script>

