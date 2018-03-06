import React from 'react'
import {noteCreation} from './../reducers/noteReducer'
import {connect} from 'react-redux'

class NoteForm extends React.Component {

  addNote=(event)=>{
    event.preventDefault()

    this.props.createTodo(event.target.note.value)

    event.target.note.value=''
  }
  render() {
    return(
      <form onSubmit={this.addNote}>
        <input name="note" />
        <button>lisää</button>
      </form>
    )
  }

}

const mapDispatchToProps=(dispatch)=>{
  return{
    createTodo: (value) =>{
      dispatch(noteCreation(value))
    }
  }
}

const ConnectedNoteForm=connect(
  null,
  mapDispatchToProps
)(NoteForm)

export default ConnectedNoteForm
