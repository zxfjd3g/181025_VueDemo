/*
包含n个直接更新状态数据的方法的对象
 */
import {
  REQUESTING,
  REQ_SUCCESS,
  REQ_ERROR
} from './mutation-types'

export default {

  // 请求中
  [REQUESTING] (state) {
    state.firstView = false
    state.loading = true
  },

  // 请求成功
  [REQ_SUCCESS] (state, users) {
    state.loading = false
    state.users = users
  },

  // 请求失败
  [REQ_ERROR] (state, errorMsg) {
    state.loading = false
    state.errorMsg = errorMsg
  }
}