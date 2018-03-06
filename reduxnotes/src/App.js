import React from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import VisibilityFilter from './components/VisibilityFilter'
import {connect} from 'react-redux'
import {noteInitialization} from './reducers/noteReducer'
import noteService from './services/notes'

class App extends React.Component {
  componentDidMount () {
    this.props.noteInitialization()
  }
  render() {
    return(
      <div>
        <NoteForm />
        <VisibilityFilter />
        <NoteList />
      </div>
    )
  }
}

export default connect(
  null,
  {noteInitialization}
)(App)
