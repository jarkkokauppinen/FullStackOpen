import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'ALL':
      return action.data
    case 'CREATE':
      return [...state, action.data]
    case 'LIKE':
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    case 'REMOVE':
      return state.filter(blog => blog.id !== action.data)
    default:
      return state
  }
}

export const allBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'ALL',
      data: blogs
    })
  }
}

export const createNew = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const likeBlog = blog => {
  const addLike = {...blog, likes: blog.likes + 1}
  return async dispatch => {
    const updatedBlog = await blogService.update(addLike)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const removeBlog = blog => {
  const id = blog.id
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export default blogReducer