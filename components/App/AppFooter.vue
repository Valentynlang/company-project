<template>
  <footer class="footer mx-5 sm:mx-10 mb-20 bg-black p-6 sm:p-22 rounded-2xl sm:rounded-3xl flex flex-col gap-8 sm:gap-32">
    <div class="flex justify-between items-start">
      <div cl>
        <h3 class="text-white text-center sm:text-left font-secondary text-10 sm:text-18 max-w-lg mb-8">{{ title ? title : 'Ready to elevate to your best life?' }}</h3>

        <div class="flex gap-3 flex-col sm:flex-row">
          <AppButton color="transparent" text="Buy your home" route="/quincy-house"/>
          <AppButton color="white" text="Register Now" icon="arrow-right" route="/register" />
        </div>
      </div>
<AppLink to="https://www.ballymoregroup.com" target="_blank">
      <NuxtImg src="/svg/ballymore-logo.svg" class="h-10 hidden sm:block" loading="lazy" alt="Ballymore Logo" />
      </AppLink>
    </div>

    <div class="flex items-start sm:items-end gap-8 justify-between flex-col sm:flex-row">
      <AppLink to="/"> <NuxtImg src="/svg/logo-white.svg" class="h-24" loading="lazy" alt="The Brentford Logo" /></AppLink>

      <div class="flex items-start gap-7 sm:gap-18 flex-col sm:flex-row">
        <div class="w-fit flex flex-col gap-7 sm:gap-10">
          <div class="[&>address]:text-white [&>address]:text-3.5 [&>address]:not-italic">
            <address>Sales Gallery:</address>
            <address>116 High Street, Brentford </address>
            <address>London TW8 8EW</address>
          </div>

          <div class="flex flex-col [&>a]:w-fit [&>a]:text-white">
            <a href="tel:02085697775" class="text-3.5 sm:text-6 rTapNumber375523">020 8569 7775</a>

           
            <a href="mailto:theteam@thebrentfordproject.com" class="text-3.5">theteam@thebrentfordproject.com</a>
          </div>
        </div>

        <div class="flex gap-28">
          <ul>
            <li
              v-for="link in socials"
              :key="link.id"
            >
              <a
                :href="link.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white text-3.5"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
          <ul>
            <li
              v-for="link in pages"
              :key="link.id"
            >
              <nuxt-link
                :to="link.link"
                class="text-white text-3.5"
              >
                {{ link.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
 <AppLink to="https://www.ballymoregroup.com" target="_blank">
        <NuxtImg src="/svg/ballymore-logo.svg" class="h-8 block sm:hidden" loading="lazy" alt="Ballymore Logo" />
        </AppLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  defineProps({
    title: {
      type: String,
      default: ''
    }
  })

  const socials = ref([
    {
      id: 1,
      name: 'X',
      link: 'https://twitter.com/ballymore?lang=en',
    },
    {
      id: 2,
      name: 'Instagram',
      link: 'https://www.instagram.com/thebrentfordproject',
    },
    {
      id: 3,
      name: 'Facebook',
      link: 'https://www.facebook.com/ballymoregroup/',
    },
    {
      id: 4,
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/company/ballymore-properties',
    },
  ])

  const pages = ref([
    {
      id: 1,
      name: 'Terms',
      link: '/terms',
    },
    {
      id: 2,
      name: 'Privacy',
      link: '/privacy',
    },
    {
      id: 3,
      name: 'Cookies',
      link: '/cookies',
    },
    /*
    {
      id: 4,
      name: 'Modern Slavery',
      link: '/',
    },
    */
  ])

  const rTapAddClick = () => {
    document.querySelectorAll('[class*=rTapNumber]').forEach((rtap) => {
      let a = rtap.closest('a')
      
      a.addEventListener('click', (event) => {
        event.preventDefault()
        let tel = rtap.innerText.replace('+44 (0)', '+44').replaceAll(/[\s\(\)]/g, '')
        
        open(`tel:${tel}`)
      })
    })
  }

  onMounted(() => {
    rTapAddClick()
  })
</script>

<style lang="scss" scoped>
  .footer {
    box-shadow: 0px 8px 24px 0px #959DA50D;
  }
</style>