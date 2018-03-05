import React from 'react'
import PropTypes from 'prop-types'

class Notification extends React.Component {
  returnDefault=()=>{
    if(this.context.store.getState().notification !== ''){
      setTimeout(() => {
        this.context.store.dispatch({type:'VOTED', content: ''})
      }, 5000)
    }
  }

  render() {
    this.returnDefault()



    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.context.store.getState().notification}
      </div>
    )
  }
}
Notification.contextTypes={
  store: PropTypes.object
}

export default Notification
