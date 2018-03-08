import React from 'react'
import axios from 'axios'
import Hello from './components/Hello'
import NoteCount from './components/NoteCount'
import styled from 'styled-components'

const Button = styled.button `
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`

const StyledHello = styled(Hello) `
  color: blue;
  font-weight: bold;
`

class App extends React.Component {
  constructor() {
    super()
    this.state={
      counter: 0,
      noteCount: 0
    }
  }
  componentDidMount() {
    axios.get(BACKEND_URL).then(result=>{
      this.setState({noteCount: result.data.length})
    })
    console.log(BACKEND_URL)

  }
  onClick=()=>{
    this.setState({counter: this.state.counter +1})
  }
  render() {
    return(
      <div className="container">
        <NoteCount noteCount={this.state.noteCount} />
        <StyledHello counter={this.state.counter} />
        <Button onClick={this.onClick}>click</Button>
      </div>
    )
  }
}

export default App
