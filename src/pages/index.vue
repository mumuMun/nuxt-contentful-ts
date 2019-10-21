<template lang="pug">
  main-template
    header-text
    .main
      top-list
        div
          google-adsense(slot='5919567639', ad-format='auto', :ad-style="{ display: 'block' }")

</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TopList from '~/components/post/TopList.vue'
const MainTemplate = () => import('~/components/layouts/MainTemplate.vue')
const HeaderText = () => import('~/components/layouts/HeaderText.vue')

@Component({
  async asyncData({ store }) {
    await store.dispatch('product/initPosts', {
      slug: ''
    })
  },
  components: {
    MainTemplate,
    TopList,
    HeaderText
  }
})
export default class Index extends Vue {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
