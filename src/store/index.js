import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import tree from './modules/tree'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tree
  },
  getters
})

export default store
