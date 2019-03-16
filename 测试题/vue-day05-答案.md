## 1. 说说vue数据代理
    1). 是什么?
       通过vm对象来代理data对象中所有属性的操作
    2). 作用:
       简化操作vm中的data对象中的数据
    3). 实现基本原理
       1). 通过Object.defineProperty()给vm添加与data对象的属性对应的属性描述符
       2). 所有添加的属性都包含getter/setter
       3). 在getter/setter内部去操作data中对应的属性数据
       
## 2. 说说vue模板解析
    1). 目的
       实现初始化显示
    2). 整体流程
       1). 将el的所有子节点取出, 添加到一个新建的文档fragment对象中
       2). 对fragment中的所有层次子节点递归进行编译解析处理
       3). 将解析后的fragment添加到el中显示
    3). 编译/解析包含大括号表达式的文本节点: textNode.textContent = value
    4). 编译事件指令: elementNode.addEventListener('eventName', callback)
    5). 编译一般指令: elementNode.xxx = value
    
## 3. 说说vue数据绑定的理解和基本原理
    1). 作用:
       实现数据的更新显示
    2). 基本原理:
       a.通过Object.defineProperterty()给data中所有属性添加setter/getter, 实现数据劫持
       b.为每个data中的属性创建一个对应的dep对象, 一旦属性数据变化, 通知dep对象
       c.为模板中的每个表达式创建对应的watcher, 并关联到对应的dep上
       d.一旦dep收到数据变化的通知, 会通知所有关联的watcher, watcher收到通知后就更新对应的节点
       
## 4. 说说vue双向数据绑定的基本原理
    1). 双向数据绑定是建立在单向数据绑定(model==>View)的基础之上的
    2). 双向数据绑定的实现流程:
        a. 在解析v-model指令时, 给当前元素添加input监听
        b. 当input的value发生改变时, 将最新的值赋值给当前表达式所对应的data属性
        
## 5. Vue的MVVM实现结构图
![](https://i.imgur.com/vpy6Wme.png)