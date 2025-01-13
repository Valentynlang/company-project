<template>
  <section
    class="hd_clamp flex flex-col gap-3 px-5 md:px-10 md:grid md:grid-cols-12"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
  >
    <div class="col-start-2 col-end-12 h-full">
      <vimeo-player class="dymanic-video" :video-id="video.vimeo_vimeo" />
    </div>
    <div v-if="video.vimeo_caption" class="col-start-1 col-end-13 flex justify-center"><span class="text-3.5 md:text-4.5 text-black">{{ video.vimeo_caption }}</span></div>
  </section>
</template>

<script lang="ts" setup>
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

<style lang="scss">
  .dymanic-video {
    iframe {
      aspect-ratio: 16 / 9;
      width: 100%;
      height: auto;
    }
  }
</style>
