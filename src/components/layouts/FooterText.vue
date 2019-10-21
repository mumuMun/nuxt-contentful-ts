<template lang="pug">
  footer
    p footer
</template>

<script lang="ts">
import Vue from 'vue'

export default class Footer extends Vue {
  data() {
    return {
      // imgName: require('../../static/bakeneko2.png')
    }
  }
}
</script>

<style scoped>
footer {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 30px 0;
  background-color: #35495e;
  color: #fff;
  max-width: 100%;
}

.footer-text {
  padding: 24px 0 12px;
  margin: auto;
}

.menu {
  display: flex;
  vertical-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
}

.menu a {
  color: #fff;
  margin-right: 1em;
  padding-right: 16px;
  /* background: url(../static/external_link.png) no-repeat right center; */
}

.menu a:last-child {
  margin-right: 0;
}

.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8vmin;
}

@media (max-width: 500px) {
  footer {
    margin-top: 0;
    min-height: 0;
  }

  .copyright {
    font-size: 12px;
  }
}
</style>
