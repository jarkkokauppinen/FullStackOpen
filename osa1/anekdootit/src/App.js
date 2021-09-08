import { React, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(7))
  const [mostVotes, setMostVotes] = useState('no votes yet')
  const [highest, setHighest] = useState(0)
  const [vote, setVote] = useState(false)

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const voteClick = () => {
    const copyArray = [...points]
    copyArray[selected] += 1
    let highestNumber = 0
    for (const number of copyArray) {
      if (number > highestNumber) {
        highestNumber = number
      }
    }
    setPoints(copyArray)
    setMostVotes(anecdotes[copyArray.indexOf(highestNumber)])
    setHighest(copyArray.indexOf(highestNumber))
    setVote(true)
  }

  if (vote === false) {
    return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}<br></br>has {points[selected]} votes</p>
        <button onClick={voteClick}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <p>No votes yet</p>
    </div>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}<br></br>has {points[selected]} votes</p>
      <button onClick={voteClick}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{mostVotes}<br></br>has {points[highest]} votes</p>
    </div>
  )
}

export default App