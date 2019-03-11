<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :deleteTodo="deleteTodo"/>
      <Footer :todos="todos" :clearCompleteTodos="clearCompleteTodos" :selectAll="selectAll"/>
    </div>
  </div>
</template>
<script>
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'

  export default {
    data () {
      return {
        todos: [
          {title: '吃饭', complete: false},
          {title: '睡觉', complete: true},
          {title: '打代码', complete: false},
        ]
      }
    },

    methods: {
      // 添加todo
      addTodo (todo) {
        this.todos.unshift(todo)
      },
      // 删除todo
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },

      // 清除所有已完成的todo
      clearCompleteTodos () {
        this.todos = this.todos.filter(todo => !todo.complete)
      },

      // 对所有todo进行全选/全不选
      selectAll (check) {
        this.todos.forEach(todo => todo.complete = check)
      }
    },

    components: {
      Header,
      List,
      Footer
    }
  }
</script>
<style scoped>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>