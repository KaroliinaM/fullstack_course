

const notificationReducer=(state='', action)=>{
  switch(action.type) {
    case 'NOTIFY' :
      return action.content
    default :
      return state
  }
}

export const notify=(content)=>{
  return async(dispatch)=>{
  dispatch({
    type:'NOTIFY',
    content
  })
  setTimeout(() => {
    dispatch({
      type:'NOTIFY',
      content: ''
    })
  }, 5000)
}

}

export default notificationReducer
