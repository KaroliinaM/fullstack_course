import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ',state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE' :
      const voted=state.find(a=>a.id===action.id)
      const voteAdded={...voted, votes: voted.votes+1}
      return state.map(a=> a.id!==action.id ? a : voteAdded)
    case 'NEW' :
      return state.concat(action.data)
    case 'INIT' :
      return action.data
    default :
      return state
  }
}

export const createAnecdote=(content)=>{
  return async (dispatch)=>{
    const newAnecdote=await anecdoteService.create(content)
    dispatch({
        type: 'NEW',
        data: newAnecdote
      })
  }
}
export const voteForAnecdote=(anecdote)=>{
  return async (dispatch)=>{
    const vote=await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      id:anecdote.id
    })
  }

}
export const anecdotesInit=()=>{
  return async(dispatch)=> {
    const anecdotes= await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }


}

export default anecdoteReducer
