import { useState } from 'react'

const FilteredPersonList = ({filteredPersons}) => {
  return (
    filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName, newNumber)
    if (persons.filter(person => person.name === newName).length > 0){
      console.log("on listassa")
      alert(`${newName} is already addad to phonebook`)
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
      <div>
  <h2>Phonebook</h2>
  <form onSubmit={filterWith}>
        <div>
          filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
        </div>
        <div>
          <button type="submit">filter</button>
        </div>
      </form>
  </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      <FilteredPersonList filteredPersons={filteredPersons} />
      </ul>
      <div/>
    </div>
  )

}

export default App