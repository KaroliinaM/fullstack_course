import React from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Number=({p, deleteThis})=> {
  return (
  <tr><td>{p.name}</td><td>{p.number}</td><td><button onClick={deleteThis}>poista</button></td></tr>
  )
}

const Input=({label, value, changed, name})=><div>{label}<input value={value} onChange={changed} name={name} /></div>
const Header=({level, text})=>{
  switch(level) {
    case "2": return (<h2>{text}</h2>)
    case "3": return (<h3>{text}</h3>)
    default: return (<h1>{text}</h1>)
    }
}
const Notification =({messageText, type})=> {
  if (messageText===null){
    return null;
  }
  else if (type==='alert')
  {
    return(
      <div className="alert">
        {messageText}
      </div>
    )
  }
  else {
    return (
      <div className="msg">
        {messageText}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      newSearch: '',
      showAll: true,
      message: null,
      messageType: 'msg'
    }
  }
  showMessage=(message, type)=> {
    this.setState({
      message: message,
      messageType: type
    })
    setTimeout(() => {
      this.setState({message: null})
    }, 5000)
  }



  addObject=()=>{
      const contactObject={
        name: this.state.newName,
        number: this.state.newNumber
      }

      personService
        .create(contactObject)
        .then(newContact => {
          this.setState({
            persons: this.state.persons.concat(newContact),
            newName: '',
            newNumber: ''
          })

          this.showMessage(`${newContact.name} lisätty`, 'msg')

        })

      console.log("nappi toimii")
    }
    changeNumber=()=>{


        if(window.confirm(`${this.state.newName} on jo luettelossa, korvataanko yhteystiedot`)) {
        const double=this.state.persons.find(person=>person.name===this.state.newName)
                      console.log(double)
        const url = `http://localhost:3001/persons/${double.id}`
        const person=this.state.persons.find(p=> p.id===double.id)
        const changedContact={...person, number: this.state.newNumber}


        personService
          .update(person.id, changedContact)
          .then(changedContact => {
            const persons=this.state.persons.filter(p=>p.id!==person.id)
            this.setState({
              persons: persons.concat(changedContact)
            })
            this.showMessage(`${changedContact.name} tietoja muokattu`, 'msg')
          })
        }

    }
    deleteObject=(id, name)=> {
      return()=>{
      if(window.confirm(`poistetaanko ${name}`))
      {
        const url = `http://localhost:3001/persons/${id}`
        personService
          .deletion(id)
          .then(response => {
            this.setState({
              persons:this.state.persons.filter(person=>person.id !== id)
            })
            this.showMessage(`${name} poistettu`, 'msg')
          })
          .catch(error => {
            this.showMessage(`henkilöä ${name} ei enää löytynyt palvelimelta`, 'alert')
            this.setState({persons: this.state.persons.filter(person =>person.id !== id)})
          })
      }
    }

    }



  addNumber=(event)=> {
    event.preventDefault()
    this.state.persons.map(person=>person.name).includes(this.state.newName) ?
        this.changeNumber() :
      this.addObject()

}
  handleInput=(event)=> {
    console.log(this.state.newName)
    switch(event.target.name){
      case 'nimi': this.setState({newName: event.target.value})
        break
      case 'number': this.setState({newNumber: event.target.value})
        break
      default:
    }

  }
  searchPerson=(event)=>{
    console.log(this.state.newSearch)
    this.setState({newSearch: event.target.value})
    this.setState({showAll: false})

  }
  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  render() {
    const showPersons =
      this.state.showAll ?
        this.state.persons :
        this.state.persons.filter(person=>person.name.includes(this.state.newSearch))

        console.log(showPersons)

    return (


      <div>
        <Header
          level="2"
          text="puhelinluettelo"
        />
        <Notification messageText={this.state.message} type={this.state.messageType} />
        <form onSubmit={this.addNumber}>
          <Input
            label="Rajaa näytettäviä: "
            value={this.state.newSearch}
            changed={this.searchPerson}
            name="haku"
          />
          <Header
            level="3"
            text="Lisää uusi"
          />
          <Input
            label="nimi: "
            value={this.state.newName}
            changed={this.handleInput}
            name="nimi"
            />
          <Input
            label="numero: "
            value={this.state.newNumber}
            changed={this.handleInput}
            name="number"
            />
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Header
          level="2"
          text="Numerot"
        />
        <div>
          <table>
          <tbody>
            {console.log(this.state.persons)}
           {showPersons.map(person=><Number key={person.name} p={person} deleteThis={this.deleteObject(person.id, person.name)} />)}
           </tbody>
          </table>
        </div>

      </div>
    )
  }
}
export default App
