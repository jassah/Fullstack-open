import { useState, useEffect } from 'react'
import axios from 'axios'
import FilteredPersonList from './components/FilteredPersonList'
import Filter from './components/Filter'
import Add from './components/Add'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons) // Tämä pitäisi ratkaista toisella tavalla, mutta kun toimii niin antaa olla tässä vaiheessa
  const [newFilter, setNewFilter] = useState('')

 const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      setFilteredPersons(response.data)
      console.log(response.data)
    })
}

useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName, newNumber)
    if (persons.filter(person => person.name === newName).length > 0){
      console.log("on listassa")
      alert(`${newName} is already added to phonebook`)
    }
    else {
         const person = {
         name: newName,
         number: newNumber
        }
          setPersons(persons.concat(person))
          setFilteredPersons(persons)
          setFilteredPersons(filteredPersons.concat(person))
          setNewName('')
          setNewNumber('')
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
      <h2>Numbers</h2>
      <ul>
      <FilteredPersonList filteredPersons={filteredPersons} />
      </ul>
      <div/>
    </div>
  )

}

export default App