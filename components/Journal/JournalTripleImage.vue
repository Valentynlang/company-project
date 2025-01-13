<template>
  <section class="hd_clamp gap-5  px-5 md:px-10 grid grid-cols-2 md:grid-cols-12 md:gap-10">
    <div
      v-if="articlesArr.length && articlesArr[0]"
      class="col-span-2 md:col-span-6"
      :class="[
        {'md:order-1': direction === 'normal'},
        {'md:order-3': direction === 'reverse'},
      ]"
    >
      <JournalArticleBgItem v-if="isDesktop" :article="articlesArr[0]" />
      <JournalArticleItem v-else :article="articlesArr[0]" aspectRatio="1/1" />
    </div>

    <div
      v-if="articlesArr.length && articlesArr[1]"
      class="col-span-1 md:col-span-3 md:order-2"
    >
      <JournalArticleItem :article="articlesArr[1]" />
    </div>
    <div
      v-if="articlesArr.length && articlesArr[2]"
      class="col-span-1 md:col-span-3"
      :class="[
        {'md:order-3': direction === 'normal'},
        {'md:order-1': direction === 'reverse'},
      ]"
    >
      <JournalArticleItem :article="articlesArr[2]" />
    </div>
  </section>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const props = defineProps({
    articles: {
      type: Object,
      default: () => {}
    },
    direction: {
      type: String,
      default: 'normal',
      validator (value) {
				return ['normal', 'reverse'].includes(value)
			},
    }
  })

  const isDesktop = ref(false)

  const articlesArr = computed(() =>
    props.direction === 'reverse' ? [...props.articles].reverse() : props.articles
  )


  const onResize = () => {
    isDesktop.value = window.innerWidth >= 768
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
    onResize()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
</script>

<style lang="scss" scoped>
</style>