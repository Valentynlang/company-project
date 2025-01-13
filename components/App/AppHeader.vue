<template>
  <header
    class="fixed top-0 flex bg-transparent items-center justify-between py-5 px-5 md:px-10 w-full z-20 gap-16 transition-all ease-in duration-500"
    :class="{ '!bg-white': !appStore.isMenuActive && (appStore.isInitHeaderDark || appStore.isMiniHeader) }"
    ref="header"
  >
    <div>
      <AppLink to="/">
        <NuxtImg v-if="appStore.isMiniHeader && !appStore.isMenuActive" src="/svg/logo-mini.svg" class="min-h-10" loading="lazy" alt="The Brentford Logo" />
        <NuxtImg v-else-if="appStore.isInitHeaderDark && !appStore.isMenuActive" src="/svg/logo-dark.svg" class="min-h-20" loading="lazy" alt="The Brentford Logo" />
        <NuxtImg v-else src="/svg/logo-white.svg" class="min-h-20" loading="lazy" alt="The Brentford Logo" />
      </AppLink>
    </div>

    <div class="flex items-center">
      <AppNav class="hidden md:block md:mr-10" />
      <AppButton
        class="mr-5 md:mr-6"
        text="Get in Touch"
        :color="appStore.isMiniHeader || appStore.isInitHeaderDark ? 'black' : 'white'"
        route="/register"
      />
      <AppBurgerMenu />
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const route = useRoute()
const appStore = useAppStore()

const header = ref(null)
let previousScrollY = window?.scrollY
let ticking = false

const handleScroll = () => {
  const currentScrollY = window?.scrollY
  
  if (currentScrollY <= 0) {
    previousScrollY = 0
  }

  if (currentScrollY < 100) {
    appStore.isInitHeaderDark ? appStore.setDarkHeader() : appStore.setLightHeader()
  } else {
    appStore.setMiniHeader()
  }

  if (currentScrollY <= previousScrollY) {
    header.value.style.transform = 'translateY(0)'
  } else {
    header.value.style.transform = 'translateY(-100%)'
  }

  previousScrollY = currentScrollY
  ticking = false
}

const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll)
    ticking = true
  }
}

const initializeHeader = () => {
  window.addEventListener('scroll', onScroll)
  handleScroll()
}

const cleanupHeader = () => {
  window.removeEventListener('scroll', onScroll)
}

watch(
  () => route.fullPath,
  () => {
    cleanupHeader()
    initializeHeader()
  }
)

onMounted(() => {
  appStore.setInitHeader(appStore.isDarkHeader)
  initializeHeader()
})

onBeforeUnmount(() => {
  cleanupHeader()
})
</script>
