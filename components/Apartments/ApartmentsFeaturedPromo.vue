<template>
  <section
    class="ApartmentsFeaturedPromo flex flex-col px-5 md:px-10 items-center bg-beige md:m-10"
    :class="[paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '' ]"
  >
    <div class="mb-17.5" ref="apartmentsFeaturedPromoImageSection"> 
      <AppImage
        is-lazy-loading="true"
        :image="data?.floorplan_image?.image"
        :imageType="WPImageType.fullScreen"
        class="w-auto h-40 md:h-64"
      />
    </div >

      <div ref="apartmentsFeaturedPromoTextSection" class="flex flex-col items-center">
        <div class="w-full md:grid md:grid-cols-12 md:gap-10">
          <div class="col-start-3 col-end-11 text-center" v-html="data.html_content"></div>
        </div>

        <div v-if="data?.button?.label" class="mt-10">
          <AppButton :text="data?.button?.label" :route="routeLink" color="black" :target="data?.button?.external ? '_blank' : '_self'" />
        </div>
    </div>
  </section>
</template>

<script setup>
  import { WPImageType } from '~/types/enums/wp-image-type'
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  import { ref, onMounted, nextTick } from 'vue'

  const props = defineProps({
    data: {
      type: Object,
      default: () => {}
    },
    paddings: {
      type: Object,
      default: () => {}
    },
  })

  const { routeLink } = useRouteLink(props?.data?.button)

  const apartmentsFeaturedPromoTextSection = ref(null);
  const apartmentsFeaturedPromoImageSection = ref(null);

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    gsap.fromTo(
      apartmentsFeaturedPromoTextSection.value,
      {
        y: 50,
        opacity: 0
      },
      {
        delay: 0.1,
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: apartmentsFeaturedPromoTextSection.value,
          start: 'top bottom'
        }
      }  
    );
    
    gsap.fromTo(
      apartmentsFeaturedPromoImageSection.value,
      {
        y: 0,
        opacity: 0
      },
      {
        delay: 0.3,
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: apartmentsFeaturedPromoImageSection.value,
          start: 'top bottom'
        }
      }  
    );
  });
</script>

<style lang="scss">
  .ApartmentsFeaturedPromo {
    p {
      font-size: 4rem;
      line-height: 110%;
      color: var(--black);
      font-family: var(--font-secondary);

      a {
        position: relative;
        line-height: 1;

        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--black);
        }
      }

      @media (max-width: $phone) {
        font-size: 1.75rem;
      }
    }
  }
</style>