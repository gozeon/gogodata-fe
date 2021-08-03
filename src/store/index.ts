import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import app from './app'
import auth from './auth'
import group from './group'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    auth,
    group,
  },
})
