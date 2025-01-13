<template>
  <section class="pb-28 bg-white">
    <div class="FeaturedHomesProperties__text px-5 md:px-10 mb-7 md:mb-8 text-center md:text-left" v-html="intro" />

    <FeaturedHomesPropertiesTable :properties="properties" />
  </section>
</template>

<script lang="ts" setup>
  defineProps({
    intro: {
      type: String,
      default: ''
    },
    properties: {
      type: Array,
      default: () => []
    }
  })
</script>

<style lang="scss">
  .FeaturedHomesProperties {
    &__text {
      a {
        text-decoration: underline;
        font-weight: 500;
      }
    }
  }
</style>