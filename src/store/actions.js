import uuidv4 from 'uuid/v4'
import * as mutationTypes from './mutation-types'
import * as api from './../utils/api'

export default {
  async getPersons ({commit}) {
    commit(mutationTypes.TOGGLE_LOADING)
    const persons = await api.getPersons().catch(e => console.log(e))
    commit(mutationTypes.RECEIVE_PERSONS, persons || [])
    commit(mutationTypes.TOGGLE_LOADING)
  },
  async addPerson ({commit}, data) {
    commit(mutationTypes.TOGGLE_LOADING)
    const person = await api.addPerson(data).catch(e => console.log(e))
    commit(mutationTypes.ADD_PERSON, person)
    commit(mutationTypes.TOGGLE_LOADING)
    return Promise.resolve({ person })
  },
  async updatePerson ({commit}, data) {
    commit(mutationTypes.TOGGLE_LOADING)
    const person = await api.updatePerson(data.id, data).catch(e => console.log(e))
    commit(mutationTypes.UPDATE_PERSON, person)
    commit(mutationTypes.TOGGLE_LOADING)
    return Promise.resolve({ person })
  },
  async deletePerson ({commit}, id) {
    commit(mutationTypes.TOGGLE_LOADING)
    const response = await api.deletePerson(id).catch(e => console.log(e))
    commit(mutationTypes.DELETE_PERSON, id)
    commit(mutationTypes.TOGGLE_LOADING)
    return Promise.resolve({ response })
  },
  addToast ({commit}, toast) {
    toast.id = uuidv4()
    commit(mutationTypes.ADD_TOAST, toast)
    setTimeout(() => {
      commit(mutationTypes.CLOSE_TOAST)
    }, 5000)
  }
}
