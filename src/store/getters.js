const sortPersons = (persons) => persons.sort(({firstname: name1}, {firstname: name2}) => {
  if (name1.toLowerCase() < name2.toLowerCase()) return -1
  if (name1.toLowerCase() > name2.toLowerCase()) return 1
  return 0
})
const filterPerson = ({firstname, lastname, phoneNumbers, emailAddresses}, query) => {
  if (!query) return true
  return firstname.toLowerCase().indexOf(query) > -1 ||
        lastname.toLowerCase().indexOf(query) > -1 ||
        phoneNumbers.find(({value}) => value.indexOf(query) > -1) ||
        emailAddresses.find(({value}) => value.indexOf(query) > -1)
}

export default {
  getPersonById: ({persons}) => id => persons.find(person => person.id === id),
  sortedByAlphabet: ({persons, query}) => {
    const filteredPersons = persons.filter(person => filterPerson(person, query))
    let sorted = {}
    for (let charCode = 97; charCode < 123; charCode++) {
      let letter = String.fromCharCode(charCode)
      let items = filteredPersons.filter(({firstname: [firstChar]}) => firstChar.toLowerCase() === letter)
      if (items.length) sorted[letter.toUpperCase()] = sortPersons(items)
    }
    return sorted
  }
}
