

const notificationReducer=(state='', action)=>{
  switch(action.type) {
    case 'CREATE' :
      return action.content
    case 'VOTED' :
      return action.content
    default :
      return state
  }
  return state
}

export const notifyCreation=(content)=>{
  return{
    type:'CREATE',
    content: "note "+content + " created"
  }
}
export const notifyVote=(content)=>{
  return{
    type: 'VOTED',
    content: "vote for: " + content
  }
}

export default notificationReducer
