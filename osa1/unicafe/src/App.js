import { React, useState } from 'react'

const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text} {props.value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='all' value={props.all}/>
      <StatisticLine text='average' value={props.average}/>
      <StatisticLine text='positive' value={props.positive + ' %'}/>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick1}>good</button>
      <button onClick={props.handleClick2}>neutral</button>
      <button onClick={props.handleClick3}>bad</button>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleClick1 = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(((good + 1) + (bad * -1)) / (all + 1))
    setPositive((100 / (all + 1)) * (good + 1))
  }

  const handleClick2 = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setPositive((100 / (all + 1)) * good)
  }

  const handleClick3 = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good + ((bad + 1) * -1)) / (all + 1))
    setPositive((100 / (all + 1)) * good)
  }
  
  return(
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick1={handleClick1}
        handleClick2={handleClick2}
        handleClick3={handleClick3}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App
