import React from 'react'

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
      <div>
        username: <input />
      </div>
      <div>
        password: <input type='password'/>
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)}

export default Login
