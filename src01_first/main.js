/*
入口JS
 */
import Vue from 'vue'
import App from './App.vue'

import HelloWorld from './components/HelloWorld.vue'

// 注册全局组件
Vue.component('HelloWorld', HelloWorld)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
