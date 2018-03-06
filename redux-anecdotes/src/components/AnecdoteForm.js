import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  addAnecdote=async (event)=>{
    event.preventDefault()
    const content=event.target.anecdote.value
    event.target.anecdote.value= ''
    this.props.createAnecdote(content)
    this.props.notify(`Anecdote ${content} created`)

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
const ConnectAnecdoteForm=connect(
  null,
  {createAnecdote, notify}
)(AnecdoteForm)

export default ConnectAnecdoteForm
