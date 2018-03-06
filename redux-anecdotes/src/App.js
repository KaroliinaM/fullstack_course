import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import {connect} from 'react-redux'
import {anecdotesInit} from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'


class App extends React.Component {
  componentDidMount=async()=>{
    const anecdotes= await anecdoteService.getAll()
    this.props.anecdotesInit(anecdotes)
  }
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


export default connect(
  null,
  {anecdotesInit}

)(App)
