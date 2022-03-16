import React from 'react'
import { Link, Typography } from '@material-ui/core'

const Statistics = (props) => {
  return (
    <div style={{marginTop: 35, marginLeft: 20}}>
      <h2>Users</h2>
      <div style={{marginTop: -15}}>
        <b style={{marginLeft: 150}}>blogs created</b>
        {props.users.map(user =>
        <div key={user.id}>
          <div>
            <Typography>
              <Link
                href={`/users/${user.id}`}>{user.name}
              </Link>
            </Typography>
          </div>
          <span style={{position: 'absolute', marginTop: -18, marginLeft: 150}}>{user.blogs.length}</span>
        </div>)}
      </div>
    </div>
  )
}

export default Statistics