import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'

const SingleBlog = ({ blogs, handleLike, handleRemove, user }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  const id = useParams().id
  const blog = blogs.find(blogi => blogi.id === id)

  useEffect(() => {
    blogService.getComments(id).then(comments =>
      setComments(comments)
    )
  }, [id])

  const addComment = () => {
    if (comment === '') return
    setComment('')
    document.querySelector('#textfield').value = ''
    blogService.addComment(id, comment).then(comment =>
      setComments(comments.concat(comment)))
  }

  //if (!blog) return null

  return (
    <div style={{marginTop: 35, marginLeft: 20}}>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url} target='blank'>{blog.url}</a></div>
      <div>
        {blog.likes} likes
        <Button
          style={{marginLeft: 10}}
          variant='outlined'
          size='small'
          onClick={() => handleLike(blog.id)}>like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      <div style={{display: user.username === blog.user.username ? '' : 'none'}}>
        <Button
          style={{marginTop: 10}}
          variant='outlined'
          size='small'
          onClick={() => handleRemove(blog.id)}>remove
        </Button>
      </div>
      <h3>Comments</h3>
        <div>
          <TextField
            id='textfield'
            label='Comment'
            variant='outlined'
            size='small'
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <div>
          <Button
            style={{marginTop: 10}}
            variant='outlined'
            size='small'
            onClick={addComment}>add comment
          </Button>
        </div>
        <div style={{marginTop: 20, marginLeft: 20}}>
          {comments.map((comment, index) =>
            comment.id === id ? <div key={index}><li>{comment.comment}</li></div> : '')}
        </div>
    </div>
  )
}

export default SingleBlog