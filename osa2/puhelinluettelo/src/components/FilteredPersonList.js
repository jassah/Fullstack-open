const Person = ({name, number, id, removePerson}) => {
  return (
<li >{name} {number} {" "}
      <button onClick={() => removePerson({id, name})}>Delete</button></li>)
}

const FilteredPersonList = ({filteredPersons, removePerson}) => {
    return (
      <ul>{filteredPersons.map(person => <Person name={person.name} id={person.id} number={person.number} key={person.name} removePerson={removePerson} />)}</ul>
    )
  }

  export default FilteredPersonList