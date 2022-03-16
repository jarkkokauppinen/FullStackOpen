import React, { useState } from 'react'
import { gql, useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'

const USER = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`

const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      title
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const user = useQuery(USER, {
    pollInterval: 2000
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded.title
      alert(`A new book ${book} added`)
    }
  })
  
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : ''}
        {token ? <button onClick={() => setPage('recommendations')}>recommendations</button> : ''}
        {!token ? <button onClick={() => setPage('login')}>login</button> : ''}
        {token ? <button onClick={logout}>logout</button> : ''}
      </div>

      <Authors
        show={page === 'authors'}
        user={user}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
        user={user}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App