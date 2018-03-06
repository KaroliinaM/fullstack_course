import React from 'react';
import {createAnecdote, voteForAnecdote} from './reducers/anecdoteReducer'
import PropTypes from 'prop-types'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import {notifyCreation, notifyVote} from './reducers/notificationReducer'

class App extends React.Component {
  render() {
    return (
      <div>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}
App.contextTypes={
  store: PropTypes.object
}

export default App
