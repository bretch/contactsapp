import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.UPDATE_QUERY] (state, query) {
    state.query = query.toLowerCase()
  },
  [mutationTypes.ADD_PERSON] (state, person) {
    state.persons.push(person)
  },
  [mutationTypes.UPDATE_PERSON] (state, person) {
    const index = state.persons.findIndex(p => p.id === person.id)
    state.persons[index] = person
  },
  [mutationTypes.DELETE_PERSON] (state, id) {
    const index = state.persons.findIndex(p => p.id === id)
    state.persons.splice(index, 1)
  },
  [mutationTypes.ADD_TOAST] (state, toast) {
    state.toast = toast
  },
  [mutationTypes.CLOSE_TOAST] (state) {
    state.toast = {id: null}
  }
}
