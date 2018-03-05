import React from 'react';
import {createAnecdote, voteForAnecdote} from './reducers/anecdoteReducer'
import PropTypes from 'prop-types'
import Notification from './components/Notification'
import Filter from './components/Filter'
import {notifyCreation, notifyVote} from './reducers/notificationReducer'

class App extends React.Component {
  addAnecdote=(event)=>{
    event.preventDefault()
    const content=event.target.anecdote.value
    this.context.store.dispatch(createAnecdote(content))
    this.context.store.dispatch(notifyCreation(content))
    event.target.anecdote.value= ''
  }
  vote=(anecdote)=>{
    return ()=>{
      //this.context.store.dispatch({type: 'VOTE', id: anecdote.id})
      this.context.store.dispatch(voteForAnecdote(anecdote.id))
      this.context.store.dispatch(notifyVote(anecdote.content))
    }
  }
  render() {
    console.log(this.context.store.getState())
    const anecdotes = this.context.store.getState().anecdotes.filter(a=>a.content.includes(this.context.store.getState().filter))
    anecdotes.sort(function (a, b) {
      return b.votes - a.votes;
    });
    return (
      <div>
        <Notification />

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
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}
App.contextTypes={
  store: PropTypes.object
}

export default App
