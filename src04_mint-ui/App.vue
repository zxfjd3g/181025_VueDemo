<template>
  <div>
    <mt-button type="primary" style="width: 100%" @click="hint">测试mint-ui</mt-button>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  export default {

    methods: {
      hint () {
        Toast('点击了按钮')
      }
    }
  }
</script>
<style scoped>

</style>