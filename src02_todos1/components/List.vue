<template>
  <!--组件中模板读取数据的来源都是: 组件对象-->
  <ul class="todo-main">
    <Item v-for="(todo, index) in todos" :key="index"
          :todo="todo" :deleteTodo="deleteTodo" :index="index"/>
  </ul>
</template>
<script>
  import Item from './Item.vue'
  export default {
    // 声明接收标签属性: 属性名
    // 组件接收的标签属性会自动成为组件对象的属性
    props: ['todos', 'deleteTodo'],


    components: {
      Item
    }
  }
</script>
<style scoped>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>