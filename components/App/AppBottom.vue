<template>
  <div
    class="relative pb-5 md:pb-10"
  >
    <transition name="fade">
      <AppImage
        v-show="activeItem === 1"
        class="absolute top-0 left-0 w-full h-full object-cover"
        :image="data.rollover_image_1.image"
        :image-type="WPImageType.fullScreen"
        preload
      />
    </transition>

    <transition name="fade">
      <AppImage
        v-show="activeItem === 2"
        class="absolute top-0 left-0 w-full h-full object-cover"
        :image="data.rollover_image_2.image"
        :image-type="WPImageType.fullScreen"
        preload
      />
    </transition>

    <div class="relative z-10">
      <div class="py-6 md:py-16 flex gap-30 md:gap-86 items-center flex-col justify-between">
        <span class="uppercase text-white text-4.5">up next</span>
  
        <div class="flex flex-col items-center gap-3 md:gap-6 [&>a]:text-12 md:[&>a]:text-31 [&>a]:leading-none [&>a]:font-bold [&>a]:uppercase [&>a]:text-white [&>a]:text-center [&>a]:transition-all">
          <a
            class="AppBottom__link w-fit"
            :class="[
              { 'opacity-100 AppBottom__link--active': activeItem === 1 },
              { 'opacity-50': activeItem !== 1 },
            ]"
            :href="defineLink(data.promo_1)"
            @mouseover="defineImage(data.rollover_image_1, 1)"
          >
            {{ data?.link_text_1 ? data.link_text_1 : 'Read more' }}
          </a>
          <a
            class="AppBottom__link hidden md:block w-fit"
            :class="[
              { 'opacity-100 AppBottom__link--active': activeItem === 2 },
              { 'opacity-50': activeItem !== 2 },
            ]"
            :href="defineLink(data.promo_2)"
            @mouseover="defineImage(data.rollover_image_2, 2)"
            @mouseleave="defineImage(data.rollover_image_1, 1)"
          >
            {{ data?.link_text_2 ? data.link_text_2 : 'Read more' }}
          </a>
          <p class="block md:hidden self-center text-white text-4.5 max-w-70 text-center">{{ activeItem === 1 ? data.summary_text_1 : data.summary_text_2 }}</p>
        </div>
  
        <div class="block md:hidden"></div>
        <p class="hidden md:block text-white text-4.5 max-w-70 text-center">{{ activeItem === 1 ? data.summary_text_1 : data.summary_text_2 }}</p>
      </div>

      <AppFooter class="!mb-10" :title="data.footer_text" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import {WPImageType} from '~/types/enums/wp-image-type'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})

const { isDesktop } = useMediaQuery()

const currentImage = ref('')
const activeItem = ref(1)
const previousImage = ref('')

const defineImage = (image, index) => {
  activeItem.value = index
  previousImage.value = currentImage.value // Save the previous image
  currentImage.value = isDesktop ? image.image.sizes?.large : image.image.sizes?.medium
}

const defineLink = (link) => {
  return link ? new URL(link).pathname : '#BAD_URL'
}

onMounted(() => {
  defineImage(props.data.rollover_image_1, 1)
})
</script>

<style lang="scss" scoped>
  .AppBottom {
    &__link {
      position: relative;

      @media (min-width: $phone) {
        &::before {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          height: 8px;
          width: 0;
          background: white;
          transition: width .3s ease;
        }
  
        &--active {
          &::before {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            height: 8px;
            width: 100%;
            background: white;
          }
        }
      }

    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.6s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>
