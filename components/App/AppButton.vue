<template>
  <button
    v-if="!route"
    class="rounded-full overflow-hidden relative inline-flex disabled:opacity-50 disabled:pointer-events-none px-[1px]"
    @mouseenter="hoverIn"
    @mouseleave="hoverOut"
  >
    <div
      ref="active"
      class="rounded-full w-full text-4"
      :class="[
        // color
        { 'border !text-white': color === 'transparent' },
        { '!bg-white !text-black': color === 'white' },
        { '!bg-black !text-white': color === 'black' },

        // size
        { 'py-3 px-6': size === 'default' },
        { 'py-2 px-4': size === 'small' },
        { 'py-3.5 px-8 text-4.5': size === 'large' },
      ]"
    >
      <div class="flex items-center justify-center">
        <span class="nowrap">
          {{ text }}
        </span>

        <NuxtImg v-if="icon" class="w-4" :class="{ 'ml-3': text }" :src="`/svg/${icon}.svg`" loading="lazy" :alt="`${icon} icon`" />
      </div>
  
    </div>
    <div
      ref="hover"
      class="bg-red text-white absolute top-full rounded-full w-full text-4"
      :class="[
        // size
        { 'py-3 px-6': size === 'default' },
        { 'py-2 px-4': size === 'small' },
        { 'py-3.5 px-8 text-4.5': size === 'large' },
      ]"
    >
      <div class="flex items-center justify-center">
        <span class="nowrap">
          {{ text }}
        </span>
        
        <NuxtImg v-if="icon" class="w-4" :class="{ 'ml-3': text }" :src="`/svg/${icon}.svg`" loading="lazy"  :alt="`${icon} icon`" />
      </div>
    </div>
  </button>
  <AppLink
    v-else
    :to="route"
    class="rounded-full overflow-hidden relative inline-flex px-[1px]"
    @mouseenter="hoverIn"
    @mouseleave="hoverOut"
  >
    <div
      ref="active"
      class="rounded-full w-full text-4"
      :class="[
        // color
        { 'border !text-white': color === 'transparent' },
        { '!bg-white !text-black': color === 'white' },
        { '!bg-black !text-white': color === 'black' },

        // size
        { 'py-3 px-6': size === 'default' },
        { 'py-2 px-4': size === 'small' },
        { 'py-3.5 px-8 text-4.5': size === 'large' },
      ]"
    >
      <div class="flex items-center justify-center">
        <span class="nowrap">
          {{ text }}
        </span>

        <NuxtImg v-if="icon" class="w-4" :class="{ 'ml-3': text }" :src="`/svg/${icon}.svg`" loading="lazy" :alt="`${icon} icon`" />
      </div>
  
    </div>
    <div
      ref="hover"
      class="bg-red text-white absolute top-full rounded-full w-full text-4"
      :class="[
        // size
        { 'py-3 px-6': size === 'default' },
        { 'py-2 px-4': size === 'small' },
        { 'py-3.5 px-8 text-4.5': size === 'large' },
      ]"
    >
      <div class="flex items-center justify-center">
        <span class="nowrap">
          {{ text }}
        </span>
        
        <NuxtImg v-if="icon" class="w-4" :class="{ 'ml-3': text }" :src="`/svg/${icon}.svg`" loading="lazy" :alt="`${icon} icon`" />
      </div>
    </div>
  </AppLink>
</template>

<script setup>
  import gsap from 'gsap'

  import { CustomEase } from 'gsap/dist/CustomEase'

  import { onMounted, ref } from 'vue'

  defineProps({
    route: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default',
			validator (value) {
				return ['default', 'small', 'large'].includes(value)
			},
    },
    color: {
      type: String,
      default: 'white',
			validator (value) {
				return ['white', 'black', 'transparent'].includes(value)
			},
    }
  })

  const active = ref(null)
  const hover = ref(null)

  onMounted(() => {
    gsap.registerPlugin(CustomEase)
    
    CustomEase.create(
      "button",
      "0.580, 0.005, 0.060, 1.000"
    )

    gsap.to(hover.value.firstChild, {
      yPercent: -50
    })
  })


  const hoverIn = () => {
    gsap.to(active.value, {
      yPercent: -50,
      autoAlpha: 0,
      duration: .5,
      ease: 'button'
    })

    gsap.to(hover.value, {
        yPercent: -100,
        duration: .5,
        ease: 'button'
    })

    gsap.to(hover.value.firstChild, {
        yPercent: 0,
        autoAlpha: 1,
        duration: .5,
        ease: 'button'
    })
  }

  const hoverOut = () => {
    gsap.to(active.value, {
        yPercent: 0,
        autoAlpha: 1,
        duration: .5,
        ease: 'button'
    }),
    gsap.to(hover.value, {
        yPercent: 0,
        duration: .5,
        ease: 'button'
    }),
    gsap.to(hover.value.firstChild, {
        yPercent: -50,
        autoAlpha: 0,
        duration: .5,
        ease: 'button'
    })
  }
</script>

<style>

</style>