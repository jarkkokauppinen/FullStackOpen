import React, { useEffect, useState } from 'react'
import { Alert as Success } from '@material-ui/lab'
import { Alert as Error } from '@material-ui/lab'

const Notification = ({ notification }) => {
  const [error, setError] = useState(false)

  useEffect(() => {
    notification.includes('wrong') ? setError(true) : setError(false)
  }, [notification])

  if (!notification) return null

  if (error) return (
    <div style={{marginBottom: 10}}>
      <Error
        severity='error'>
        {notification}
      </Error>
    </div>
  )

  return (
    <div style={{marginBottom: 10}}>
      <Success
        severity='success'>
        {notification}
      </Success>
    </div>
  )
}

export default Notification