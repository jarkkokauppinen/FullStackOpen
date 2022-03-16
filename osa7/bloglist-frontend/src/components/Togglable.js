import React, { useState, useImperativeHandle } from 'react'

import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{marginTop: 35, marginLeft: 20, marginBottom: -10}}>
      <h2>Blogs</h2>
      <div style={hideWhenVisible}>
        <Button
          variant='outlined'
          onClick={toggleVisibility}>{props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button
          variant='outlined'
          onClick={toggleVisibility}>cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable