<template>
  <div class="px-10">
    <div class="grid gap-14 grid-cols-custom border-b border-light_gray py-5">
      <div
        v-for="item in head"
        :key="item.id"
      >
        <span class="uppercase font-medium tracking-tight">{{ item.name }}</span>
      </div>
    </div>

    <div>
      <FeaturedHomesPropertiesTableRow
        v-for="(item, id) in properties"
        :key="id"
        :item="item.acf"
        :id="id"
        :is-open="activeIndex === id"
        @toggle="toggleDetails"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  defineProps({
    properties: {
      type: Array,
      default: () => []
    }
  })

  const head = ref([
    {
      id: 1,
      name: 'Floor plan',
    },
    {
      id: 2,
      name: 'Building',
    },
    {
      id: 3,
      name: 'Apartment',
    },
    {
      id: 4,
      name: 'Bedrooms',
    },
    {
      id: 5,
      name: 'Level',
    },
    {
      id: 6,
      name: 'Size',
    },
    {
      id: 7,
      name: 'Price',
    },
    {
      id: 8,
      name: 'MORE INFO',
    },
  ])

  const activeIndex = ref(null)

  const toggleDetails = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index
  }
</script>

<style lang="scss" scoped>
  .grid-cols-custom {
    grid-template-columns: repeat(5, 1fr) minmax(200px, 1fr) repeat(2, 1fr);
  }
</style>
