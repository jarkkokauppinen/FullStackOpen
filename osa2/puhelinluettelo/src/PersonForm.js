import personService from './services/persons'

const PersonForm = (props) => {

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: props.newName, number: props.number}
    let add = true
    
    for (const person of props.persons) {
      if (props.newName === person.name) {
        add = false
        const id = person.id
        update(newPerson, id)
      }
    }
    
    if (add) {
      personService
        .create(newPerson)
        .then(response => {
          props.setPersons(props.persons.concat(response.data))
          props.setNewName('')
          props.setNumber('')
          props.setSuccess(true)
          props.setMessage(`Added ${props.newName}`)
          setTimeout(() => {
            props.setMessage(null)
          }, 2500)
        })
        .catch(error => {
          console.log('fail')
        })
    }
  }

  const update = (updatePerson, id) => {
    if (window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(id, updatePerson)
        .then(response => {
          props.setPersons(props.persons.map(person =>
            person.id !== id ? person : response.data))
          props.setNewName('')
          props.setNumber('')
          props.setSuccess(true)
          props.setMessage(`Updated ${props.newName}`)
          setTimeout(() => {
            props.setMessage(null)
          }, 2500)
        })
        .catch(error => {
          props.setSuccess(false)
          props.setMessage(`Information of ${props.newName} has already been removed from server`)
          setTimeout(() => {
            props.setMessage(null)
          }, 2500)
        })
    }
  }

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={props.newName} 
          onChange={props.changeName} />
          <br />
          number:
          <input value={props.number}
          onChange={props.changeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm