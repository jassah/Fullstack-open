const Filter = ({filterWith, newFilter, handleFilterChange}) => {
    return(
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
    )
  }

  export default Filter