<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认"
           @keyup.enter="add" v-model="title"/>
  </div>
</template>
<script>
  export default {
    // 声明接收属性: 属性名/属性值的类型/属性的必要性
    props: {
      addTodo: {
        type: Function,
        required: true
      }
    },

    data () {
      return {
        title: ''
      }
    },

    methods: {
      add () {
        // 1. 收集输入数据
        const title = this.title.trim()
        // 2. 对输入数据进行检查
        if(!title) {
          alert('必须输入')
          return
        }
        // 3. 封装成todo对象
        const todo = {
          title,
          complete: false
        }
        // 4. 调用更新函数添加todo
        this.addTodo(todo)
        // 5. 清除输入
        this.title = ''
      }
    }
  }
</script>
<style scoped>
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>