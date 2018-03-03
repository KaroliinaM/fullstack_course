import React from 'react'
import Note from './components/Note'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'
import PropTypes from 'prop-types'

const Notification =({message}) => {
  if(message===null) {
    return null;
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const LoginForm=({handleSubmit, handleChange, username, password})=> {
  return(
  <div>
    <h2>Kirjaudu</h2>
    <form onSubmit={handleSubmit}>
      <div>
        käyttäjätunnus
        <input
          value={username}
          onChange={handleChange}
          name="username"
        />
      </div>
      <div>
        salasana
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  </div>
)}
LoginForm.propTypes={
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
const NoteForm=({onSubmit, handleChange, value})=> {
  return (
  <div>
    <h2>Luo uusi muistiinpano</h2>

    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={handleChange}
      />
      <button type="submit">tallenna</button>
    </form>
  </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      notes: [],
      newNote: '',
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null,
      loginVisible: false
    }
  }
  componentDidMount() {
    noteService
      .getAll()
      .then(notes => {
        this.setState({notes})
      })
      const loggedUserJSON=window.localStorage.getItem('loggedNoteappUser')
      if (loggedUserJSON) {
        const user=JSON.parse(loggedUserJSON)
        this.setState({user})
        noteService.setToken(user.token)
      }
  }


  addNote = (event) => {
    event.preventDefault()
    this.noteForm.toggleVisibility()
    const noteObject = {
      content: this.state.newNote,
      date: new Date(),
      important: Math.random() > 0.5
    }
    noteService
      .create(noteObject)
      .then(newNote => {
        this.setState({
          notes: this.state.notes.concat(newNote),
          newNote: ''
        })
      })

  }
  login= async (event)=> {
    event.preventDefault()
    try{
      const user=await loginService.login({
        username:this.state.username,
        password:this.state.password
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      this.setState({username:'', password:'', user})
    } catch(exception) {
      this.setState({
        error: 'Käyttäjätunnus tai salasana virheellinen'
      })
      setTimeout(()=> {
        this.setState({error:null})
      }, 5000)
    }
  }
handleNoteChange = (event) => {
  console.log(event.target.value)
  this.setState({newNote: event.target.value})
}
handleLoginFieldChange=(event)=>{
  this.setState({[event.target.name]:event.target.value})
}

toggleVisible = () => {
  this.setState({showAll: !this.state.showAll})
}
toggleImportanceOf = (id) => {
  return () => {
    const note=this.state.notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(changedNote => {
        const notes = this.state.notes.filter(n =>n.id !== id)
        this.setState({
          notes: notes.concat(changedNote)
        })
      })
      .catch(error=> {
        this.setState({
          error: `muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`,
          notes: this.state.notes.filter(n=> n.id !==id)
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      })
  }
}

render() {



  const notesToShow =
    this.state.showAll ?
      this.state.notes :
      this.state.notes.filter(note => note.important===true)

  const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'
  const loginForm=()=>{
    return(
    <div>
    <Togglable buttonLabel="login">
      <LoginForm
        visible={this.state.visible}
        username={this.state.username}
        password={this.state.password}
        handleChange={this.handleLoginFieldChange}
        handleSubmit={this.login}
      />
    </Togglable>
    </div>
    )
  }
  const noteForm=()=>{
    return(
      <div>
        <Togglable buttonLabel="new note" ref={component => this.noteForm = component}>
          <NoteForm
            onSubmit={this.addNote}
            value={this.state.newNote}
            handleChange={this.handleNoteChange}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>

      <h1>Muistiinpanot</h1>
      <Notification message={this.state.error} />
      {this.state.user === null ?
        loginForm() :
        <div>
          <p>{this.state.user.name} logged in </p>
          {noteForm()}
        </div>
      }
      <h2>muistiinpanot</h2>
      <div>
        <button onClick={this.toggleVisible}>
        näytä {label}
        </button>
      </div>
      <ul>
        {notesToShow.map(note=>
          <Note
            key={note.id}
            note={note}
            toggleImportance={this.toggleImportanceOf(note.id)}
            />)}
      </ul>

    </div>
  )
}
}

export default App
