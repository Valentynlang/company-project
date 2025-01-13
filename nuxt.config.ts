import svgLoader from "vite-svg-loader"

const fetchGeneric = async () => {
  return await fetch(`https://admin.thebrentfordproject.com/wp-json/wp/v2/journal/?per_page=99&order=asc`).then((res) =>
    res.json())
};

export default defineNuxtConfig({
  app: {
    rootAttrs: {
      id: "app",
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    sharedPrerenderData: true,
    payloadExtraction: true,
  },

  hooks: {
    async 'prerender:routes'(ctx) {
      const allRoutes = []

      const genericPages = await fetchGeneric()
      if (genericPages) {
        const genericRoutes = genericPages.map((page: any) => {
          return `/journal/${page.slug}/`
        })
        allRoutes.push(...genericRoutes)
      }

      if (allRoutes.length) {
        for (const route of allRoutes) {
          ctx.routes.add(route)
        }
      }
    },
  },

  nitro: {
    prerender: {
      routes: [
        '/_ipx/_/img/The-Wick-Steam-Interior.webp',
        '/_ipx/_/img/The-Wick-Sauna-Interior.webp',
        '/_ipx/_/img/The-Wick-Spa-Pool.webp',
        '/_ipx/_/img/The-Wick-Pool-and-Clubhouse.webp',
        '/_ipx/_/img/The-Wick-Spa-Interior.webp',
        '/_ipx/_/svg/arrow-down-b.svg',
        '/_ipx/_/svg/subway.svg',
        '/_ipx/_/svg/subway.svg',
        '/_ipx/_/svg/car.svg',
        '/_ipx/_/svg/copylink.svg',
        '/_ipx/_/svg/zoom.svg',
        '/_ipx/_/svg/x.svg',
        '/_ipx/_/svg/linkedin.svg',
        '/_ipx/_/svg/instagram.svg',
        '/_ipx/_/svg/instagram.svg',
        '/_ipx/_/svg/facebook.svg',
        '/_ipx/_/svg/chat.svg',
        '/_ipx/_/svg/circle-arrow-down.svg',
        '/_ipx/_/svg/bath.svg',
        '/_ipx/_/svg/bed.svg',
        '/_ipx/_/svg/arrow-right.svg',
        '/_ipx/_/svg/play.svg',
        '/_ipx/_/svg/phone.svg',
        '/_ipx/_/svg/mail.svg',
        '/_ipx/_/svg/close.svg',
        '/_ipx/_/svg/burger.svg',
        '/_ipx/_/svg/ballymore-logo.svg',
        '/_ipx/_/svg/logo-mini.svg',
        '/_ipx/_/svg/logo-white.svg',
        '/_ipx/_/svg/logo-dark.svg',
      ],
    },
  },

  site: {
    url: 'https://www.thebrentfordproject.com',
    name: 'The Brentford Project | Ballymore',
    description: 'The Brentford Project is re-connecting the high st and waterfront, creating a new residential quarter with a vibrant dining, entertainment and retail scene.',
    defaultLocale: 'en',
  },

  runtimeConfig: {
    public: {
      baseURL: 'https://admin.thebrentfordproject.com',
    },
  },

  build: {
    transpile: ['vee-validate'], // Only transpile specific libraries
  },

  compatibilityDate: '2024-04-03',

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/seo",
    "nuxt-seo-experiments",
    [
      'nuxt-lazy-load',
      {
        images: true,
        videos: false,
        audios: true,
        iframes: true,
        native: false,
        polyfill: true,
        directiveOnly: false,
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',

        observerConfig: {
        },
      },
    ],
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  css: ['~/assets/scss/main.scss'],

  tailwindcss: {
    cssPath: '~/assets/scss/vendors/tailwind.css',
    configPath: 'tailwind.config.js',
  },

  image: {
    dir: 'public', // Ensure the 'assets' directory is being used
    formats: ['svg', 'jpg', 'png', 'webp'],
    provider: 'ipx', // Use the built-in IPX image optimizer
    presets: {
      // Customize your presets for different screen sizes
      default: {
        modifiers: {
          format: 'webp', // Serve optimized WebP images
          quality: 80,
        },
      },
    },
  },

  plugins: [
    '~/plugins/100vhFix.js',
    '~/plugins/preview.js',
    {
      src: '~/plugins/vimeo-player.js',
      mode: 'client',
    }
  ],

  vite: {
    build: {
      cssCodeSplit: true, // Enable CSS code splitting
      minify: 'esbuild', // Minify JS with esbuild (faster than terser)
    },
    plugins: [
      svgLoader(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/abstracts/variables.scss";',
        },
      },
    },
  }
})