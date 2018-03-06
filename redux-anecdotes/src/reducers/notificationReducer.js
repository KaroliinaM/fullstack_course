

const notificationReducer=(state='', action)=>{
  switch(action.type) {
    case 'CREATE' :
      return action.content
    default :
      return state
  }
}

export const notifyCreation=(content)=>{
  return{
    type:'CREATE',
    content: "note "+content + " created"
  }
}
export const notifyVote=(content)=>{
  return{
    type: 'CREATE',
    content: "vote for: " + content
  }
}
export const emptyNotification=()=>{
  return{
    type: 'CREATE',
    content: ''
  }
}

export default notificationReducer
