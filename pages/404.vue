<template>
  <main>
    <section class="h-screen flex flex-col pt-65 md:pt-80 gap-6 items-center text-center">
      <h1 class="uppercase text-12 md:text-18 font-bold m-0 leading-[80px]">Page not FOUND</h1>
      <span class="block font-secondary text-36 md:text-80 uppercase">404</span>
      <p class="leading-normal uppercase text-4.5 mb-6">SORRY The page you are look for doesnt exist or has been moved.</p>
      <div>
        <AppButton text="View Homes" route="/quincy-house" color="black" />
      </div>
    </section>
  </main>
</template>

<script setup>
  definePageMeta({
    layout: "error",
  });

  const appStore = useAppStore()

  onBeforeMount(() => {
    appStore.setDarkHeader()
    appStore.setInitHeader(true)
  })

  useSeoMeta({
    title: '404 | The Brentford Project | Ballymore',
    ogTitle: '404 | The Brentford Project | Ballymore',
    description: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    ogDescription: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    twitterCard: 'summary_large_image',
  })
</script>
