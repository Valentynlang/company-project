<template>
  <section class="pb-12.5 bg-white">
    <div class="FeaturedHomesPropertiesMobile__text px-5 mb-7 text-center" v-html="intro" />

    <div class="px-5">
      <FeaturedHomesPropertiesMobileItem
        v-for="(item, id) in properties"
        :key="id"
        :item="item.acf"
        :id="id"
        :is-open="activeIndex === id"
        @toggle="toggleDetails"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

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

  const activeIndex = ref(null)

  const toggleDetails = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index
  }
</script>

<style lang="scss">
  .FeaturedHomesPropertiesMobile {
    &__text {
      a {
        text-decoration: underline;
        font-weight: 500;
      }
    }
  }
</style>