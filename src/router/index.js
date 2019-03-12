/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter) // 内部定义全局组件: router-link/router-view

export default new VueRouter({
  // 应用中所有的路由
  routes,
})