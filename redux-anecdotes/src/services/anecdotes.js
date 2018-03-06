import axios from 'axios'

const url= 'http://localhost:3001/anecdotes'

const getAll= async ()=>{
  const response=await axios.get(url)
  return response.data
}

const create=async (data)=> {
  const response=await axios.post(url, {content: data, votes: 0 })
  return response.data
}

const vote= async (data)=>{
  const response= await axios.put(`${url}/${data.id}`, {...data, votes:data.votes+1})
  return response.data
}

export default {getAll, create, vote}
