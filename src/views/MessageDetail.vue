<template>
  <ul>
    <li>ID: {{$route.params.id}}</li>
    <li>Title: {{detail.title}}</li>
    <li>Content: {{detail.content}}</li>
  </ul>
</template>
<script>
  const allMessageDetails =  [
    {id: 1, title: 'message001', content: 'message content001'},
    {id: 2, title: 'message002', content: 'message content002'},
    {id: 3, title: 'message003', content: 'message content003'},
  ]
  export default {
    data () {
      return {
        detail: {} // 当前需要显示的消息详情对象
      }
    },

    // 只在初始化执行一次, 后面只是参数变化切换路由, 不会重新创建
    mounted () {
      console.log('mounted()')
      // 根据请求参数中的id查找到对应的detail对象显示
      this.showDetail(this.$route)
    },

    watch: {
      '$route': function (to, from) {
        debugger
        if(to.path.indexOf('/home/message/detail/')!=0) {
          return
        }
        console.log('$route()', to, from)
        // 根据请求参数中的id查找到对应的detail对象显示
        this.showDetail(to)
      }
    },

    methods: {
      showDetail (route) {
        // 根据请求参数中的id查找到对应的detail对象显示
        const id = route.params.id * 1
        const detail = allMessageDetails.find(detail => id===detail.id)
        this.detail = detail
      }
    }
  }
</script>
<style scoped>

</style>