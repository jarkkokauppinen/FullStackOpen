import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import Statistics from './components/Statistics'
import SingleBlog from './components/SingleBlog'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import loginService from './services/login'
import userService from './services/users'
import storage from './utils/storage'

import { useDispatch, useSelector } from 'react-redux'
import { setMessage, resetMessage } from './reducers/notificationReducer'
import { allBlogs, createNew, likeBlog, removeBlog } from './reducers/blogReducer'

import { AppBar, Button, TextField, Toolbar } from '@material-ui/core'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = React.createRef()

  useEffect(() => {
    const getBlogsAndUsers = () => {
      dispatch(allBlogs())
      userService.getUsers().then(users =>
        setUsers(users)
      )
    }
    getBlogsAndUsers()
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (message) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(createNew(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
      blogFormRef.current.toggleVisibility()
    } catch(exception) {
      console.log(exception)
    }
    window.location = '/blogs'
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    dispatch(likeBlog(blogToLike))
  }

  const handleRemove = (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(blogToRemove))
      window.location = '/blogs'
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
    window.location = '/'
  }

  if (!user) {
    return (
      <div>
        <h2>Login to application</h2>

        <Notification notification={notification} />

        <div style={{marginBottom: 10}}>
          <TextField
            label='username'
            variant='outlined'
            size='small'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label='password'
            variant='outlined'
            size='small'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          style={{marginTop: 10}}
          variant='contained'
          id='login'
          onClick={handleLogin}>login
        </Button>
      </div>
    )
  }

  return (
    <Router>
      <h2>Blog App</h2>

      <Notification notification={notification} />

      <div style={{marginBottom: 15}}>
        <AppBar>
          <Toolbar>
            <Button color='inherit' component={Link} to='/blogs'>
              blogs
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
            </Button>
            <div style={{margin: 20}}>
              {user.name} logged in
            </div>
            <Button
              style={{margin: 10}}
              variant='contained'
              onClick={handleLogout}>logout
            </Button> 
          </Toolbar>
        </AppBar>
      </div>

      <Switch>
        <Route path='/users/:id'>
          <Users users={users} />
        </Route>
        <Route path='/users'>
          <Statistics users={users} />
        </Route>
        <Route path='/blogs/:id'>
          <SingleBlog
            blogs={blogs}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        </Route>
        <Route path='/blogs'>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <Blog
            blogs={blogs}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default App