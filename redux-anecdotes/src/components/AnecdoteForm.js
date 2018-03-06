import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {notifyCreation} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  addAnecdote=async (event)=>{
    event.preventDefault()
    const content=event.target.anecdote.value
    event.target.anecdote.value= ''
    const newAnecdote=await anecdoteService.create(content)
    this.props.createAnecdote(content)
    this.props.notifyCreation(content)

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
  {createAnecdote, notifyCreation}
)(AnecdoteForm)

export default ConnectAnecdoteForm
