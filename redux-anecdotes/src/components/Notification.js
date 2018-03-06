import React from 'react'
import {connect} from 'react-redux'
import {notify} from '../reducers/notificationReducer'

class Notification extends React.Component {


  render() {



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
  {notify}
)(Notification)

export default ConnectNotification
