import React from 'react'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import About from './components/About'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Jumbotron, Button} from 'react-bootstrap'

const headerStyle={
  color:'Olive',
  padding:'20px'
}
const style={
  background:'LavenderBlush'
}


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: '',
      notificationStyle: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    console.log(anecdote)
    this.notify(`A new anecdote ${anecdote.content} created!`, 'create')
    setTimeout(()=>{
      this.notify('', 'empty')
    }, 5000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
  notify=(teksti, type)=>{
    this.setState({notification: teksti, notificationStyle: type})
  }

  render() {
    return (
      <div className="container" style={style}>

        <Router>

        <div >

        <h1 style={headerStyle}>Software anecdotes</h1>
        <Menu />

          <Notification notification={this.state.notification} type={this.state.notificationStyle}/>
          <Route exact path="/" render={()=>
            <AnecdoteList anecdotes={this.state.anecdotes} />}
          />
          <Route path="/anecdotes/:id" render={({match})=>
           <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
          />
          <Route path="/about" render={()=> <About />} />
          <Route path="/create" render={({history})=>
            <CreateNew history={history} addNew={this.addNew}/>}
          />
        <Footer />
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
