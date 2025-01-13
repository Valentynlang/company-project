<template>
  <nav
    id="menu"
    class="h-screen w-full z-10 bg-black"
  >
    <div class="h-full grid grid-cols-1 sm:grid-cols-2">
      <div class="hidden relative sm:block overflow-hidden vimeo-background">
        <ClientOnly>
          <iframe
            class="z-10 pointer-events-none"
            src="https://player.vimeo.com/video/1006224356?dnt=1&background=1&controls=0&autoplay=1&muted=1&loop=1"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            allow="autoplay; fullscreen"
          ></iframe>
        </ClientOnly>

        <button class="absolute-center flex flex-col items-center z-20" @click="openModalVideo()">
          <NuxtImg src="/svg/play.svg" class="mb-6 w-20" loading="lazy" alt="Play icon" />

          <span class="text-4.5 font-medium uppercase text-white">watch the film</span>
        </button>
      </div>

      <div class="h-screen px-5 py-12 max-sm:!pt-32 sm:px-36 sm:py-24 flex flex-col gap-10 justify-between">
        <div class="sm:flex-1 flex flex-col justify-center">
          <ul class="sm:mb-16">
            <li
              v-for="link in mainLinks"
              :key="link.id"
              >
              <div class="link-container w-fit">
                <AppLink
                  ref="linkItems"
                  :to="link.path"
                  class="link font-secondary relative text-white text-8 sm:text-16"
                  :class="{ 'link--active': route.path.includes(link.path) }"
                >
                  {{ link.name }}
                </AppLink>
              </div>
            </li>
          </ul>
          <ul class="hidden sm:block">
            <li
              v-for="link in links"
              :key="link.id"
              class="mb-1"
            >
              <div class="link-container w-fit">
                <AppLink
                  :to="link.path"
                  ref="linkItemsSmall"
                  class="link-small relative text-white text-3.5 sm:text-5 uppercase"
                  :class="{ 'link-small--active': route.path.includes(link.path) }"
                >
                  {{ link.name }}
                </AppLink>
              </div>
            </li>
          </ul>
        </div>

       <div class="block sm:hidden">
         <ul>
            <li
              v-for="link in links"
              :key="link.id"
              class="mb-1"
            >
            <div class="link-container w-fit">
              <AppLink
                ref="linkItemsSmall"
                :to="link.path"
                class="link-small relative text-white text-3.5 sm:text-5 uppercase"
                :class="{ 'link-small--active': route.path.includes(link.path) }"
              >
                {{ link.name }}
              </AppLink>
              </div>
            </li>
          </ul>
        </div>

        <div class="flex justify-between items-end">
          <div class="flex flex-col gap-3">
            <a class="flex items-center gap-3 " href="tel:02085697775">
              <MailIcon class="w-3 sm:w-6 text-white" />
              
              <span class="text-3.5 sm:text-5 text-white rTapNumber375523">020 8569 7775</span>
              </a>
              
              <a class="flex items-center gap-3" href="mailto:theteam@thebrentfordproject.com">
                <PhoneIcon class="w-3 sm:w-6 text-white" />
                
                <span class="text-3.5 sm:text-5 text-white">theteam@thebrentfordproject.com</span>
                </a>
          </div>
<AppLink to="https://www.ballymoregroup.com" target="_blank">
          <BallymoreLogo class="hidden sm:block h-16 text-white" />
            </AppLink>
        </div>

        <div class="flex items-center justify-between gap-4 sm:hidden">
          <div class="relative overflow-hidden opacity-80 max-h-36 max-w-[60%] w-full object-cover rounded-lg">
            <ClientOnly>
              <iframe
                class=""
                src="https://player.vimeo.com/video/1006224356?dnt=1&background=1&controls=0&autoplay=1&muted=1&loop=1"
                frameborder="0"
                width="400"
                height="220"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
                allow="autoplay; fullscreen"
              ></iframe>
            </ClientOnly>
          </div>


          <button class="flex flex-1 flex-col items-center" @click="openModalVideo()">
            <NuxtImg src="/svg/play.svg" class="mb-3 w-10" loading="lazy" alt="Play icon" />

            <span class="text-3 uppercase font-medium text-white">watch the film</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import BallymoreLogo from '@/public/svg/ballymore-logo.svg'
  import MailIcon from '@/public/svg/mail.svg'
  import PhoneIcon from '@/public/svg/phone.svg'

  import gsap from 'gsap'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollToPlugin)

  const appStore = useAppStore()
  const route = useRoute()

  const openModalVideo = () => {
    appStore.openVideoModal(1006215376)
  }

  const mainLinks = ref([
  {
      id: 1,
      path: '/apartments',
      name: 'Apartments',
    },
    {
      id: 2,
      path: '/quincy-house',
      name: 'Quincy House',
    },
    {
      id: 3,
      path: '/residents-club',
      name: 'Residents\' Club',
    },
    {
      id: 4,
      path: '/neighbourhood',
      name: 'Neighbourhood',
    },
     {
       id: 5,
       path: '/journal',
       name: 'Journal',
     },
  ])

  const links = ref([
    {
      id: 1,
      path: '/location',
      name: 'Location',
    },
    {
      id: 2,
      path: '/featured-homes',
      name: 'Featured Homes',
    },
     /*{
       id: 3,
       path: '/journal/unplugged-at-the-brentford-project',
       name: 'Events',
     },*/
    {
      id: 4,
      path: '/ballymore',
      name: 'Ballymore',
    },
  ])

  const linkItems = ref([])
  const linkItemsSmall = ref([])

  gsap.registerPlugin(ScrollTrigger)

  watch(
    () => route.fullPath,
    () => {
      const height = window.innerHeight
        gsap.fromTo(
        "#menu",
        { yPercent: 0,},
        { yPercent: -100, duration: 1, ease: "power4.inOut"}
      )
      gsap.fromTo(
        "main",
        { y: 0 },
        { y: `-${height}`, duration: 1, ease: "power4.inOut", onComplete: () => {
          appStore.toggleMenu()
          document.body.classList.remove('no-scroll')
          gsap.set('main', { y: 0 })
          setTimeout(() => {
            ScrollTrigger.refresh()
          }, 100);
        }}
      )
    }
  )

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

    gsap.from(".video-thumbnail", {
      opacity: 0,
      duration: 3.5,
      delay: .5,
      ease: "power2.out",
    })

    const items = linkItems.value.map(item => item.$el)
    const itemsSmall = linkItemsSmall.value.map(item => item.$el)
    gsap.from(items, {
      yPercent: -100,
      opacity: 0,
      stagger: 0.1,
      delay: .5,
      duration: 1.5,
      ease: 'power4.out',
      onStart: () => {
        document.querySelectorAll('.link-container').forEach(el => {
          el.classList.add('overflow-hidden')
        })
      },
      onComplete: () => {
        document.querySelectorAll('.link-container').forEach(el => {
          el.classList.remove('overflow-hidden')
        })
      },
    })

    gsap.from(itemsSmall, {
      yPercent: -100,
      opacity: 0,
      stagger: 0.1,
      delay: .5,
      duration: 1.5,
      ease: 'power4.out',
    })

  })
</script>

<style lang="scss" scoped>
  .vimeo-background iframe {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max(101vw, 178vh);
    height: max(101vh, 57vw);
  }

  .link {
    display: block;
    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0;
      height: 2px;
      width: 0;
      background: white;
      transition: width .3s ease;
    }
  }

  .link--active, .link:hover {
    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0;
      height: 2px;
      width: 100%;
      background: white;
    }
  }

  .link-small {
    display: block;
    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0;
      height: 1px;
      width: 0;
      background: white;
      transition: width .3s ease;
    }
  }

  .link-small--active, .link-small:hover {
    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0;
      height: 1px;
      width: 100%;
      background: white;
    }
  }
</style>