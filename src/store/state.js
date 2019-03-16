/*
包含n个状态属性数据的对象
 */
export default {
  firstView: true, // 是否显示第一个界面
  loading: false, // 是否正在请求中
  users: [], // 所有匹配用户的列表/数组
  errorMsg: '', // 需要显示的错误提示文本
}