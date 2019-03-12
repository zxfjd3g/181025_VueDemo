<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Router Basic - 01</h2></div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!--<a href="#/about" class="list-group-item router-link-exact-active activeClass">About</a>
          <a href="#/home" class="list-group-item">Home</a>-->
          <!--路由链接-->
          <router-link class="list-group-item" to="/about">About</router-link>
          <router-link class="list-group-item" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!--缓存路由组件对象-->
            <keep-alive>
              <!--将当前路由组件显示在此-->
              <router-view msg="abc"/>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

    methods: {
      data () {
        return {
          abc: 'atguigu'
        }
      }
    }
  }
</script>
<style scoped>

</style>