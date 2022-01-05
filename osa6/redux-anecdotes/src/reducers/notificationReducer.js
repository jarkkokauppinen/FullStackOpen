const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return action.message
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'SET_MESSAGE',
        message: '',
      })
    }, time * 500)
    
    dispatch({
      type: 'SET_MESSAGE',
      message: message,
    })
  }
}

export default reducer