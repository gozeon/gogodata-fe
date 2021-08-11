import { Commit, ActionPayload, Dispatch } from 'vuex'
import axios from '../utils/axios'

export default {
  namespaced: true,
  state: {
    list: [],
    info: [],
  },
  mutations: {
    setList(state: any, group: any[]) {
      state.list = group
    },
    appendInfo(state: any, group: any) {
      state.info = [group, ...state.info]
    },
  },
  getters: {
    getInfoById: (state: any) => (id: any) => {
      return state.info.find((group: any) => group.ID === +id)
    },
  },
  actions: {
    list({ commit }: { commit: Commit }, payload: ActionPayload) {
      return axios.get('/ds/', { params: { ...payload } }).then((res: any) => {
        commit('setList', res.data)
        return res
      })
    },
    create(
      { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
      payload: ActionPayload
    ) {
      return axios.post('/ds/', { ...payload })
    },
    del(
      { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
      payload: any
    ) {
      return axios.delete(`/ds/${payload?.ID}`)
    },
    update(
      { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
      payload: any
    ) {
      return axios.put(`/ds/${payload?.ID}`, { ...payload })
    },
    info(
      { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
      payload: any
    ) {
      const { id } = payload
      // TODO: cache增强

      return axios.get(`/ds/${id}`).then((res) => {
        commit('appendInfo', res.data)
        return res
      })
    },
  },
}
