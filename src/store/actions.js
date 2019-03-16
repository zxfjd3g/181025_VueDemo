/*
包含n个间接更新状态数据的方法的对象
 */
import axios from 'axios'
import {
  REQUESTING,
  REQ_SUCCESS,
  REQ_ERROR
} from './mutation-types'

export default {

  // 搜索的异步action(包含异步代码的action)
  async search({commit}, searchName) {

    // 更新状态数据(请求中)
    commit(REQUESTING)

    // 发送异步ajax请求, 获取users
    const url = `https://api.github.com/search/users?q=${searchName}`
    try {
      const response = await axios.get(url)
      // 成功了, 更新状态(成功)
      const result = response.data
      const users = result.items.map(item => ({
        username: item.login,
        avatar_url: item.avatar_url,
        url: item.html_url,
      }))
      // 成功了, 更新状态数据(成功)
      commit(REQ_SUCCESS, users)
    } catch (error) {
      // 失败了, 更新状态数据(失败)
      commit(REQ_ERROR, '请求失败: '+error.message)
    }
  }
}