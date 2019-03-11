## 1. git的6个基本操作
    1). 创建本地仓库
        创建.gitignore配置文件
        git init
        git add *
        git commit -m "xxx"
    2). 创建远程仓库
        New Repository
        指定名称
        创建
    3). 将本地仓库推送到远程仓库
        git remote add origin https://github.com/zxfjd3g/xxx.git 关联远程仓库
        git push origin master
    4). 如果本地有更新, 推送到远程
        git add *
        git commit -m "xxx"
        git push origin master
    5). 如果远程有更新, 拉取到本地
        git pull origin master
        git fetch origin master:tmp
    6). 克隆远程仓库到本地
        git clone https://github.com/zxfjd3g/xxx.git
        git checkout -b dev origin/dev
        
## 2. vue的常用配置选项及其作用(至少5个)
    el: 最外层元素选择器
    props: 声明接收哪些属性
    data: 状态数据
    computed: 计算属性
    methods: 事件回调函数
    watch: 监视属性变化
    directives: 注册局部指令
    filters: 注册局部过滤器
    components: 配置组件

## 3. 说说vue的vm对象/组件对象的生命周期
    1). 初始化
       beforeCreate()
       created()
       beforeMount()
       mounted(): 异步任务(发ajax请求/启动定时器)
    2). 更新
       beforeUpdate()
       updated()
    3). 死亡
       beforeDestroy(): 收尾工作(清除定时器)
       destroyed()

## 4. 写出7个指令及其作用
    v-text: 设置标签体文本
    v-html: 设置标签体子标签
    v-if/v-else/v-show: 显示/隐藏
    v-for: 遍历显示列表
    v-bind: 强制绑定表达式, 简写:
    v-on: 绑定事件监听, 简写@
    v-model: 双向数据绑定

## 5. 写出package.json的基本结构
    {
       "name": "react-demo", // 标识名称
       "version": "1.0.0", // 版本号
       "scripts": { // 打包运行相关的npm命令
          "xxx": "具体命令"   npm run xxx
       },
       dependencies: {}, // 运行时依赖
       devDependencies: {} // 开发时依赖
    }