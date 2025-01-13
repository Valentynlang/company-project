<template>
  <button
    class="max-h-10 text-4.5 uppercase py-2 px-4 whitespace-nowrap border rounded-full transition-all"
    :class="[
      isOposite ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-black hover:text-white',
      { '!bg-black !text-white hover:!bg-white hover:!text-black': activeCategory === item.id && !isOposite},
      { '!bg-white !text-black hover:!bg-black hover:!text-white': activeCategory === item.id && isOposite},
    ]"
    @click="selectCategory()"
  >
    <span v-html="item.name" class="mr-1" />

    <sup>{{ item.count }}</sup>
  </button>
</template>

<script setup>
  const props = defineProps({
    item: {
      type: Object,
      default: () => {}
    },
    activeCategory: {
      type: Number,
      default: 0
    },
    isOposite: {
      type: Boolean,
      default: false
    },
  })

  const emit  = defineEmits(['selectCategory'])

  const selectCategory = () => {
    emit('selectCategory', props.item.id)
  }
</script>

<style>

</style>