import React from 'react'
import {Badge} from 'react-bootstrap'

const Anecdote=({anecdote})=>(
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has <Badge>{anecdote.votes}</Badge> votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)



export default Anecdote
