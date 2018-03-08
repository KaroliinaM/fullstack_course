import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, Tooltip, OverlayTrigger} from 'react-bootstrap'

const tooltip = (
  <Tooltip id="tooltip">
    Click the title for full anecdote info.
  </Tooltip>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>

        <ListGroupItem key={anecdote.id} >
        <OverlayTrigger placement="top" overlay={tooltip}>
          <Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link>
          </OverlayTrigger>
        </ListGroupItem>

      )}
    </ListGroup>
  </div>
)
export default AnecdoteList
