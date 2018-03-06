import React from 'react'

const Note = ({note}) => {
  return(
  <div>
    <h2>{note.content}</h2>
    <div>{note.user}</div>
    <div><strong>{note.important? 'tärkeä' : ''}</strong></div>
  </div>
)}
export default Note
