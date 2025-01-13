<template>
  <section
    class="DynamicFullScreenVideoAnimated h-screen-w md:h-screen bg-white overflow-hidden vimeo-video relative md:m-10"
  >
    <template v-if="video.type === 'image'">
      <div class="DynamicFullScreenVideoAnimated__wrapper">
        <AppImage
          is-lazy-loading="true"
          :image="responsiveImage(video.image.image, video.image.imagemob)"
          :imageType="WPImageType.fullScreen"
          class="img-bg"
        />
      </div>
    </template>
    <template v-else>
      <AppImage
        is-lazy-loading="true"
        v-if="video.fallback.image"
        :image="video.fallback.image"
        :imageType="WPImageType.fullScreen"
        class="img-bg"
      />
      <ClientOnly>
        <iframe
          :src="`https://player.vimeo.com/video/${video.vimeo}?dnt=1&background=1&controls=0&autoplay=1&muted=1&loop=1`"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          allow="autoplay; fullscreen"
        ></iframe>
      </ClientOnly>
    </template>

    <div class="overlay"></div>

    <h3 v-if="video.title" class="absolute left-1/2 top-1/2 w-full px-5 md:px-10 text-white font-secondary text-9 md:text-20 text-center -translate-x-1/2 -translate-y-1/2">{{ video.title }}</h3>
  </section>
</template>

<script setup>
  import { WPImageType } from '~/types/enums/wp-image-type'

  const { responsiveImage } = useResponsiveImage()

  defineProps({
    video: {
      type: Object,
      default: () => {}
    },
    paddings: {
      type: Object,
      default: () => {}
    },
  })
</script>

<style lang="scss" scoped>
  .DynamicFullScreenVideoAnimated {
    &__wrapper {
      height: calc(100vh - 5rem);
    }
  
    iframe {
      pointer-events: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: max(101vw, 178vh);
      height: max(101vh, 57vw);

      @media (max-width: $phone) {
        width: 238vw;
        height: 134vw;
      }
    }
  
    .overlay {
      opacity: 0.5;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.00) 69.4%, rgba(0, 0, 0, 0.55) 118.02%), rgba(23, 21, 21, 0.20);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
</style>