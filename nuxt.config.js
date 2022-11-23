const bodyParser = require('body-parser')


export default {

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Covid-19 整合資訊',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 项目里要用的 CSS 文件
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
    src: '~/plugins/font-awesome',
    src: '~/plugins/main'
  }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/axios',

  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-fontawesome',
    // //OR like this
    // ['nuxt-fontawesome', {
    //   component: 'fa',
    //   imports: [
    //     //import whole set
    //     {
    //       set: '@fortawesome/free-solid-svg-icons',
    //       icons: ['fas']
    //     },
    //     //import 2 icons from set
    //     // please note this is PRO set in this example,
    //     // you must have it in your node_modules to actually import
    //     {
    //       set: '@fortawesome/pro-regular-svg-icons',
    //       icons: ['faAdjust', 'faArchive']
    //     }
    //   ]
    // }]
  ],
  // server: {
  //   port: 8080, // default: 3000
  //   host: '0.0.0.0', // default: localhost
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  serverMiddleware:[
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    '~/api'
  ],
  fontawesome: {
    // icon 的標籤使用 <fa>，這邊不設定就會依照 plugin 裡的設定<font-awesome-icon>
    component: 'fa',
    imports: [
      // 引入 fas 所有的icon
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      // 只引入兩種特定的icon
      // 此為pro付費版的package，請注意
    ]
  },
  axios: {
    baseURL:   process.env.NODE_ENV === 'production' && process.client ?  window.location.origin : ''

  }
}

