import Vue from 'vue'
import App from './App.vue'

import store from './store'


new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />',
  store, // 注册vuex的store  ==> 所有组件对象都有一个属性$store
})
