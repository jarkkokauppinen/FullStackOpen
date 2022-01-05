import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ALL':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'FILTER':
      return state.filter(anecdote =>
        anecdote.content.toLowerCase().includes(action.text.toLowerCase()))
    default:
      return state
  }
}

export const allAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ALL',
      data: anecdotes
    })
  }
}

export const createNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAction = content => {
  return async dispatch => {
    const voted = await anecdoteService.voteAnecdote(content)
    dispatch({
      type: 'VOTE',
      data: voted,
    })
  }
}

export const filter = (text) => {
  return {
    type: 'FILTER',
    text: text
  }
}

export default reducer