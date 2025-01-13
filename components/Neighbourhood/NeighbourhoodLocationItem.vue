<template>
  <div class="NeighbourhoodLocationItem flex flex-col gap-4 md:gap-5">
    <span  v-for="(item, index) in categories" class="[&:not(:last-of-type)]:mr-1 uppercase" :key="item?.id">
      <span v-html="item.name"></span>
      <span v-if="index < categories.length - 1">, </span>
    </span>

    <div class="overflow-hidden">
      <AppImage
        is-lazy-loading="true"
        class="w-full object-cover"
        :style="`aspect-ratio: 4/5`"
        :image="isDesktop ? location.acf.image_dsk : location.acf.image_mob ? location.acf.image_mob : location.acf.image_dsk"
        :image-type="WPImageType.oneFourthScreen"
      />
    </div>

    <h6 class="text-4.5 line-clamp-3 text-black uppercase font-medium tracking-tight leading-normal whitespace-normal	">{{ location.acf.long_title }}</h6>
    <p>{{ location.acf.description }}</p>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import {WPImageType} from '~/types/enums/wp-image-type'

  const props = defineProps({
    location: {
      type: Object,
      default: () => {}
    },
    categories: {
      type: Object,
      default: () => []
    },
  })

  const { isDesktop } = useMediaQuery()

  const categories = computed(() => {
    return props.categories.filter(item => props.location.locations_category.includes(item.id))
  })
</script>

<style lang="scss" scoped>
  .NeighbourhoodLocationItem {

    img {
      transform: scale(1);
      transition: all .5s ease;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
</style>
