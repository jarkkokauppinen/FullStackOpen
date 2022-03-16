const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SETMESSAGE':
      return action.message
    case 'RESETMESSAGE':
      return action.message
    default:
      return state
  }
}

export const setMessage = (message) => {
  return {
    type: 'SETMESSAGE',
    message: message
  }
}

export const resetMessage = () => {
  return {
    type: 'RESETMESSAGE',
    message: ''
  }
}

export default notificationReducer