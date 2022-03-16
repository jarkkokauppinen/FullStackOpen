import React, { useState } from 'react'

import { Button, TextField } from '@material-ui/core'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    const likes = 0

    props.createBlog({
      title, author, url, likes
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>create a new blog</h3>
      <form onSubmit={handleNewBlog}>
        <div>
          <TextField
            label='Author'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label='Title'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label='URL'
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          type='submit'
          style={{marginTop: 20, marginBottom: 10}}
          variant='outlined'
          id='create'>create
        </Button>
      </form>
    </div>
  )
}

export default NewBlog