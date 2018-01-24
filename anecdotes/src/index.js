import React from 'react';
import ReactDOM from 'react-dom';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 1,
      votes:[0, 0, 0, 0, 0, 0]
    }
  }
  seuraava =() => this.setState({selected:Math.floor(Math.random() * 6 )})
  voting= () => this.setState({votes: this.vote()})

  vote=()=>{
    const taulukko=this.state.votes
    taulukko[this.state.selected]=taulukko[this.state.selected]+1
    return taulukko
  }
  suosituin=()=>{
    let suurin=-1
    let eniten=0
    this.state.votes.forEach(function(item, index, array){
      if(item>eniten){
        eniten=item
        suurin=index
      }
    })
    if(suurin<0)    {
      return ("no votes yet")
    }
    else {
      return (this.props.anecdotes[suurin])
    }
  }

  render() {
    return (
      <div>
      <div>
        {this.props.anecdotes[this.state.selected]} <br />
        has {this.state.votes[this.state.selected]} votes
        </div>
        <div>
          <button onClick={this.seuraava}>next anecdote</button>
          <button onClick={this.voting}>vote</button>
        </div>
        <div>
          <h1>Anecdote with most votes:</h1>
          {this.suosituin()}
        </div>
      </div>
    )
  }
}
const anecdotes = [
  'If it hurts, do it more often',
'Adding manpower to a late software project makes it later!',
'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
'Premature optimization is the root of all evil.',
'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
