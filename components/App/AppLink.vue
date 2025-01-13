<template>
  <NuxtLink :prefetch="prefetch" :to="computedLink"><slot /></NuxtLink>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    to: String,
    prefetch: Boolean
  })

  const route = useRoute()

  const params = ['gclid', 'fbclid']

  const decor = computed(() => {
    return params
      .filter((p) => route.query[p])
      .map((p) => `${p}=${route.query[p]}`)
      .join('&')
  })

  const sep = computed(() => {
    return decor.value.length ? (props.to.includes('?') ? '&' : '?') : ''
  })

  const computedLink = computed(() => {
    return props.to + sep.value + decor.value
  })
</script>
