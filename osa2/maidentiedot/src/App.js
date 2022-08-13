import { useState, useEffect } from 'react'
import axios from 'axios'

const FoundCountry = ({country}) => {
  console.log(country)
  console.log(country.languages)
  console.log("toimii")
  return (
    <div>
    <h1>{country.name.official}</h1>
    <p>
    capital :  {country.capital}<br />
    area : {country.area}
    </p>

    <h2>Languages</h2>
    
    <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>

    <img src={country.flags.png} alt="" />
        </div>
  )
}


const Countries = ({filtered}) => {
  if (filtered.length===1){
    console.log("löytyi", filtered)
    return (
      filtered.map(country => <FoundCountry country={country} key={country.name.official} />)
      )
  }
  else if (filtered.length < 10 ){
    console.log("alle 10", filtered)
    return (
      filtered.map(country => <p key={country.name.official}>{country.name.official} </p>)
      )
  }
  else {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
}

const App = () => {

const [newSearch, setNewSearch] = useState('')
const [countries, setCountries] = useState([])
const [filtered, setFiltered] = useState([])

 const hook = () => {
  console.log('effect')
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      console.log(response.data)
      setCountries(response.data)
      setFiltered(response.data)
    })
}


const handleSearchChange = (event) => {
  console.log(event.target.value)
  setNewSearch(event.target.value)
  setFiltered(countries.filter(country => (country.name.official).includes(event.target.value)))
  console.log(filtered)  
}

useEffect(hook, [])

  return (
    <div>
          <div>
          find countries: <input value={newSearch} onChange={handleSearchChange}/>
          </div>
          <div>
          <Countries filtered={filtered}/>
          </div>
    </div>
  )

}

export default App