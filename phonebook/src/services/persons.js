import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request= axios.get(baseUrl)
  const nonExisting ={
    id: 10000,
    name: 'ei palvelimella',
    date: '2017-12-10T17:30:31.098Z',
    number: 33333
  }
  return request.then(response =>response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response=>response.data)
}
const deletion = (id) => {
  const request = axios.delete(`http://localhost:3001/persons/${id}`)
  return request.then(response=>response.data)
}


 export default {getAll, create, deletion}
