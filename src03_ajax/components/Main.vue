<template>
  <div>
    <h2 v-if="firstView">请输入关键字进行搜索</h2>
    <h2 v-else-if="loading">请求中....</h2>
    <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
    <div class="row" v-else>
      <div class="card" v-for="(user, index) in users" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.username}}</p>
      </div>
    </div>
  </div>

</template>
<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'

  export default {
    data () {
      return {
        firstView: true, // 是否显示第一个界面
        loading: false, // 是否正在请求中
        users: [], // 所有匹配用户的列表/数组
        errorMsg: '', // 需要显示的错误提示文本
      }
    },

    // 启动异步任务: 发ajax请求, 启动定时器, 绑定自定义监听(订阅消息)
    mounted () {
      // 订阅消息(search)
      PubSub.subscribe('search', async (msg, searchName) => {
        // 更新状态数据(请求中)
        this.firstView = false
        this.loading = true
        // 发异步ajax请求获取数据
        const url = `https://api.github.com/search/users2?q=${searchName}`
        try {
          const response = await axios.get(url)
          // 成功了, 更新状态(成功)
          const result = response.data
          const users = result.items.map(item => ({
            username: item.login,
            avatar_url: item.avatar_url,
            url: item.html_url,
          }))
          this.loading = false
          this.users = users
        } catch (error) {
          // 失败了, 更新状态(失败)
          this.loading = false
          this.errorMsg = '请求失败'
        }

      })
    }
  }
</script>
<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>