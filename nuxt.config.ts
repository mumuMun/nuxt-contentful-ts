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
    title: 'トップ',
    titleTemplate: 'hogeブログ | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'hogehoge'
      },
      { property: 'og:site_name', content: 'hoge' },
      { property: 'og:url', content: '' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'hogehoge' },
      {
        property: 'og:description',
        content: 'hoge'
      },
      { property: 'og:image', content: 'hoge' },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:site', content: '@MUNMUN1234' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'kuroneko1th.png'
      }
    ],
    script: [
      {
        async: true,
        src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
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
    { src: '~plugins/contentful' },
    {
      src: '~plugins/infinite-loading.ts',
      mode: 'client'
    }
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
