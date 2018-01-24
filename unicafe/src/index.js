import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}> {text} </button>
)
const Statistics = ({hyvat, huonot, neutraalit}) =>{
  if((hyvat+huonot+neutraalit)===0)
  {
    return("Ei yhtään palautetta annettu")
  }
else {

return(
 <table>
 <tbody>
 <Statistic
 otsake="Hyvä"
 jaettava={hyvat}
 jakaja={1}
 lukutyyppi="kokonainen"
 />
 <Statistic
 otsake="Neutraali"
 jaettava={neutraalit}
 jakaja={1}
 lukutyyppi="kokonainen"
 />
 <Statistic
 otsake="Huono"
 jaettava={huonot}
 jakaja={1}
 lukutyyppi="kokonainen"
 />
 <Statistic
 otsake="Keskiarvo"
 jaettava={hyvat-huonot}
 jakaja={hyvat+huonot+neutraalit}
 lukutyyppi="murtoluku"
 />
 <Statistic
 otsake="Positiivisia"
 jaettava={hyvat}
 jakaja={hyvat+huonot+neutraalit}
 lukutyyppi="prosenttia"
 />
</tbody>
 </table>

)}}

const Statistic = ({otsake, jaettava, jakaja, lukutyyppi}) =>{
  const otsikko=otsake + " : "

  if((lukutyyppi==="prosenttia"))
  {

return (<tr><td>{otsikko}</td><td>{(100*Math.round(1000* (jaettava/jakaja))/1000) + " prosenttia"}</td></tr>)
}
else if(lukutyyppi==="murtoluku") {
  return(<tr><td>{otsikko}</td><td>{Math.round(10*jaettava/jakaja)/10}</td></tr>)
}
else {
  return(<tr><td>{otsikko}</td><td>{jaettava}</td></tr>)
}
}








class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      huono: 0,
      neutraali: 0,
      keskiarvo: 0
    }
  }

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva +1,

    })
  }
  klikHuono = () => {
    this.setState({
      huono: this.state.huono +1

    })
  }
  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali +1
    })
  }
  render() {
    return (

      <div>
        <h1>Anna palautetta!</h1>
        <div>
          <Button
          handleClick={this.klikHyva}
          text="Hyvä"/>
          <Button
          handleClick={this.klikNeutraali}
          text="Neutraali"/>
          <Button
          handleClick={this.klikHuono}
          text="Huono"/>
        </div>
        <h1>Statistiikka</h1>
        <div>
        <Statistics
        hyvat={this.state.hyva}
        huonot={this.state.huono}
        neutraalit={this.state.neutraali}
        />
        </div>

      </div>

    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
