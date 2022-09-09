import { useState, useEffect } from 'react'
import FilteredPersonList from './components/FilteredPersonList'
import Filter from './components/Filter'
import Add from './components/Add'
import Notification from './components/notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons) // Tämä pitäisi ratkaista toisella tavalla, mutta kun toimii niin antaa olla tässä vaiheessa
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("")

 const hook = () => {
    personService
    .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
      console.log("data fetch", initialPersons)
      })
}

useEffect(hook, [])

  const removePerson = ({id, name}) => {
    console.log(name)
    if (window.confirm("Delete " +  name + " ?")) {
      personService
      .remove(id)
    setPersons(persons.filter(x => x.id !== id))
    setFilteredPersons(filteredPersons.filter(x => x.id !== id))
    setMessageType("error")
    setMessage(`Removed ${name}`)
    setTimeout(() => {
    setMessage(null)
  }, 5000)
    }
    
}


  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName, newNumber)
    if (persons.filter(person => person.name === newName).length > 0){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log("on listassa")
        const person = {
        name: newName,
        number: newNumber
       }    
        const personid = persons.filter(person => person.name === newName)
        const id = personid[0].id
       personService
        .update(id, person)
       const updateNumber = persons
       const updateperson = persons.filter(person => person.name === newName)
       updateNumber[(updateNumber.indexOf(updateperson[0]))].number = newNumber
        setPersons(updateNumber)
          setFilteredPersons(persons)
          setFilteredPersons(updateNumber)
          setNewName('')
          setNewNumber('')
          console.log("numero muutettu")
          setMessageType("success")
        setMessage(`Added new number for ${newName}`)
      
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      } 
    }
    else {
         const person = {
         name: newName,
         number: newNumber
        }
        personService
          .create(person)
          .then(response => {
            console.log("lisätty", response)
    })

          setPersons(persons.concat(person))
          setFilteredPersons(persons)
          setFilteredPersons(filteredPersons.concat(person))
          setNewName('')
          setNewNumber('')
          setMessageType("success")
          setMessage(`Added ${newName}`)
        setTimeout(() => {
        setMessage(null)
      }, 5000)
  }}

  const filterWith = (event) => {
    event.preventDefault()
    setFilteredPersons(persons.filter(person => (person.name).includes(newFilter)))  
    setNewFilter('')
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
    
    <Filter filterWith={filterWith} newFilter={newFilter} handleFilterChange={handleFilterChange} />
    <Add addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
    <Notification message={message} type={messageType}/>
      <h2>Numbers</h2>
      <ul>
      <FilteredPersonList filteredPersons={filteredPersons} removePerson={removePerson}/>
      </ul>
      <div/>
    </div>
  )

}

export default App