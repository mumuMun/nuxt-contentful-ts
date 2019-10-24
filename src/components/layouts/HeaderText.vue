<template lang="pug">
  header.header
    nuxt-link(:to="{name:'index'}") Munブログ
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class HeaderText extends Vue {}
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
