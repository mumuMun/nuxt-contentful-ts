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
import PostsList from '~/components/post/PostsList.vue'
import Sidebar from '~/components/layouts/Sidebar.vue'
const MainTemplate = () => import('~/components/layouts/MainTemplate.vue')
const HeaderText = () => import('~/components/layouts/HeaderText.vue')

@Component({
  async asyncData({ store, params }) {
    await store.dispatch('product/initPosts', {
      category: params.category
    })
    // await store.dispatch('product/initPostsDate')
  },
  components: {
    MainTemplate,
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
