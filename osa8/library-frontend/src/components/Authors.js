import React, { useEffect, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

const AUTHORS = gql`
  query AllAuthors {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

const UPDATE = gql`
  mutation Mutation($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const authors = useQuery(AUTHORS, {
    pollInterval: 2000
  })

  const options = []

  useEffect(() => {
    if (!authors.loading) {
      for (const author of authors.data.allAuthors) {
        options.push({ value: author.name, label: author.name})
      }
    }
  }, [authors]) // eslint-disable-line

  const [ editAuthor ] = useMutation(UPDATE, {
    refetchQueries: [ { query: AUTHORS } ]
  })

  const update = async (event) => {
    event.preventDefault()
    editAuthor({ variables : { name: name, born: Number(year) } })
    setYear('')
  }

  const handleNameChange = (author) => {
    setName(author.value)
  }

  if (authors.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>set birthday</h3>
      <form onSubmit={update}>
        <Select
          defaultValue={name}
          onChange={handleNameChange}
          options={options}
        />
        <div>
          born
          <input value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <div>
          <button type='submit'>update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors