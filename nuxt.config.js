export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'idolitter',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-good-table', ssr: false },
    '~/plugins/day.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyAKYSs2c7mrtmESfvcE0TQAVCAy3YtKaV8',
      authDomain: 'idolitter-373101.firebaseapp.com',
      projectId: 'idolitter-373101',
      storageBucket: 'idolitter-373101.appspot.com',
      messagingSenderId: '553829081488',
      appId: '1:553829081488:web:a7d8eb0943fcc640fed315',
      measurementId: 'G-6S8735L47V',
    },
    services: {
      auth: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
}
