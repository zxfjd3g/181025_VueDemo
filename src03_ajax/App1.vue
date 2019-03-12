<template>
  <div>
    <p v-if="!repoName">loading...</p>
    <p v-else>most star repo is <a :href="repoUrl">{{repoName}}</a></p>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        repoName: '',
        repoUrl: ''
      }
    },

    async mounted () {
      const url = 'https://api.github.com/search/repositories?q=j&sort=stars'
      // 使用vue-resource发ajax请求
      /*this.$http.get(url).then(response => {
        // 取出响应数据
        const result = response.data
        const {name, html_url} = result.items[0]
        // 更新状态数据
        this.repoName = name
        this.repoUrl = html_url
      }).catch(error => {
        alert('请求出错!')
      })*/

      // 使用axios发ajax请求
      /*axios.get(url).then(response => {
        // 取出响应数据
        const result = response.data
        const {name, html_url} = result.items[0]
        // 更新状态数据
        this.repoName = name
        this.repoUrl = html_url
      }).catch(error => {
        alert('请求出错22!')
      })*/

      try {
        const response = await axios.get(url)  // 内部调用resolve(response)
        // 取出响应数据
        const result = response.data
        const {name, html_url} = result.items[0]
        // 更新状态数据
        this.repoName = name
        this.repoUrl = html_url
      } catch(error) {
        alert('请求出错22!')
      }

    }
  }


  /*
  1. async/await的作用?
     简化promise的使用, 不再使用.then()或.catch()来指定成功或失败的回调函数(消灭回调函数)
     以同步的编码方式实现异步流程
  2. 哪里用await
    在返回promise对象的表达式左侧(想得到的不是promise, 而是想要异步执行返回的结果)
  3. 哪里用async
    await所在函数定义的左侧
   */
</script>
<style scoped>

</style>