<template lang="pug">
  main-template
    header-text
    .main
      sidebar
      posts-list
        div

</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
// import TopList from '~/components/post/TopList.vue'
import PostsList from '~/components/post/PostsList.vue'
import Sidebar from '~/components/layouts/Sidebar.vue'
const MainTemplate = () => import('~/components/layouts/MainTemplate.vue')
const HeaderText = () => import('~/components/layouts/HeaderText.vue')

@Component({
  async asyncData({ store }) {
    await store.dispatch('product/initPosts', {
      slug: '',
      date: ''
    })
    // await store.dispatch('product/initPostsDate')
    // await store.dispatch('product/initPostCategory')
  },
  components: {
    MainTemplate,
    // TopList,
    PostsList,
    HeaderText,
    Sidebar
  }
})
export default class Index extends Vue {}
</script>

<style>
.main {
  margin: 24px 10% 8px;
  padding-top: 36px;
}
</style>
