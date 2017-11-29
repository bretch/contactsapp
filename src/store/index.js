import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import countries from './../data/countries.json'

Vue.use(Vuex)

const state = {
  query: '',
  countries,
  persons: [],
  toast: {id: null}
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
