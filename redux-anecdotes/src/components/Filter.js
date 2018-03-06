import React from 'react'
import {connect} from 'react-redux'
import {filterData} from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.filterData(event.target.value)

    // input-kentän arvo muuttujassa event.target.value
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const ConnectFilter=connect(
  null,
  {filterData}
)(Filter)

export default ConnectFilter
