import { Commit, ActionPayload, Dispatch } from 'vuex'
import axios from '../utils/axios'

export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    setList(state: any, group: any[]) {
      state.list = group
    },
  },

  actions: {
    list({ commit }: { commit: Commit }, payload: ActionPayload) {
      return axios
        .get('/group/', { params: { ...payload } })
        .then((res: any) => {
          commit('setList', res.data)
        })
    },
    create(
      { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
      payload: ActionPayload
    ) {
      return axios.post('/group/', { ...payload })
    },
  },
}
