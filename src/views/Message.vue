<template>
  <ul>
    <li v-for="m in messages" :key="m.id">
      <router-link to="???">{{m.title}}</router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    data () {
      return {
        messages: []
      }
    },

    mounted () {
      // 模拟请求获取数据
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 2, title: 'message002'},
          {id: 3, title: 'message003'},
        ]
        this.messages = messages
      }, 1000)
    }
  }
</script>
<style scoped>

</style>