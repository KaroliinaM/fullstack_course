import React from 'react'
import PropTypes from 'prop-types'

class Filter extends React.Component {
  handleChange = (event) => {
    this.context.store.dispatch({type:'FILTER', data: event.target.value})

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
Filter.contextTypes={
  store: PropTypes.object
}

export default Filter
