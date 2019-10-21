// eslint-disable-next-line import/named
import { ContentfulClientApi } from 'contentful'

// const { getConfigForKeys } = require('./lib/config.js')

const contentful = require('contentful')
require('dotenv').config()

const nuxtConfig = {
  srcDir: 'src/',
  buildModules: ['@nuxtjs/eslint-module', '@nuxt/typescript-build'],
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'System mun',
    titleTemplate: '%s - ' + 'System mun',
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'フリーランスエンジニア、munのContentful制のポートフォリオサイトです。Webサイト制作、システム開発等、いつでも承ります。'
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'System mun' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:title', property: 'og:title', content: 'System mun' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'フリーランスエンジニア、munのポートフォリオサイトです。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: process.env.BASE_URL + 'ogp.jpg'
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'google-signin-client_id',
        content:
          '254018064243-e3mejlmm3us3k3t8gcra3vha8snje65h.apps.googleusercontent.com'
      },
      {
        name: 'google-signin-scope',
        content: 'https://www.googleapis.com/auth/analytics.readonly'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/contentful' }
    // '~/plugins/vue-scrollto',
    // // { src: '~plugins/analytics' },
    // { src: '~/plugins/filters.js' }
    // { src: '~/plugins/vue-lazyload.js', ssr: false }
  ],

  /*
   ** generate options
   */

  generate: {
    subFolders: false
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    BASE_URL: process.env.BASE_URL
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-111180721-3'
      }
    ]
  ],
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    // use: [
    //   'markdown-it-toc' // 目次を作るためのライブラリ。別途インストールが必要
    // ]
  },
  styleResources: {
    scss: ['~/assets/sass/variable.scss']
  },
  webfontloader: {
    google: {
      families: ['Montserrat+Subrayada', 'Roboto:400,500,700'],
      urls: [
        'https://fonts.googleapis.com/css?family=Montserrat+Subrayada&display=swap',
        'https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap'
      ]
    }
  },
  css: ['~/assets/sass/common.scss'],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // vendor: ['dayjs'],
    extend(config: any, ctx: any) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  sitemap: {
    path: '/sitemap.xml', // 出力パス
    hostname: process.env.BASE_URL,
    // cacheTime: 1000 * 60 * 15,
    exclude: [
      // 除外項目
      '/auth/**',
      '/my-page'
    ],
    async routes() {
      const client: ContentfulClientApi = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN
      })

      const posts = await client.getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
      })

      const urls: string[] = []
      posts.items.forEach((val: any, idx: number) => {
        urls[idx] = 'posts/' + val.fields.slug
      })

      return urls
    }
  }
}
export default nuxtConfig
