<template>
  <div class="container">
    <Search/>
    <Main/>
  </div>
</template>
<script>
  import Search from './components/Search.vue'
  import Main from './components/Main.vue'
  export default {
    components: {
      Search,
      Main
    }
  }

</script>
<style scoped>

</style>