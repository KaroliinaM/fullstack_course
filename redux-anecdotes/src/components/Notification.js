import React from 'react'
import {connect} from 'react-redux'
import {emptyNotification} from '../reducers/notificationReducer'

class Notification extends React.Component {
  returnDefault=()=>{
    if(this.props.notification !== ''){
      setTimeout(() => {
        this.props.emptyNotification()
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
        {this.props.notification}
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const ConnectNotification=connect(
  mapStateToProps,
  {emptyNotification}
)(Notification)

export default ConnectNotification
