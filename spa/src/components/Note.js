import React from 'react'

const Note = ({note, toggleImportance}) => {
  const label = note.important ? 'make unimportant' : 'make important'
  return (
    <li className="note"><div className="content">{note.content}</div> <button onClick={toggleImportance}>{label}</button></li>
  )
}

export default Note
