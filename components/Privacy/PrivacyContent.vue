<template>
  <section  class="PrivacyContent pt-42 pb-20 md:pt-70 md:pb-40 px-5 gap-10 md:px-10 md:grid md:grid-cols-12">
    <div id="wrapper" class="max-md:mb-14 h-full col-start-1 col-end-5 flex flex-col justify-between items-start">
      <div ref="stickyElement" class="relative md:sticky md:top-0 w-full">
        <div ref="privacyContentSticky" class="opacity-0">
          <h1  class="font-bold text-20 md:text-25 my-0 uppercase">{{ title }}</h1>
          <div class="flex flex-col md:grid grid-cols-4 gap-10 mt-10">
            <div class="flex flex-col">
              <AppLink
                v-for="link in links"
                :key="link.id"
                :to="link.path"
                class="text-4.5 opacity-25 black whitespace-nowrap transition hover:opacity-100"
                :class="{ '!opacity-100 !underline': route.path.includes(link.path) }"
              >
                {{ link.name }}
              </AppLink>
            </div>

            <div class="col-start-3 col-end-5">
              <span class="text-4.5 leading-normal">Last Updated:</span>
              <br>
              <span class="text-4.5 leading-normal">{{ formatDate(date) }}</span>
            </div>
          </div>
        </div>

        <button class="mt-8 hidden opacity-0 rounded-full h-21 w-21 uppercase text-3 progress-button relative md:flex items-center justify-center"
        @click="scrollToTop()" 
        ref="buttonBackToTop"
        :style="buttonStyle"
        >
          <span class="rounded-full h-19 w-19 uppercase text-3 bg-white flex items-center justify-center px-3">
            back to top
          </span>
        </button>
      </div>
      <button class="hidden" ref="endElement"></button>
    </div>
    <div ref="privacyContenText" class="col-start-7 opacity-0 col-end-13" v-if="content && title.toLowerCase() !== 'cookies'" v-html="content" />
    <div ref="privacyContenText" class="col-start-7 opacity-0 col-end-13" v-else id="cookie-bot" />
  </section>
</template>

<script setup>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { ref } from 'vue'

  defineProps({
    content: {
      type: Object,
      default: () => {}
    },
    date: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  })

  const route = useRoute()
  const privacyContentSticky = ref(null);
  const privacyContenText = ref(null);
  const isDesktop = ref(false)
  const stickyElement = ref(null)
  const endElement = ref(null)
  const buttonBackToTop = ref(null);
  const buttonStyle = ref({});
  const links = ref([
    {
      id: 1,
      name: 'Terms of Use',
      path: '/terms',
    },
    {
      id: 2,
      name: 'Privacy Policy',
      path: '/privacy',
    },
    {
      id: 3,
      name: 'Cookie Policy',
      path: '/cookies',
    },
    {
      id: 4,
      name: 'Modern Slavery',
      path: '/modern-slavery',
    },
  ])

  const animateComponent = () => {
    if (privacyContenText.value) {
      gsap.fromTo(
        privacyContenText.value,
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
            trigger: privacyContenText.value,
            start: 'top bottom'
          }
        }  
      );
    }
    if (privacyContentSticky.value) {
      gsap.fromTo(
        privacyContentSticky.value,
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
            trigger: privacyContentSticky.value,
            start: 'top bottom'
          }
        }  
      );
    }

    if (buttonBackToTop.value) {  
      gsap.fromTo(
        buttonBackToTop.value,
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
            trigger: buttonBackToTop.value,
            start: 'top bottom'
          }
        }  
      );
    }
  }

  const onResize = () => {
    isDesktop.value = window.innerWidth >= 768

    const stickyTrigger = ScrollTrigger.getById('stickyTrigger')
    if (stickyTrigger) {
      stickyTrigger.kill()
    }
    gsap.set(stickyElement.value, { clearProps: "all" })

    if (isDesktop.value) {
      gsap.registerPlugin(ScrollTrigger)

      const stickyHeight = stickyElement.value.offsetHeight

      gsap.to(stickyElement.value, {
        scrollTrigger: {
          trigger: stickyElement.value,
          start: "-80px top",
          endTrigger: endElement.value,
          end: () => `top-=${stickyHeight + 80} top`,
          pin: true,
          pinSpacing: false,
          id: 'stickyTrigger'
        }
      })
      const scrollProgress = { val: 0 };

      gsap.to(scrollProgress, {
      val: 1,
      scrollTrigger: {
        trigger: stickyElement.value,
        start: '-80px top',
        endTrigger: endElement.value,
        end: 'bottom bottom',
        scrub: true,
        onUpdate: () => {
          const progress = scrollProgress.val * 100;
          buttonStyle.value = {
            backgroundImage: `conic-gradient(black ${progress}%, transparent 0)`
          };
        }
      }
    });
    }
  }

  const mobTables = () => {
    const el = document.getElementsByClassName('PrivacyContent')[0]
    
    el.querySelectorAll('table').forEach((table) => {
      const ths = table.querySelectorAll('th')
      if (ths.length == 0) return
      table.querySelectorAll('tr').forEach((tr, i) => {
          const tds = tr.querySelectorAll('td')
          tds.forEach((td, j) => {
            td.dataset['th'] = ths?.[j].innerText || ''
          })
      })
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)  
    const options = { month: 'long', year: 'numeric' }

    return date.toLocaleString('en-US', options)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
    mobTables()
    onResize()
    animateComponent()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
</script>

<style lang="scss">
  .PrivacyContent {
    line-height: 1.4;

    h6 {
      font-size: 1.75rem;
      font-weight: bold;
      margin-bottom: 0.75rem;
    }

    h5 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.75rem;
    }

    h4 {
      font-size: 2.25rem;
      font-weight: bold;
      margin-bottom: 0.75rem;
    }

    h3 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 0.75rem;
    }

    h2 {
      font-size: 2.75rem;
      font-weight: bold;
      margin-bottom: 0.75rem;
    }

    h1 {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 1.125rem;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    li {
      font-size: 1.125rem;
    }

    ol {
      list-style-type: none;
      counter-reset: item;
      margin: 0;
      padding: 0;

      ul {
        list-style: disc;

        li {
          &:not(:last-of-type) {
            margin-bottom: 0.75rem;
          }
        }
      }
    }

    ol > li {
      display: table;
      counter-increment: item;

      &:not(:last-of-type) {
        margin-bottom: 3.5rem;
      }

      ol {
        margin-left: -1.4rem;
      }
      
      strong {
        text-transform: uppercase;
        display: block;
        margin-bottom: 1.25rem;
        font-size: 1.5rem;
        font-weight: bold;
      }
    }

    ol > li:before {
      content: counters(item, ".") ". ";
      display: table-cell;
      padding-right: 0.6em;    
    }

    li ol > li {
      &:not(:last-of-type) {
        margin-bottom: 1.25rem;
      }
    }

    li ol > li:before {
      content: counters(item, ".") " ";
    }

    table {
      margin: 2em 0;
      p + p {
        margin-top: 0.3em;
      }
      @media (max-width: $phone) {
        & {
          width: 100%;
          max-width: 100%;
          overflow: scroll;
          display: block;
          box-shadow: 0 0 10px #0004 inset;
          tbody {
            width: max-content;
            display: block;
            max-width: 200vw;
          }
        }
      }
    }
    th,
    td {
      border: 1px solid currentColor;
      padding: 1em;
    }

    .table-wrap {
      width: calc(100vw - 0.6em - 1.25rem* 2 - 16px);
    }

    @media (min-width: $phone) {
      .table-wrap {
      width: 100%;
    }

      h6 {
        font-size: 2.5rem;
      }

      h5 {
        font-size: 3rem;
      }

      h4 {
        font-size: 3.5rem;
      }

      h3 {
        font-size: 4rem;
      }

      h2 {
        font-size: 4.5rem;
      }

      h1 {
        font-size: 5rem;
      }

    }
  }
</style>
<!-- ol {
  list-style: numeric;
  padding-left: 20px;
  margin-bottom: 0.75rem;

  li {
    margin-bottom: 3.5rem;
    
    strong {
      display: block;
      margin-bottom: 0.75rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}

ul {
  margin-bottom: 0.75rem;

  li {
    margin-bottom: 0.75rem;
  }
} -->