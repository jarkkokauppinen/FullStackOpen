import React from 'react'
import { useParams } from 'react-router-dom'

const Users = (props) => {
  const id = useParams().id
  const user = props.users.find(user => user.id === id)

  if (!user) return null

  return (
    <div style={{marginTop: 35, marginLeft: 20}}>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <div style={{marginLeft: 20}}>
        {user.blogs.map((blog, index) =>
          <div key={index}><li>{blog.title}</li></div>)}
      </div>
      {user.blogs.length === 0 ? <i>no blogs yet</i> : ''}
    </div>
  )
}

export default Users