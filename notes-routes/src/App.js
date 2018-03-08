import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import Home from './components/Home'
import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'
import {Alert} from 'react-bootstrap'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [
        {
          id: 1,
          content: 'HTML on helppoa',
          important: true,
          user: 'Matti Luukkainen'
        },
        {
          id: 2,
          content: 'Selain pystyy suorittamaan vain javascriptiä',
          important: false,
          user: 'Matti Luukkainen'
        },
        {
          id: 3,
          content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
          important: true,
          user: 'Arto Hellas'
        }
      ],
      user: null,
      message: ''
    }
  }

  login = (user) => {
    this.setState({user, message: `Welcome ${user}`})
    setTimeout(()=>{
      this.setState({message:null})
    }, 10000)
    this.setState({user})
  }

  render() {
    const noteById = (id) =>
      this.state.notes.find(note => note.id === Number(id))

    return (
      <div className="container">
        <Router>
          <div>
          <Alert color="success">{this.state.message}</Alert>
            <div>
              <Link to="/">home</Link> &nbsp;
              <Link to="/notes">notes</Link> &nbsp;
              <Link to="/users">users</Link> &nbsp;
              {this.state.user
                ? <em>{this.state.user} logged in</em>
                : <Link to="/login">login</Link>
              }
            </div>

            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/notes" render={() => <Notes notes={this.state.notes}/>} />
            <Route exact path="/notes/:id" render={({match}) =>
              <Note note={noteById(match.params.id)} />}
            />
            <Route path="/users" render={() =>
              this.state.user
                ? <Users />
                : <Redirect to="/login" />
              }/>
            <Route path="/login" render={({history}) =>
              <Login history={history} onLogin={this.login}/>}
            />
          </div>
        </Router>
        <div>
          <br />
          <em>Note app, Department of Computer Science 2018</em>
        </div>
      </div>
    );
  }
}

export default App
