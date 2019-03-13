## 1. 说说vue项目中如何与后台通信
    1). 通过ajax请求与后台通信
    2). 常用的库有2个
       vue-resource: vue的插件, 用于vue1.x
       axios: 独立的第三方库, 用于vue2.x
    3). 执行请求代码的时机
       初始化异步显示: mounted()
       特定用户操作后异步显示: 事件回调函数或相关函数中
       
## 2. vue-router提供了哪些语法
    1). 1个函数:
      VueRouter: 路由构建函数, 用于创建路由器对象, 配置路由
    2). 2个对象
      $route: 代表当前路由的对象, 包含当前路由相关信息(path, params参数, query参数)
      $router: 代表路由器对象, 包含控制路由跳转的方法(push/replce/back())
    3). 3个标签
      <router-link>: 路由链接, 生成路由链接
      <router-view>: 路由视图, 显示当前路由组件
      <keep-alive>: 缓存路由组件对象

## 3. GET请求的2种请求参数
    query参数: 
       路由path: /register
       请求path: /register?username=xxx&password=yyy   
       获取参数: req.query.username   $route.query.username
    param参数: 
       路由path: /register/:username/:password
       请求path: /register/xxx/123   
       获取参数: req.params.username  $route.params.username

## 4. 说说你对回调函数的理解
    1). 什么函数才是回调函数
       你定义的
       你没有直接调用
       它最终执行了
    2). 回调函数相关的3个问题
       什么时候执行
       用来做什么的
       函数中的this是谁

## 5. 说说开发中常用的ES6新语法
    定义变量/常量: const/let
    解构赋值: let {a, b} = this.props / import {aa} from 'xxx' / function f ({name}) {}
    对象的简洁表达: {a, b, c () {}}
    箭头函数: 
       组件的自定义方法: xxx = () => {}
       匿名函数作为实参
       优点:
          * 简洁
          * 没有自己的this,使用引用this查找的是外部this
    扩展运算符: ...
    类: class/extends/constructor/super
    ES6模块化: export/default/import
    异步: promise, async/await