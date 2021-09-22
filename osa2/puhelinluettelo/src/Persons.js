import personService from './services/persons'

const Persons = (props) => {

  const namesToShow = props.showAll
  ? props.persons
  : props.persons.filter(person =>
    person.name.toLowerCase().includes(props.filter.toLowerCase()))

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id)
        .then(
          props.setPersons(props.persons.filter(person =>
            person.id !== id)),
          props.setSuccess(true),
          props.setMessage(`Deleted ${name}`),
          setTimeout(() => {
            props.setMessage(null)
          }, 2500)
        )
        .catch(error => {
          props.setSuccess(false)
          props.setMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            props.setMessage(null)
          }, 2500)
        })
    }
  }

  return (
    <div>
      {namesToShow.map(person =>
        <p key={person.name}> {person.name} {person.number}
          <button onClick={() =>
            deletePerson(person.id, person.name)}>delete</button></p>)}
    </div>
  )
}

export default Persons