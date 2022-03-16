import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blogs }) => {
  const style = {
    background: 'rgb(63, 81, 181)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div style={{marginTop: 35, marginLeft: 20, marginRight: 30}}>
      {blogs.sort(byLikes).map(blog =>
        <div style={style} key={blog.id}>
          <Link style={{color: 'white', textDecoration: 'none'}}
            to={`/blogs/${blog.id}`}>{blog.title} {blog.author}
          </Link> 
        </div>)}
    </div>
  )
}

export default Blog