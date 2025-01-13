<template>
  <button ref="menu-button" class="w-10 h-10" @click="toggleMenu()">
    <BurgerIcon
      v-if="!appStore.isMenuActive"
      class="w-full text-white"
      :class="{ '!text-black': appStore.isMiniHeader || appStore.isDarkHeader }"
    />
    <CloseIcon v-else class="text-white w-5 h-5" />
  </button>

    <Teleport to="body">
      <AppMenu v-if="appStore.isMenuActive" />
    </Teleport>
</template>

<script setup>
  import BurgerIcon from '@/public/svg/burger.svg'
  import CloseIcon from '@/public/svg/close.svg'

  import gsap from 'gsap'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

  const appStore = useAppStore()

  const toggleMenu = () => {
    const height = window?.innerHeight

    if (!appStore.isMenuActive) {
      appStore.toggleMenu()

      document?.body?.classList?.add('no-scroll')

      gsap.to(window, { duration: 0, scrollTo: 0 });

      gsap.fromTo(
        "#menu",
        { yPercent: `-${height}` },
        { yPercent: 0, duration: 1, ease: "power4.inOut" }
      )

      gsap.fromTo(
        "main",
        { y: `-${height}` },
        { y: 0, duration: 1, ease: "power4.inOut" }
      )
    } else {
      gsap.fromTo(
        "#menu",
        { yPercent: 0,},
        { yPercent: -100, duration: 1, ease: "power4.inOut"}
      )
      gsap.fromTo(
        "main",
        { y: 0 },
        { y: `-${height}`, duration: 1, ease: "power4.inOut", onComplete: () => {
          appStore.toggleMenu()
          document?.body?.classList?.remove('no-scroll')
          gsap.set('main', { y: 0 })
        }}
      )
    }
  }

  onBeforeMount(() => {
    gsap.registerPlugin(ScrollToPlugin)
  })
</script>

<style>

</style>