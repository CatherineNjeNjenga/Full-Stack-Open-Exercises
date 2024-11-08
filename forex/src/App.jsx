import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    console.log('effect value', currency) 

    if (currency) {
      console.log('fetching exchange rates...')
      axios
      .get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then(response => {
        setRates(response.data)
      })
    }
  }, [currency])

  const handleChange = (event) => {
    console.log('change', event.target.value)
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit', event)
    console.log(value)
    setCurrency(value)
  }

  const handleSearch = (event) => {
    // setRates(event.target.value)
  }

  return (
    <div>
      search rate by currency <input type="text" onChange={handleSearch} />
      <form action="" onSubmit={handleSubmit}>
        currency: <input type="text" value={value} name="" id="" onChange={handleChange}/>
        <button type="submit">exchange rate</button>
      </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
  )
}

export default App
