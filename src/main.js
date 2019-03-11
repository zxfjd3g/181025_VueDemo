import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

// 声明使用vue插件
Vue.use(VueResource) // 内部给vm和所有组件对象添加了一个属性: $http, 可以用它来发送ajax请求


new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />'

})
