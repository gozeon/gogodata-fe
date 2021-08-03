import { Commit, ActionPayload } from 'vuex'
import axios from '../utils/axios'

export default {
  namespaced: true,
  state: {
    token: '',
    username: '',
  },
  mutations: {
    setToken(state: any, token: string) {
      state.token = token
    },
    setUsername(state: any, username: string) {
      state.username = username
    },
  },

  actions: {
    login({ commit }: { commit: Commit }, payload: ActionPayload) {
      return axios.post('/auth/login', { ...payload }).then((res: any) => {
        const token = res.data.token
        localStorage.setItem(import.meta.env.VITE_TOKEN_KEY + '', token)
        commit('setToken', token)
      })
    },
    me({ commit }: { commit: Commit }, payload: ActionPayload) {
      return axios.get('/auth/me').then((res: any) => {
        commit('setUsername', res.data?.user)
      })
    },
  },
}
