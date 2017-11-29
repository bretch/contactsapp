import uuidv4 from 'uuid/v4'
import * as mutationTypes from './mutation-types'

export default {
  addPerson ({commit}, person) {
    person.id = uuidv4()
    commit(mutationTypes.ADD_PERSON, person)
    return Promise.resolve({ person })
  },
  addToast ({commit}, toast) {
    toast.id = uuidv4()
    commit(mutationTypes.ADD_TOAST, toast)
    setTimeout(() => {
      commit(mutationTypes.CLOSE_TOAST)
    }, 5000)
  }
}
