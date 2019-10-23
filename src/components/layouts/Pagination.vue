<template lang="pug">
.pagination
  a(:class="page === 1 ? 'disabled' : ''", :style="page === 1 ? 'opacity: 0.5;' : 'opacity: 1;'", href='#', @click='prev(page)')
    | «
  a(v-for="n of max" :class="page === n ? 'disabled' : ''", :style="page === n ? 'opacity: 0.5;' : 'opacity: 1;'", href='#', @click='goPage(n)')
    | {{n}}
  a(:class="page === max ? 'disabled' : ''", href='#', @click='next(page)')
    | »

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Pagination extends Vue {
  @Prop() page!: number
  @Prop() max!: number

  disabled: boolean = true

  prev(newVal: number) {
    if (this.page !== 1) {
      this.$emit('page-data', newVal - 1)
    }
  }

  next(newVal: number) {
    if (this.page !== this.max) {
      this.$emit('page-data', newVal + 1)
    }
  }
  goPage(newVal: number) {
    this.$emit('page-data', newVal)
  }
}
</script>

<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

.pagination a.active {
  background-color: #42b883;
  color: white;
  border: 1px solid #42b883;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}

.disabled {
  pointer-events: none;
}
</style>
