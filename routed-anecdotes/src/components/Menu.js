import React from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

const style={
  padding: '10px',
  color: 'black'
}
const activeStyle={
  color: 'white',
  background: 'black',
  padding: '10px'
}

const Menu = () => (
  <div>
    <NavLink style={style} activeStyle={activeStyle} exact to="/">anecdotes</NavLink>&nbsp;
    <NavLink style={style} activeStyle={activeStyle} exact to="/create">create new</NavLink>&nbsp;
    <NavLink style={style} activeStyle={activeStyle} exact to="/about">about</NavLink>&nbsp;
  </div>
)
export default Menu
