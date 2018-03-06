import React from 'react'
import {connect} from 'react-redux'
import {voteForAnecdote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'
import Filter from './Filter'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  render() {

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
          {this.props.filteredAnecdotes.map(anecdote=>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={vote(anecdote, this.props)}>vote</button>
            </div>
          </div>
        )}
      </div>

    )
  }

}
const vote=(anecdote, props)=>{
  return async ()=>{
    props.voteForAnecdote(anecdote)
    props.notify(`Vote for ${anecdote.content}`)
  }
}

const createAnecdoteList=(anecdotes, filter)=>{
  const anecdoteList=anecdotes.filter(a=>a.content.includes(filter))
  anecdoteList.sort(function (a, b) {
    return b.votes - a.votes
  })
  return anecdoteList
}
const mapStateToProps=(state)=>{
  return {
    filteredAnecdotes: createAnecdoteList(state.anecdotes, state.filter),
    notification: state.notification

  }
}

const ConnectedAnecdoteList=connect(
  mapStateToProps,
  {voteForAnecdote, notify}
)(AnecdoteList)

export default ConnectedAnecdoteList
