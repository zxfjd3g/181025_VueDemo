<template>
  <div>
    <ul>
      <li v-for="m in messages" :key="m.id">
        <router-link :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
        &nbsp;&nbsp;<button @click="pushShow(m.id)">push查看</button>
        &nbsp;&nbsp;<button @click="replaceShow(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <hr>
    <router-view/>
  </div>
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
    },

    methods: {
      pushShow (id) {
        // this.$router.push(`/home/message/detail/${id}`)
        this.$router.push({ name: 'detail', params: {id}})
      },

      replaceShow (id) {
        this.$router.replace(`/home/message/detail/${id}`)
      }
    }
  }
</script>
<style scoped>

</style>