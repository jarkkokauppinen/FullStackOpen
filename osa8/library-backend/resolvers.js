const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find().populate('author')
      
      if (args.author && !args.genre) {
        return books.filter(book => book.author === args.author)
      }
      
      if (!args.author && args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      }
      
      if (args.author && args.genre) {
        const author = books.filter(book => book.author === args.author)
        return author.filter(book => book.genres.includes(args.genre))
      }
      
      return books
    },
    allAuthors: async () => await Author.find(),
    me: async (root, args, context) => {
      return await context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      const author = await Author.findOne({ name: args.author })
      let book = null

      if (!author) {
        const newAuthor = new Author({name : args.author})
        book = new Book({ ...args, author: newAuthor })
        
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      if (author) {
        book = new Book({ ...args, author: author._id })
      }
  
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (args.title.length < 2) {
        throw new UserInputError('book title is too short')
      }

      if (args.author.length < 4) {
        throw new UserInputError('author name is too short')
      }
      
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      const author = await Author.findOne({ name: args.name })

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (!author) return null

      author.born = args.born

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials')
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers