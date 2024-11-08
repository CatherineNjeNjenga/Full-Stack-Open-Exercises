import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => { 
  const [value, setValue] = useState('')
  const [country, setCountry] = useState(null)
  const [details, setDetails] = useState({})

  useEffect(() => {
    console.log('effect value of countries', details)

    if (country) {
      console.log('waiting for country details...')
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => {
        setDetails(response.data)
      })
      .catch(error => {
        console.log('error...')
      })
      
    }
    
  }, [country])

  const handleSearch = (event) => {
    console.log(event.target.value)
    const value = event.target.value
    setValue(value)
    console.log(value)
    // setCountry(value)
  }

  setTimeout(() => {
    setCountry(value)
  }, 1000);

  return (
   <div>
    find countries <input type="text" value={value} onChange={handleSearch}/>
    <pre>
      {JSON.stringify(details, null, 2)}
    </pre>
   </div>
  )
}

export default App
