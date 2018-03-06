import React from 'react'
import {importanceToggling} from './../reducers/noteReducer'
import Note from './Note'
import {connect} from 'react-redux'

const NoteList=(props)=> (
      <ul>
        {props.visibleNotes.map(note=>
          <Note
            key={note.id}
            note= {note}
            handleClick={()=>props.importanceToggling(note.id)}
          />

        )}
      </ul>
    )

const notesToShow=(notes, filter)=> {
  if(filter==='ALL') {
    return notes
  }
  return filter === 'IMPORTANT'
    ? notes.filter(note=>note.important)
    : notes.filter(note=>!note.important)
}

const mapStateToProps=(state)=>{
  return{
    visibleNotes: notesToShow(state.notes, state.filter)
  }
}

const ConnectedNoteList=connect(
  mapStateToProps,
  {importanceToggling}
)(NoteList)


export default ConnectedNoteList
