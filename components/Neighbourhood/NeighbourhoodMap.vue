<template>
  <section
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
  >
    <NuxtImg src="/img/map.png" class="w-screen h-screen object-cover" loading="lazy" alt="Map" />
  </section>
</template>

<script lang="ts" setup>
  defineProps({
    paddings: {
      type: Object,
      default: () => {}
    },
  })
</script>

<style>

</style>