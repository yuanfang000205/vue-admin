export default {
  state: {
    isCollapse: false,
    currentMenu: null,
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  },
  mutations: {
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu (state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        const result = state.tabList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabList.push(val)
        } else {
          state.currentMenu = null
        }
      }
    },
    closeTag (state, val) {
      const result = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(result, 1)
    }
  }
}
