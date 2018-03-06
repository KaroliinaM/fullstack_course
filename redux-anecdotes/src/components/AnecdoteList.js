import React from 'react'
import {connect} from 'react-redux'
import {voteForAnecdote} from '../reducers/anecdoteReducer'
import {notifyVote} from '../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {
  vote=(anecdote)=>{
    return ()=>{
      this.context.store.dispatch(voteForAnecdote(anecdote.id))
      this.context.store.dispatch(notifyVote(anecdote.content))
    }
  }
  render() {
  console.log(this.props)
   const anecdotes = this.props.anecdotes.filter(a=>a.content.includes(this.props.filter))
    anecdotes.sort(function (a, b) {
      return b.votes - a.votes
    })
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
          {anecdotes.map(anecdote=>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>

    )
  }

}
const mapStateToProps=(state)=>{
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const ConnectedAnecdoteList=connect(
  mapStateToProps

)(AnecdoteList)

export default ConnectedAnecdoteList
