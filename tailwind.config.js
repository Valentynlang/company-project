module.exports = {
  mode: 'jit',
  purge: ['./components/**/*.{vue,js}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '200': '50rem',
        '83.5': '20.875rem',
        '62.5': '15.625rem',
        '270': '67.5rem'	
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/2': '3 / 2',
      },
      inset: {
        '17.5': '4.615rem'	
      },
      screens: {
        xl: '1290px',
      },
      colors: {
        black: '#000',
        white: '#fff',
        red: '#f06446',
        light_gray: '#D0D0D0',
        dark_gray: '#343434',
        gray: '#F2F4F7',
        aqua_blue: '#69B9BB',
        coal_black: '#272727',
        gold: '#C7B09B',
        dark_green: '#364037',
        beige: '#F2F0EB',
        purple: '#773DBD',
      },
      fontWeight: () => {
        let ret = {}
        for (let i = 100; i <= 900; i += 100) {
            ret[i] = `${i}`
        }
        return ret
      },
    },
    spacing: () => {
      let ret = {}
      for (let i = 0; i <= 1000; i += 2) {
        ret[i / 4] = `${i / 16}rem`
      }
      for (let i = 1008; i <= 2000; i += 16) {
        ret[i / 4] = `${i / 16}rem`
      }
      return ret
    },
    fontSize: () => {
      let ret = {}
      for (let i = 0; i <= 400; i += 2) {
        ret[i / 4] = `${i / 16}rem`
      }
      return ret
    },
    lineHeight: () => {
      let ret = {}
      for (let i = 10; i <= 20; i++) {
        ret[i] = `${i / 10}`
      }
      return ret
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
