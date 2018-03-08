import React from 'react'
const notificationStyle=(type)=>{
  if(type==='create'){
    return {
      color: 'green',
      padding: '5px',
      border: 'solid'
    }
  } else {
    return {
      border: 'none'
    }
  }
}
const Notification=({notification, type})=>(
  <div style={notificationStyle(type)}>
    {notification}
  </div>
)
export default Notification
