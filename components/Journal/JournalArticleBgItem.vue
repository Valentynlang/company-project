<template>
  <div ref="journalArticleBgItemContainer">
    <AppLink :to="`/journal/${article.slug}`" class="JournalArticleBgItem  cursor-pointer">
    <div class="overflow-hidden">
      <AppImage
        is-lazy-loading="true"
        :image="article?.acf?.promo_image?.image"
        :imageType="WPImageType.halfScreen"
        class="aspect-[9/10] w-full object-cover"
        :class="{ 'aspect-[4/5] md:aspect-[16/9]': size === 'full' }"
        />
    </div>

    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
  
    <div class="absolute bottom-0 left-0 flex flex-col gap-5 z-10 text-white p-8">
      <div v-if="article?.journal_category?.length || article?.acf?.date" class="[&>span]:text-3.5 flex">
        <template v-if="article.acf.date">
          <span class="uppercase">{{ article.acf.date }}</span>
          <span class="mx-2">·</span>
        </template>

        <span
          v-for="item in appStore.categories.filter(item => article.journal_category.includes(item.id))"
          :key="item.id"
          v-html="item.name"
          class="[&:not(:last-of-type)]:mr-1 uppercase"
        />
      </div>
  
      <h6
        class="text-6 font-bold uppercase leading-normal whitespace-normal"
        :class="{ 'text-4.5 md:text-16 leading-none': size === 'full' }"
      >
        {{ article.acf.promotitle ? article.acf.promotitle : article.title.rendered }}
      </h6>
  
      <span class="w-fit flex items-center gap-3 uppercase text-3.5"><span class="JournalArticleBgItem__link relative">{{ article.acf.rmlinklabel }}</span> <ArrowIcon class="w-4" /></span>
    </div>
  </AppLink>
  </div>
  
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import ArrowIcon from '@/public/svg/arrow-right.svg'
  import {WPImageType} from '~/types/enums/wp-image-type'
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger'
  
  defineProps({
    article: {
      type: Object,
      default: () => {}
    },
    size: {
      type: String,
      default: 'default',
      validator (value) {
				return ['default', 'full'].includes(value)
			},
    }
  })

  const appStore = useAppStore()
  const journalArticleBgItemContainer = ref(null);

  const animateComponent = () => {
    if (journalArticleBgItemContainer.value) {
      gsap.fromTo(
        journalArticleBgItemContainer.value,
        { y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: journalArticleBgItemContainer.value,
            start: 'top bottom',
          }
        }
      )
    }
  }
  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    animateComponent()
  })
  
</script>

<style lang="scss" scoped>
  .JournalArticleBgItem {
    
    img {
      transform: scale(1);
      transition: all .5s ease;
    }

    &__link {
      &::before {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        height: 1px;
        width: 0;
        background: white;
        transition: width .5s ease;
      }
    }

    &:hover {
      img {
        transform: scale(1.1);
      }

      .JournalArticleBgItem__link {
        &::before {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 1px;
          width: 100%;
          background: white;
        }
      }
    }
  }
</style>