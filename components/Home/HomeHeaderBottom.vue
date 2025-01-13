<template>
  <div class="HomeHeaderBottom grid md:grid-cols-10 grid-cols-1 mb-30">
    <div ref="blockValue" class="hidden md:flex items-end justify-start gap-16 md:col-span-6 px-10 opacity-0">
      <AppLink to="/quincy-house" ref="imageBlock" class="HomeHeaderBottom__link relative basis-3/6 min-h-100">
        <AppImage
          class="img-bg w-full h-full object-cover"
          :image="data.promo_image.image"
          :image-type="WPImageType.oneFourthScreen"
        />
        <p class="text-4 font-medium uppercase absolute bottom-2 left-2 text-white p-1">{{ data.promo_image_text_overlay }}</p>
      </AppLink>
      <div ref="textBlock" class="md:max-w-96 w-full opacity-0">
        <h1 class="text-7 md:text-10 uppercase font-bold md:text-left text-center">
          {{ data.promo_title }}
        </h1>
        <p class="text-4.5">{{ data.promo_text }}</p>
        <AppButton :text="data?.promo_button?.label" :route="routeLink" color="black" :target="data?.promo_button?.external ? '_blank' : '_self'" class="mt-5"  />
      </div>
    </div>

    <div class="md:hidden flex flex-col items-center gap-4 mt-10 px-5">
      <h1 class="text-9 uppercase font-bold text-center">
        {{ data.promo_title }}
      </h1>
      <AppImage
        class="w-full h-full object-cover"
        :image="data.promo_image.image"
        :image-type="WPImageType.halfScreen"
      />
      <span class="mb-4 mt-7 text-4 px-15 font-medium text-center uppercase">{{ data.promo_image_text_overlay }}</span>
      <p class="text-center text-4.5">{{ data.promo_text }}</p>
      <div>
        <AppButton :text="data?.promo_button?.label" :route="routeLink" color="black" :target="data?.promo_button?.external ? '_blank' : '_self'" class="mt-5"  />
      </div>
    </div>
  </div>
</template>

<script setup>
import { WPImageType } from '~/types/enums/wp-image-type'
import gsap from 'gsap'
import { ref, onMounted } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const { routeLink } = useRouteLink(props?.data?.promo_button)

const blockValue = ref(null)
const imageBlock = ref(null)
const textBlock = ref(null)

onMounted(() => {
  const startAnimation = () => {
    gsap.fromTo(blockValue.value,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.5,
        ease: 'power3.inOut',
      }
    )

    gsap.fromTo(textBlock.value,
      {
        x: '50px',
        opacity: 0,
      },
      {
        x: '0%',
        opacity: 1,
        delay: 0.2,
        duration: 1.5,
        ease: 'power3.inOut',
      }
    )
  }

  window.addEventListener('headerTopAnimationComplete', startAnimation)
})
</script>

<style lang="scss" scoped>
  .HomeHeaderBottom {
    &__link {
      background: #000;
      overflow: hidden;

      img {
        opacity: 1;
        transform: scale(1);
        transition: all .5s ease;
      }

      &:hover {
        img {
          transform: scale(1.1);
          opacity: .6;
        }
      }
    }
  }
</style>