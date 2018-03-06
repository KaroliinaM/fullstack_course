import React from 'react'
import PropTypes from 'prop-types'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {notifyCreation} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  addAnecdote=(event)=>{
    event.preventDefault()
    const content=event.target.anecdote.value
    this.context.store.dispatch(createAnecdote(content))
    this.context.store.dispatch(notifyCreation(content))
    event.target.anecdote.value= ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}
AnecdoteForm.contextTypes ={
  store: PropTypes.object
}

export default AnecdoteForm
