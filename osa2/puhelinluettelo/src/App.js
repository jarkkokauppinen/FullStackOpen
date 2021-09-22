import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

import personService from './services/persons'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  if (props.success === true) {
    return (
      <div className='success'>
        {props.message}
      </div>
    )
  }

  if (props.success === false) {
    return (
      <div className='error'>
        {props.message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)

  const hook = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.log('fail')
      })
  }
  
  useEffect(hook, [])

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    setNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        success={success}
      />
      <Filter
        value={filter}
        onChange={handleFilter}
      />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
        changeName={changeName}
        changeNumber={changeNumber}
        setMessage={setMessage}
        setSuccess={setSuccess}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        showAll={showAll}
        filter={filter}
        setMessage={setMessage}
        setSuccess={setSuccess}
      />
    </div>
  )
}

export default App