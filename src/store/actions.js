import uuidv4 from 'uuid/v4'
import * as mutationTypes from './mutation-types'

export default {
  addPerson ({commit}, person) {
    person.id = uuidv4()
    commit(mutationTypes.ADD_PERSON, person)
    return Promise.resolve({ person })
  }
}
