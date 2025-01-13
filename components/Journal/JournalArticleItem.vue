<template>
  <div ref="articleItem">
    <AppLink class="JournalArticleItem w-full flex flex-col gap-4 md:gap-5 cursor-pointers" :to="`/journal/${article.slug}`">
    <div class="overflow-hidden">
      <AppImage
        is-lazy-loading="true"
        class="w-full object-cover"
        :style="`aspect-ratio: ${aspectRatio}`"
        :image="article?.acf?.promo_image?.image"
        :image-type="WPImageType.oneFourthScreen"
      />
    </div>

    <div class="[&>span]:text-3.5" v-if="article.acf.date || article.journal_category.length">
      <template v-if="article.acf.date">
        <span class="uppercase">{{ article.acf.date }}</span>
        <span class="mx-2">·</span>
      </template>
        <span  v-for="(item, index) in categories" class="[&:not(:last-of-type)]:mr-1 uppercase" :key="item?.id">
          <span v-html="item.name"></span>
          <span v-if="index < categories.length - 1">, </span>
        </span>
    </div>

    <h6 class="text-4.5 line-clamp-3 text-black uppercase font-medium tracking-tight leading-normal whitespace-normal	">{{ article.acf.promotitle ? article.acf.promotitle : article.title.rendered }}</h6>

    <span class="w-fit flex items-center gap-3 uppercase text-3.5"><span class="JournalArticleItem__link relative">{{ article.acf.rmlinklabel }}</span> <ArrowIcon class="w-4" /></span>
  </AppLink>
  </div>
  
</template>

<script setup>
  import { computed, onMounted, nextTick } from 'vue'
  import ArrowIcon from '@/public/svg/arrow-right.svg'
  import {WPImageType} from '~/types/enums/wp-image-type'
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger'

  const props = defineProps({
    article: {
      type: Object,
      default: () => {}
    },
    aspectRatio: {
      type: String,
      default: '4/5',
    }
  })

  const appStore = useAppStore()

  const articleItem = ref(null);

  const categories = computed(() => {
    return appStore.categories.filter(item => props.article.journal_category.includes(item.id))
  })


  const animateComponent = () => {
    if (articleItem.value) {
      gsap.fromTo(
        articleItem.value,
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
            trigger: articleItem.value,
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
</script>

<style lang="scss" scoped>
  .JournalArticleItem {

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
        background: black;
        transition: width .5s ease;
      }
    }

    &:hover {
      img {
        transform: scale(1.1);
      }

      .JournalArticleItem__link {
        &::before {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 1px;
          width: 100%;
          background: black;
        }
      }
    }
  }
</style>
