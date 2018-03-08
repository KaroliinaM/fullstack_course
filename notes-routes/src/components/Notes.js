import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import {Table} from 'react-bootstrap'

const Notes = ({notes}) => (
  <div className="container">
    <h2>Notes</h2>
    <Table>
    <tbody>
      {notes.map(note=>
        <tr key={note.id}>
        <td>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </td>
        <td>
          {note.user}
        </td>
        </tr>
      )}
      </tbody>
    </Table>
  </div>
)
export default Notes
