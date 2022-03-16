const dummy = (blogs) => {
  return blogs.length + 1
}

const totalLikes = (listWithOneBlog) => {
  return listWithOneBlog[0].likes
}

const favoriteBlog = (blogs) => {
  let highest = 0
  let number = 0

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > highest) {
      highest = blogs[i].likes
      number = i
    }
  }

  const blog = {
    title: blogs[number].title,
    author: blogs[number].author,
    likes: blogs[number].likes
  }

  return blog
}

const mostBlogs = (blogs) => { 
  let amountOfBlogs = 0
  const writers = []

  for (const blog of blogs) {
    for (const author of blogs) {
      if (author.author === blog.author) {
        amountOfBlogs += 1
      }
    }
    writers.push({name: blog.author, blogs: amountOfBlogs})
    amountOfBlogs = 0
  }

  writers.sort((a, b) => b.blogs - a.blogs)

  const person = {
    author: writers[0].name,
    blogs: writers[0].blogs
  }

  return person
}

const mostLikes = (blogs) => {
  let likes = 0
  const writers = []

  for (const blog of blogs) {
    for (const person of blogs) {
      if (person.author === blog.author) {
        likes += person.likes
      }
    }
    writers.push({name: blog.author, likes: likes})
    likes = 0
  }

  writers.sort((a, b) => b.likes - a.likes)

  const blog = {
    author: writers[0].name,
    likes: writers[0].likes
  }

  return blog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}