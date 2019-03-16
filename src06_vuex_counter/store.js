/*
vuex最核心的管理(状态数据)对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
相当于data的对象
 */
const state = {
  count: 1, // 指定状态数据的初始值
}

/*
包含n个直接更新状态数据的方法的对象
 */
const mutations = {
  INCREMENT (state) {
    state.count++
  },

  DECREMENT (state) {
    state.count--
  },
}

/*
包含n个间接更新状态数据的方法的对象
 */
const actions = {
  increment ({commit}) {// increment({commit(){}})
    commit('INCREMENT')
  },

  decrement ({commit}) {
    commit('DECREMENT')
  },
  incrementIfOdd ({commit, state}) {// increment({commit(){}, state})
    if (state.count%2===1) {
      commit('INCREMENT')
    }

  },
  incrementAsync ({commit}) { // vuex本身就劫持异步
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  },
}

/*
包含n个getter计算属性方法的对象
 */
const getters = {
  evenOrOdd (state) {
    return state.count%2===0 ? '偶数' : '奇数'
  }
}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})