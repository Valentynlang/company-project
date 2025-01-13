<template>
  <div ref="quincyFloorplanItem" class="QuincyFloorplanItem flex flex-col gap-5 cursor-pointer" @click="openFloorplan()">
    <div class="overflow-hidden">
      <AppImage
        is-lazy-loading="true"
        :image="floorplan?.img?.image"
        :imageType="WPImageType.oneFourthScreen"
        class="w-full object-cover"
      />
    </div>

    <div class="flex justify-between items-start flex-col gap-5 md:gap-2 items-center">
      <div class="text-center">
        <h6 class="text-4.5 font-medium line-clamp-3 text-black uppercase leading-normal whitespace-normal">{{ floorplan?.type }}</h6>
        <span>{{ floorplan?.internal_area }}</span>
      </div>

      <button class="QuincyFloorplanItem__button hidden md:block w-fit flex items-center gap-3 uppercase text-3.5 px-3 py-1.5 border rounded-full"><ArrowIcon class="w-4" /></button>
      <span class="block uppercase underline text-3.5 block md:hidden">more info</span>
    </div>
  </div>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-right.svg'
  import gsap from 'gsap';
  import { onMounted, nextTick } from 'vue'
  import ScrollTrigger from 'gsap/ScrollTrigger';
  
  const props = defineProps({
    floorplan: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0,
    },
  })

  import { WPImageType } from '~/types/enums/wp-image-type'

  const emit = defineEmits(['open-floorplan'])

  const quincyFloorplanItem = ref(null);

  const animateComponent = () => {
    if (quincyFloorplanItem.value) {
      gsap.fromTo(
        quincyFloorplanItem.value,
        {
          y: 50,
          opacity: 0
        },
        {
          delay: 0.3,
          duration: 1,
          y: 0,
          opacity: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: quincyFloorplanItem.value,
            start: 'top bottom'
            }
        }  
      );
    }
  }

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()
    
    animateComponent()
  })

  const openFloorplan = () => {
    emit('open-floorplan', props.index)
  }
</script>

<style lang="scss" scoped>
  .QuincyFloorplanItem {
    
    img {
      transform: scale(1);
      transition: all .5s ease;
    }

    &__button {
      transition: all .5s ease;
    }

    &:hover {
      .QuincyFloorplanItem__button {
        color: var(--white);
        background: var(--black);
      }

      img {
        transform: scale(1.1);
      }
    }
  }
</style>