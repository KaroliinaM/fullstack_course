import React from 'react'
import axios from 'axios'



const List=({countries, tf})=>{
  if(countries.length>10){
    return "Too many matches, specify another filter"
  }
  else if(countries.length===1)
  {
    return <Allinfo country={countries[0]}  />
  }
  else {
    return (countries.map(country=><Showcountry key={country.name} country={country} func={tf} />))
  }
}
const Showcountry =({country, func})=> <div onClick={()=>func(country.name)} >{country.name}<br /></div>


const Allinfo=({country}) =>{

console.log("clicked")
  return (


    <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <img alt="lippu" src={country.flag} width="50%" height="50%" />
    </div>
  )
  }












class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      shownList:[],
      countryInfo: '',
      searchCountry: ''
    }
  }
  klikattuMaata=(name)=>{
    console.log(`Klikattu ${name}`)
    this.setState({searchCountry: name.toLowerCase()})

}






  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data})
      })
  }
  filterCountry=(event)=>{
    this.setState({searchCountry: event.target.value.toLowerCase()})
  }


  render() {

    const listShown=this.state.countries.filter(country=>country.name.toLowerCase().includes(this.state.searchCountry))

    return (
      <div>
        <div>
        Find countries: <input value={this.state.searchCountry} onChange={this.filterCountry}/>
        </div>
        <div>
          <List
            countries={listShown}
            tf={this.klikattuMaata}
           />
        </div>
      </div>


    )
  }
}

export default App
