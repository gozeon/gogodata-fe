import { Commit, ActionPayload } from 'vuex'

export default {
  namespaced: true,
  state: {
    name: 'GOGO DATA',
    menuConfig: {
      menus: [
        {
          title: '控制台',
          icon: 'el-icon-s-home',
          route: { name: 'Dashboard.Home' },
        },
      ],
      collapse: false,
    },
  },
  mutations: {
    menuToggleCollapse(state: any) {
      state.menuConfig.collapse = !state.menuConfig.collapse
    },
  },
}
