import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import loginUser from './modules/loginUser'
import book from './modules/book'
import user from './modules/user'
import manager from './modules/manager'
import category from './modules/category'
import dashboard from './modules/dashboard'
// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    loginUser,
    permission,
    book,
    user,
    manager,
    category,
    dashboard
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
