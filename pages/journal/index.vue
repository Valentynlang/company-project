<template>
  <main class="flex flex-col gap-10 md:gap-26 mb-10 md:mb-20">
    <JournalPromo :categories="allCategories" @selectCategory="selectCategory" :activeCategory="activeCategory" />
    <template v-if="activeCategory === 0">
      <JournalTripleImage v-if="firstBatchArr.length" :articles="firstBatchArr" />

      <section v-if="secondBatchArr.length" class="hd_clamp px-5 md:px-10 gap-5 md:gap-10 flex flex-col gap-5 md:grid md:grid-cols-12">
        <JournalArticleItem
          v-for="article in secondBatchArr"
          :key="article.id"
          :article="article"
          :aspectRatio="isDesktop ? '4/5' : '16/9'"
          class="md:col-span-4"
        />
      </section>

      <JournalTripleImage v-if="thirdBatchArr.length" :articles="thirdBatchArr" direction="reverse" />

      <section v-if="fullscreenArr.length">
        <JournalArticleBgItem :article="fullscreenArr[0]" size="full" />
      </section>

        <section v-if="fourthBatchArr.length" class="hd_clamp px-5 md:px-10 gap-5 md:gap-10 flex flex-col gap-5 md:grid md:grid-cols-12">
          <JournalArticleItem
            v-for="article in fourthBatchArr"
            :key="article.id"
            :article="article"
            :aspectRatio="isDesktop ? '4/5' : '16/9'"
            class="md:col-span-3"
          />
        </section>

        <section v-if="fullscreenArr.length && fullscreenArr[1]">
          <JournalArticleBgItem :article="fullscreenArr[1]" size="full" />
        </section>

      <section v-if="viewMoreArrPaginate.length" class="hd_clamp px-5 md:px-10 gap-5 md:gap-10 grid grid-cols-2 md:grid-cols-12">
        <JournalArticleItem
          v-for="article in viewMoreArrPaginate"
          :key="article.id"
          :article="article"
          class="col-span-1 md:col-span-3"
        />

        <div class="col-span-2 md:col-span-12 flex justify-center mb-16 md:mb-26">
          <AppButton text="VIEW MORE STORIES" color="black" :disabled="viewMoreArrPaginate.length >= viewMoreArr.length" @click="loadMore()" />
        </div>
      </section>
    </template>
    <template v-else>
      <section class="hd_clamp px-5 md:px-10 gap-5 md:gap-10 grid grid-cols-2 md:grid-cols-12">
        <JournalArticleItem
          v-for="article in categoryViewMoreArr"
          :key="article.id"
          :article="article"
          class="col-span-1 md:col-span-3"
        />

        <div class="col-span-2 md:col-span-12 flex justify-center mb-16 md:mb-26">
          <AppButton text="VIEW MORE STORIES" color="black" @click="loadMoreCategory()" :disabled="categoryViewMoreArr.length >= filteredCategories.length" />
        </div>
      </section>
    </template>
  </main>

  <AppFooter />
</template>

<script setup>
  import { ref, onBeforeMount, onMounted } from 'vue'

  const appStore = useAppStore()

  const { $preview } = useNuxtApp()

  const excpectCount = ref(99)
  const viewMoreItems = ref(12)
  const currentPage = ref(1)

  const categoryViewMoreItems = ref(12)
  const categoryCurrentPage = ref(1)

  const firstBatchArr = ref([])
  const secondBatchArr = ref([])
  const thirdBatchArr = ref([])
  const fourthBatchArr = ref([])
  const fullscreenArr = ref([])
  const viewMoreArr = ref([])
  const viewMoreArrPaginate = ref([])

  const { data } = await useAsyncData('journals', async () => {
    const [categoriesResponse, initialJournalsResponse] = await Promise.all([
      fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/journal_category/`),
      fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/journal/?per_page=${excpectCount.value}&order=desc&page=1`)
    ])

    const journalsHeaders = {
      total: initialJournalsResponse.headers.get('x-wp-total'),
      totalpages: initialJournalsResponse.headers.get('x-wp-totalpages')
    }

    const categories = await categoriesResponse.json()
    const initialJournals = await initialJournalsResponse.json()

    let allJournals = [...initialJournals]

    const sortedCategories = []

    categories.forEach((item) => {
      if (item.count > 0) sortedCategories.push(item)
    })
    

    if (journalsHeaders.totalpages > 1) {
      const fetches = []
      for (let page = 2; page <= journalsHeaders.totalpages; page++) {
        fetches.push(
          fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/journal/?per_page=${excpectCount.value}&order=desc&page=${page}`)
            .then(response => response.json())
        )
      }

      const remainingJournals = await Promise.all(fetches)
      allJournals = allJournals.concat(...remainingJournals)
    }

    if ($preview.value) {
      allJournals.filter(article => article.acf.hide_article_promo_on_index === false)
      /*.sort((a, b) => {
        if (a.acf.show_promo_in_full_width === false && b.acf.show_promo_in_full_width === true) return -1
        if (a.acf.show_promo_in_full_width === true && b.acf.show_promo_in_full_width === false) return 1
        return 0
      })*/
      .forEach((item) => {
        if (firstBatchArr.value.length < 3) {
          firstBatchArr.value.push(item)
        } else if (secondBatchArr.value.length < 3) {
          secondBatchArr.value.push(item)
        } else if (thirdBatchArr.value.length < 3) {
          thirdBatchArr.value.push(item)
       /* } else if (item.acf.show_promo_in_full_width && fullscreenArr.value.length < 2) {
          fullscreenArr.value.push(item)*/
        } else if (fourthBatchArr.value.length < 4) {
          fourthBatchArr.value.push(item)
        } else {
          viewMoreArr.value.push(item)
          viewMoreArrPaginate.value = viewMoreArr.value.slice(0, 12)
        }
      })
    }

    return {
      categories: sortedCategories,
      journals: allJournals,
      headers: journalsHeaders
    }
  })

  const categories = ref(data?.value?.categories)
  const articles = ref(data?.value?.journals)

  if (!appStore.categories.length) {
    appStore.getCategories(categories.value)
  }

  const allCategories = ref([{
    id: 0,
    name: 'ALL',
    slug: 'all',
    count: articles?.value?.filter(article => article.acf.hide_article_promo_on_index === false).length
  }])

  const isDesktop = ref(false)
  const filteredCategories = ref([])
  const categoryViewMoreArr = ref([])

  const activeCategory = ref(0)

  const selectCategory = async (value) => {
    activeCategory.value = value
    filteredCategories.value = []
    categoryCurrentPage.value = 1
    categoryViewMoreItems.value = 12

    if (value !== 0) {
      filteredCategories.value = articles.value.filter(article => 
        article.journal_category.includes(value) && article.acf.hide_article_promo_on_index === false
      )

      categoryViewMoreArr.value = filteredCategories.value.slice(0, 12)
    }
  }
  
  const onResize = () => {
    isDesktop.value = window.innerWidth >= 768
  }

  const loadMoreCategory = () => {
    if (categoryViewMoreItems.value < filteredCategories.value.length) {
      categoryViewMoreItems.value += categoryViewMoreItems.value
      const endIndex = Math.min(categoryViewMoreItems.value, filteredCategories.value.length)
      categoryViewMoreArr.value = filteredCategories.value.slice(0, endIndex)
      categoryCurrentPage.value += 1
    }
  }

  const loadMore = async () => {
    if (viewMoreArr.value.length >= viewMoreItems.value) {
      viewMoreItems.value += viewMoreItems.value
      const endIndex = Math.min(viewMoreItems.value, viewMoreArr.value.length)
      viewMoreArrPaginate.value = viewMoreArr.value.slice(0, endIndex)
      currentPage.value += 1
    }
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
    onResize()

    if (!$preview.value) {
      articles?.value.filter(article => article.acf.hide_article_promo_on_index === false)
       /*.sort((a, b) => {
        if (a.acf.show_promo_in_full_width === false && b.acf.show_promo_in_full_width === true) return -1
        if (a.acf.show_promo_in_full_width === true && b.acf.show_promo_in_full_width === false) return 1
        return 0
      })*/
      .forEach((item) => {
        if (firstBatchArr.value.length < 3) {
          firstBatchArr.value.push(item)
        } else if (secondBatchArr.value.length < 3) {
          secondBatchArr.value.push(item)
        } else if (thirdBatchArr.value.length < 3) {
          thirdBatchArr.value.push(item)
        } else if (item.acf.show_promo_in_full_width && fullscreenArr.value.length < 2) {
          fullscreenArr.value.push(item)
        } else if (fourthBatchArr.value.length < 4) {
          fourthBatchArr.value.push(item)
        } else {
          viewMoreArr.value.push(item)
          viewMoreArrPaginate.value = viewMoreArr.value.slice(0, 12)
        }
      })
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })

  onBeforeMount(() => {
    appStore.setDarkHeader()
    appStore.setInitHeader(true)
    

    if(!appStore.categories.length) {
      appStore.getCategories()
    }
  })

  useSeoMeta({
    title: 'Journal | The Brentford Project | Ballymore',
    ogTitle: 'Journal | The Brentford Project | Ballymore',
    description: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    ogDescription: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    twitterCard: 'summary_large_image',
  })
</script>

<style>

</style>