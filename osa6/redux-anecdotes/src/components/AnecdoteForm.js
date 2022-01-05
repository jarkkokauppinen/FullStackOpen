import React from 'react'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Form = (props) => {
  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.new.value
    event.target.new.value = ''
    props.createNew(content)
    props.setNotification(`new anecdote '${content}'`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addNew}>
          <div><input name='new'/></div>
          <button type='submit'>create</button>
        </form>
    </div>
  )
}

const mapDispatchToProps = {
  createNew, setNotification
}

export default connect(null, mapDispatchToProps)(Form)