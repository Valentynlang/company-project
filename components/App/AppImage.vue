<template>
  <NuxtImg
    v-if="image && imageSrc"
    :src="imageSrc"
    :loading="loading"
    :alt="image?.alt ? image.alt : 'Image'"
    :title="image?.alt ? image.alt : 'Image'"
    :class="[
      !loadImmediately ? 'lazyLoad' : '',
      loadingImage ? 'isLoading' : loaded ? 'isLoaded' : '']"
    @load="onLoad"
    @error="onError"
  />
</template>

<script setup lang="ts">
  import { ref, onBeforeMount, onBeforeUnmount, computed } from 'vue'

  import {WPImageType} from "~/types/enums/wp-image-type";

  const props = defineProps({
    image: {
      type: Object,
      default: () => {}
    },
    imageType: {
      type: String,
      default: ''
    },
    isLazyLoading: {
      type: String,
      default: ''
    },
    loadImmediately: {
      type: Boolean,
      default: false
    },
  })

  const imageSrc = ref('');
  const loadingImage = ref(true)
  const loaded = ref(false)

  const onLoad = () => {
    loadingImage.value = false
    loaded.value = true
  }

  const onError = () => {
    loadingImage.value = false
    loaded.value = false
  }

  const loading = computed(() => props.isLazyLoading ? 'lazy' : 'eager');

  function getImageSrc() {
    if (!props.image) {
      return;
    }

    const defaultSrc = props.image.link;
    const { sizes } = props.image;

    if (!sizes) {
      return defaultSrc;
    }

    const isMobile = window.innerWidth <= 700;
    const isDesktop = window.innerWidth > 700;

    if (isDesktop) {
      const sizesDesktop: {[key: string]: string} = {
        [WPImageType.fullScreen]: sizes['2048x2048'] || defaultSrc,
        [WPImageType.halfScreen]: sizes.large,
        [WPImageType.oneFourthScreen]: sizes.medium_large,
      };

      return sizesDesktop[props.imageType];
    }

    if (isMobile) {
      const sizesMobile: {[key: string]: string} = {
        [WPImageType.fullScreen]: sizes.large,
        [WPImageType.halfScreen]: sizes.medium_large,
        [WPImageType.oneFourthScreen]: sizes.medium_large,
      };

      return sizesMobile[props.imageType];
    }
  }

  const onResize = () => {
    if (!props.image) {
      return;
    }

    imageSrc.value = getImageSrc();
  }

  onBeforeMount(() => {
    imageSrc.value = getImageSrc()
    
    window.addEventListener('resize', onResize)
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
</script>