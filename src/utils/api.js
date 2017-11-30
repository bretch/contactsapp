import axios from 'axios'
const API = 'https://djangorest-api.herokuapp.com/persons/'

export const getPersons = () => axios.get(`${API}?format=json`).then(response => response.data)
export const getPerson = (id) => axios.get(`${API}${id}/`).then(response => response.data)
export const addPerson = (data) => axios.post(API, data).then(response => response.data)
export const updatePerson = (id, data) => axios.put(`${API}${id}/`, data).then(response => response.data)
export const deletePerson = (id) => axios.delete(`${API}${id}/`).then(response => response.data)
