<template lang="pug">
  .sidebar
    ul.archive_date(v-if="postsDate", v-for='(date,k) in postsDate')
      li
        a(:href="'/posts/date/'+date.date") {{date.date}}({{date.count}})

    ul.archive_date(v-if="postsCategory", v-for='(cat,c) in postsCategory')
      li
        a(:href="'/posts/category/'+cat.slug") {{cat.name}}({{cat.count}})
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Sidebar extends Vue {
  get postsDate() {
    return this.$store.state.product.postsDate
  }
  get postsCategory() {
    return this.$store.state.product.categories
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  padding: 12px;
  top: 0;
  left: 0;
  line-height: 1.2;
  font-size: 3vmin;
  z-index: 24;
  text-align: center;
}
</style>
