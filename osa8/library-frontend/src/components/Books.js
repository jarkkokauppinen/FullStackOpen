import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const Books = (props) => {
  const allBooks = useQuery(BOOKS, {
    pollInterval: 2000
  })

  const [books, setBooks] = useState([])
  const [displayAll, setDisplayAll] = useState(true)
  const [readyToSetGenres, setReadyToSetGenres] = useState(false)
  const [genres, setGenres] = useState([])

  const filter = (event) => {
    setDisplayAll(false)
    const filter = allBooks.data.allBooks.filter(book =>
      book.genres.includes(event.target.name))
    setBooks(filter)
  }

  let genresArray = []

  useEffect(() => {
    const bookGenres = []
    let set = new Set()
    
    if (!allBooks.loading) {
      allBooks.data.allBooks.map(book => bookGenres.push(book.genres))
    }

    for (const array of bookGenres) {
      for (const genre of array) {
        if (genre !== '') {
          set.add(genre)
        }
      }
    }

    set = Array.from(set)

    for (const genre of set) {
      genresArray.push(genre)
    }

    if (genresArray.length > 0) {
      setReadyToSetGenres(true)
    }
  }, [allBooks]) //eslint-disable-line

  useEffect(() => {
    setGenres(genresArray)
  }, [readyToSetGenres]) //eslint-disable-line

  if (allBooks.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {displayAll ? allBooks.data.allBooks.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ) :
          books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setBooks(allBooks.data.allBooks)}>all genres</button>
      {genres.map((genre, i) =>
        <button key={i} onClick={filter} name={genre}>{genre}</button>)}
    </div>
  )
}

export default Books