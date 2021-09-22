import React, { useState } from 'react'

import axios from 'axios'

function App() {
  const [all, setAll] = useState([])
  const [countryName, setCountryName] = useState('')
  const [display, setDisplay] = useState(false)
  const [ready, setReady] = useState(false)
  const [weather, setWeather] = useState([])
  const [country, setCountry] = useState({
    name: '',
    capital: '',
    population: '',
    languages: [],
    flag: ''
  })

  const findCountry = (event) => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAll(response.data)
      })
    setCountryName(event.target.value)
    setDisplay(false)
  }

  const showCountry = (name, capital, population, languages, flag) => {
    setDisplay(true)
    setCountry({
      name: name,
      capital: capital,
      population: population,
      languages: languages,
      flag: flag
    })
    getWeather(capital)
  }

  const getWeather = (capital) => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${api_key}`)
      .then(response => {
        setWeather(response.data)
        setReady(true)
      })
  }

  const filterCountries = all.filter(country =>
    country.name.toLowerCase().includes(countryName.toLowerCase()))

  if (display && ready) {
    return (
      <div>
        find countries
        <input value={countryName}
        onChange={findCountry} />
        <h1>{country.name}</h1>
        <p>capital {country.capital}<br></br>
          population {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map((lang) =>
            <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={country.flag}
          style={{ width: '10%' }} alt='' />
        <h2>Weather in {country.capital}</h2>
        <b>temperature:</b> {weather.main.temp} Celcius<br></br>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''/><br></br>
        <b>wind:</b> {weather.wind.speed} m/s
      </div>
    )
  }

  if (filterCountries.length > 10) {
    return (
      <div>
        find countries
        <input value={countryName}
        onChange={findCountry} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  if (filterCountries.length > 1 && filterCountries.length <= 10) {
    return (
      <div>
        find countries
        <input value={countryName}
        onChange={findCountry} />
        {filterCountries.map(country =>
          <p key={country.name}> {country.name}
          {<button onClick={() =>
            showCountry(country.name, country.capital, country.population,
              country.languages, country.flag)}>show</button>}</p>)}
      </div>
    )
  }

  if (filterCountries.length === 1 && !display) {
    showCountry(
      filterCountries[0].name,
      filterCountries[0].capital,
      filterCountries[0].population,
      filterCountries[0].languages,
      filterCountries[0].flag
    )
  }

  return (
    <div>
      find countries
      <input value={countryName}
      onChange={findCountry} />
    </div>
  )
}

export default App