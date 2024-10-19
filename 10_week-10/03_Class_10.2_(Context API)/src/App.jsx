import { useContext } from 'react'

import { BulbContextProvider , BulbContext } from './buildContextProvider';
function App() {
 
  return <div>
    <BulbContextProvider>
     <Light />
    </BulbContextProvider>
    
  </div>
}

function Light(){
  
  return <div>
    <LightBulb/>
    <LightSwitch />
  </div>
}

function LightBulb(){
  const {bulbOn} = useContext(BulbContext);
  return <div>
    {bulbOn == true ? "Bulb On" : "Bulb Off"}
  </div>
}

function LightSwitch(){
  const {bulbOn , setBulbOn} = useContext(BulbContext);
  function toggle(){
    setBulbOn(!bulbOn);
  }
  return <div>
    <button onClick={toggle}>Toggle Bulb</button>
  </div>
}



export default App
