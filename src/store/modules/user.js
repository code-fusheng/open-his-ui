// vuex 的 store 引入 api/user 中的用户登录、获取用户信息、用户退出方法
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  permissions: []
}

const mutations = {
  // token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 用户权限
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  // 用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 用户角色
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登陆
  login({ commit }, userInfo) {
    // 从userInfo里面取出username和password
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 调用 API
      login({ username: username.trim(), password: password }).then(response => {
        const { token } = response
        // 放置 token 到 vuex
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用获取用户信息的方法
      getInfo(state.token).then(response => {
        const { username, picture, roles, permissions } = response

        if (!username) {
          reject('用户未登陆,请登陆！')
        }
        commit('SET_ROLES', roles)// 用户角色
        commit('SET_NAME', username)// 用户名
        commit('SET_AVATAR', picture)// 用户头像
        commit('SET_PERMISSIONS', permissions)// 用户权限
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        // 清空 vuex 中的信息
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        resetRouter() // 重置路由
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_PERMISSIONS', [])
      removeToken()
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
