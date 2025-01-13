<template>
  <template v-if="isDesktop">
    <section
      ref="section"
      class="grid grid-cols-2 gap-40 px-5 md:px-10"
      :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
    >
      <div class="h-full relative">
        <div ref="stickyElement" class="relative md:sticky">
          <div class="py-5 text-left">
            <div class="max-w-150">
              <span class="uppercase text-3 font-medium">{{ data.subtitle }}</span>
              <h3 class="text-16 font-secondary m-0 mb-7 mt-2">{{ data.title }}</h3>
              <p class="text-4.5" v-html="data.text" />
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div>
          <AppImage
           class="w-full h-full object-cover mb-10"
           :image="data.image_1.image"
           :image-type="WPImageType.fullScreen"
           is-lazy-loading="true"
          />
        </div>
        <div>
          <AppImage
           class="w-full h-full object-cover mb-10"
           :image="data.image_2.image"
           :image-type="WPImageType.fullScreen"
           is-lazy-loading="true"
          />
        </div>
        <div>
          <AppImage
           class="w-full h-full object-cover mb-10"
           :image="data.image_3.image"
           :image-type="WPImageType.fullScreen"
           is-lazy-loading="true"
          />
        </div>
        <div ref="endElement"/>
      </div>
    </section>
  </template>

  <template v-else>
    <section
      ref="section"
      class="px-5 md:px-10 flex flex-col gap-12"
      :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
    >
      <div>
        <span class="uppercase text-3 font-medium">{{ data.subtitle }}</span>
        <h3 class="text-8 font-secondary m-0 mt-3">{{ data.title }}</h3>
      </div>

      <div class="overflow-y-scroll flex">
        <div>
          <AppImage
           class="max-w-60 h-full object-cover mr-7 aspect-[4/5]"
           :image="data.image_1.imagemob"
           :image-type="WPImageType.fullScreen"
           is-lazy-loading="true"
          />
        </div>
        <div>
          <AppImage
           class="max-w-60 max-h-50 object-cover mr-7 aspect-[3/2]"
           :image="data.image_2.imagemob"
           :image-type="WPImageType.fullScreen"
           is-lazy-loading="true"
          />
        </div>
        <div>
          <AppImage
           class="max-w-60 max-h-50 object-cover aspect-[3/2]"
           :image="data.image_3.imagemob"
           :image-type="WPImageType.fullScreen"
           is-lazy-loading="true"
          />
        </div>
      </div>

      <div>
        <p class="text-4.5" v-html="data.text" />
      </div>
    </section>
  </template>
</template>
  
<script setup>
  import {gsap} from "gsap";
  import {onMounted, ref, onBeforeUnmount, nextTick} from 'vue'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { WPImageType } from '~/types/enums/wp-image-type'

  defineProps({
    data: {
      type: Object,
      default: () => {}
    },
    paddings: {
      type: Object,
      default: () => {}
    },
  })
  
  const stickyElement = ref(null)
  const endElement = ref(null)
  
  const section = ref(null)
  const isDesktop = ref(false)
  
  const onResize = async () => {
    isDesktop.value = window.innerWidth >= 768
  
    const stickyTrigger = ScrollTrigger.getById('stickyTrigger')
    if (stickyTrigger) {
      stickyTrigger.kill()
    }
  
    if (isDesktop.value) {
      gsap.registerPlugin(ScrollTrigger)

      await nextTick()

      const waitForImages = new Promise((resolve) => {
        const images = section.value.querySelectorAll('img')
        let loadedImages = 0
        images.forEach((img) => {
          if (img.complete) {
            loadedImages++
          } else {
            img.addEventListener('load', () => {
              loadedImages++
              if (loadedImages === images.length) resolve()
            })
            img.addEventListener('error', () => {
              loadedImages++
              if (loadedImages === images.length) resolve()
            })
          }
        })
        if (loadedImages === images.length) resolve()
      })

      await waitForImages

      gsap.set(stickyElement.value, { clearProps: "all" })

      const stickyHeight = stickyElement?.value?.offsetHeight;

      gsap.to(stickyElement.value, {
        scrollTrigger: {
          trigger: stickyElement.value,
          start: "top top",
          endTrigger: endElement.value,
          end: () => `top-=${stickyHeight} top`,
          pin: true,
          pinSpacing: false,
          id: 'stickyTrigger',
        }
      })
    }
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
    onResize()
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
  
  </script>
  