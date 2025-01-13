<template>
  <nav class="overflow-hidden">
    <ul
      class="nav-list flex gap-10"
      :class="{ 'nav-list': appStore.isMenuActive}"
    >
      <li
        v-for="link in links"
      >
        <AppLink
          :to="link.path"
          class="text-white text-4.5 relative leading-loose"
          :class="[
            { '!text-black link-black': appStore.isMiniHeader || appStore.isDarkHeader },
            { 'link-white': !appStore.isMiniHeader && !appStore.isDarkHeader },
            { 'link-black--active': route.path.includes(link.path) && (appStore.isMiniHeader || appStore.isDarkHeader) },
            { 'link-white--active': route.path.includes(link.path) && !appStore.isMiniHeader && !appStore.isDarkHeader }
          ]"
        >
          {{ link.name }}
        </AppLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'

  import gsap from 'gsap'

  const appStore = useAppStore()

  const links = ref([
    {
      id: 1,
      path: '/apartments',
      name: 'Apartments',
    },
    {
      id: 2,
      path: '/quincy-house',
      name: 'Quincy House',
    },
    {
      id: 3,
      path: '/residents-club',
      name: 'Residents\' Club',
    },
    {
      id: 4,
      path: '/neighbourhood',
      name: 'Neighbourhood',
    },
     /*{
         id: 5,
         path: '/location',
         name: 'Location',
       },*/
       {
         id: 6,
         path: '/journal',
         name: 'Journal',
       },
  ])

  const route = useRoute()

  const anim = ref(null)
  const isActive = computed(() => appStore.isMenuActive);

  onMounted(() => {
    anim.value = gsap.from(
      ".nav-list",
      { yPercent: -100, duration: .5, autoAlpha: 0, ease: "power4.inOut" }
    )
  })

  watch(isActive, (newValue) => {
    newValue ? anim.value.reverse() : anim.value.play()
  });
</script>

<style lang="scss" scoped>
  .link-white {
    display: block;
    &::before {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0;
      height: 1px;
      width: 0;
      background: white;
      transition: width .3s ease;
    }
  }

  .link-white--active, .link-white:hover {
    &::before {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0;
      height: 1px;
      width: 100%;
      background: white;
    }
  }

  .link-black {
    display: block;
    &::before {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0;
      height: 1px;
      width: 0;
      background: black;
      transition: width .3s ease;
    }
  }

  .link-black--active, .link-black:hover {
    &::before {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0;
      height: 1px;
      width: 100%;
      background: black;
    }
  }
</style>