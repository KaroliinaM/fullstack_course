import React from 'react'
import NoteForm from './NoteForm'
import PropTypes from 'prop-types'
import NoteList from './NoteList'

class App extends React.Component {


  render() {
    return(
      <div>
        <NoteForm />
        <NoteList />
      </div>
    )
  }
}

export default App
