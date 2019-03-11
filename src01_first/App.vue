<template>
  <div>
    <h2>App组件标题</h2>
    <HelloWorld/>
    <img class="logo" src="./assets/logo.png" alt="logo">
  </div>
</template>
<script>
  // import HelloWorld from './components/HelloWorld.vue'
  export default {
    components: {
      // HelloWorld
    }
  }
</script>
<style scoped>
  .logo {
    width: 300px;
    height:300px;
  }
</style>
