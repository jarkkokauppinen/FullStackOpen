const Header = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  )
}

const Content = (props) => {
  const parts = props.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
  return (
    <div>
      <Part part={parts} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part}
    </div>
  )
}

const Total = (props) => {
  const exercises = props.parts.map(exercise => exercise.exercises)
  const total = exercises.reduce((previousValue, currentValue) => previousValue + currentValue)
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header name={props.name} />
      <Content parts={props.parts} />
      <Total parts={props.parts} />
    </div>
  )
}

export default Course