const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    response.json(savedBlog.toJSON())
    await user.save()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const id = request.params.id

  try {
    const blog = await Blog.findById(id)
    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    return response.status(401).json({
      error: 'No access'
    })
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body

  const comment = new Comment({
    comment: body.comment,
    id: body.id
  })

  try {
    comment.save().then(savedComment => response.json(savedComment))
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.get('/:id/comments', (request, response) => {
  Comment.find({}).then(comment => {
    response.json(comment)
  })
})

module.exports = blogsRouter