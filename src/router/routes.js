/*
包含所有路由的数组模块
 */
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Message from '../views/Message.vue'

export default [
  {
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/news',
        component: News
      },
      {
        path: 'message',  // path最左边的/代表项目根路径
        component: Message
      },
      {
        path: '',
        redirect: '/home/news'
      }
    ]
  },
  {
    path: '/', // /代表项目的根路径
    redirect: '/about' // 自动跳转到指定路径
  }
]