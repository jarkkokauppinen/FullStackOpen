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

const Recommendations = (props) => {
  const books = useQuery(BOOKS)

  if (!props.show) return null

  if (books.loading || !props.user.data.me) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
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
          {books.data.allBooks.map(book => book.genres.includes(props.user.data.me.favoriteGenre) ?
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr> : '')}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations