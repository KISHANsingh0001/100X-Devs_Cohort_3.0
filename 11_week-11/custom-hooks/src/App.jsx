import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// importing useCounter custom hook from hooks folder
import { useCounter } from './hooks/useCounter'

import { useFetch } from './hooks/useFetch'

function App() {
  const [currData  , setCurrData] = useState(1);
  const {data , loading} = useFetch("https://jsonplaceholder.typicode.com/todos/" + currData );
  if(loading){
    return <div>
       <h3>Loading........</h3>
    </div>
  }
  return (
      <div>
        <button onClick={() => setCurrData(1)}>1</button>
        <button onClick={() => setCurrData(2)}>2</button>
        <button onClick={() => setCurrData(3)}>3</button>
        <br />
        {/* {(loading == true) ? "Loading......." : JSON.stringify(data)} */}
        { JSON.stringify(data)}
        {/* <button onClick={increseCount}>Increse</button> */}
      </div>
  )
}

export default App
