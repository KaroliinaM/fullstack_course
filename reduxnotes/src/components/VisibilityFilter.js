import React from 'react'
import PropTypes from 'prop-types'
import {filterChange} from '../reducers/filterReducer'

class VisibilityFilter extends React.Component {
  componentDidMount(){
    const {store} =this.context
    this.unsubscribe=store.subscribe(()=>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  filterSelected=(value)=>()=>{
    this.context.store.dispatch(filterChange(value))
  }
  render() {
    return (
      <div>
        kaikki    <input type="radio" name="filter" onChange={this.filterSelected('ALL')} />
        tärkeät    <input type="radio" name="filter" onChange={this.filterSelected('IMPORTANT')} />
        ei tärkeät  <input type="radio" name="filter" onChange={this.filterSelected('UNIMPORTANT')} />
      </div>
    )
  }
}

VisibilityFilter.contextTypes={
  store: PropTypes.object
}

export default VisibilityFilter
