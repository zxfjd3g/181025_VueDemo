/*
包含了n个操作local数据的工具函数模块
 */
const TODOS_KEY = 'todos_key'
export default {
  // 保存todos
  saveTodos (todos) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  },
  // 获取todos
  getTodos () {
    return JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
  }
}