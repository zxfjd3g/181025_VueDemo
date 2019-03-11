<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isSelectAll"/>
    </label>
    <span>
          <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
        </span>
    <button class="btn btn-danger" v-show="completeSize" @click="clearCompleteTodos">清除已完成任务</button>
  </div>
</template>
<script>
  export default {
    // 当前组件需要接收哪些属性
    props: {
      todos: Array,
      clearCompleteTodos: Function,
      selectAll: Function
    },
    computed: {
      completeSize () {
        return this.todos.reduce((pre, todo) => pre + (todo.complete ? 1 : 0), 0)
      },
      isSelectAll: {
        get () {
          return this.todos.length===this.completeSize && this.completeSize>0
        },

        set (value) { // value是true/false
          this.selectAll(value)
        }
      }
    }
  }
</script>
<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>