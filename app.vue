<template>
  <AppLoading v-if="loading" />

  <NuxtLayout>   
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  import { ref } from 'vue'
  import { onBeforeRouteLeave } from 'vue-router'

  const nuxtApp = useNuxtApp()
  const loading = ref(false)

  nuxtApp.hook("page:start", () => {
    loading.value = true;
  })

  nuxtApp.hook("page:finish", () => {
    if(document.readyState === 'ready' || document.readyState === 'complete') {
      loading.value = false
    } else {
      document.onreadystatechange = function () {
        if (document.readyState == "complete") {
          loading.value = false
        }
      }
    }
  })

  onBeforeRouteLeave(() => {
    if (process.client) {
      window.scrollTo(0, 0)
    }
  })
</script>

<style lang="scss">
  #app {
    min-height: 100vh;
  }
</style>