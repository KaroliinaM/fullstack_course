import React from 'react'
import axios from 'axios'



const List=({showCountries})=>{
  if(showCountries.length>10){
    return "liikaa"
  }
  else {
    return "tarpeeksi"
  }

}




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      searchCountry: ''
    }
  }




  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data})
      })
  }
  filterCountry=(event)=>{
    this.setState({searchCountry: event.target.value})
  }

  render() {
    const showCountries=this.state.countries.filter(country=>country.name.includes(this.state.searchCountry))
    return (
      <div>
        <div>
          <input value={this.state.searchCountry} onChange={this.filterCountry}/>
        </div>
        <div>
          {console.log(List({showCountries}))}
        </div>
      </div>


    )
  }
}

export default App
