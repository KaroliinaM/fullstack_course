import React from 'react'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'


const Login = ({onLogin, history}) => {
  const onSubmit = (event) => {
    event.preventDefault()
    onLogin('mluukkai')
    history.push('/')
  }
  return (
  <div>
    <h2>login</h2>
    <form onSubmit={onSubmit}>
    <FormGroup>
    <ControlLabel>username:</ControlLabel>
    <FormControl type="text" name="username" />
    <ControlLabel>password:</ControlLabel>
     <FormControl type="password" />
    <Button bsStyle="success" type="submit">login</Button>
      </FormGroup>
    </form>
  </div>
)}

export default Login
