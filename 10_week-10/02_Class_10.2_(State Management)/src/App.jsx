// Import useState hook from react
import { useState } from "react";

// Create a function component named App that serves as the main application component
function App() {
    // Return the JSX for the component
    return (
        // Wrap the LightBulb component inside a div
        <div>
            {/* Render the LightBulb component */}
            <LightBulb />
        </div>
    );
}
// 03_Class_10.2_(Context API)            


// Create a function component named LightBulb to manage the state of the bulb
function LightBulb() {
  // Declare a state variable bulbOn and a function setBulbOn to update the state
  const [bulbOn, setBulbOn] = useState(true);

  // Return the JSX for the component
  return (
      // Wrap the BulbState and ToggleBulbState components inside a div
      <div>
          {/* Render the BulbState component with the bulbOn state as a prop */}
          <BulbState bulbOn={bulbOn} />

          {/* Render the ToggleBulbState component with the bulbOn state and setBulbOn function as props */}
          <ToggleBulbState bulbOn={bulbOn} setBulbOn={setBulbOn} />
      </div>
  );
}

function BulbState({ bulbOn }) {

  return <div>
    {bulbOn ? <img src="https://e7.pngegg.com/pngimages/922/441/png-clipart-creative-bulb-lightbulb-energy-saving-lamps-thumbnail.png" alt="" style={{
      width:"200px",
      height:"272px",
      mixBlendMode: "multiply",
    }} /> :
      <img src='https://i.pinimg.com/564x/e0/fd/25/e0fd25f9127a9a109a0648c83ee61643.jpg' alt="" style={{
        width:"200px",
        height:"290px",
        mixBlendMode: 'multiply',
      }}/>}
  </div>
}

// Create a function component named ToggleBulbState to toggle the state of the bulb
function ToggleBulbState({ bulbOn, setBulbOn }) {
  // Function to toggle the state of the bulb
  function toggleBulb() {
      // Update the state of the bulb using the setBulbOn function
      // setBulbOn((currentState) => !currentState);

      // Update the state of the bulb using the setBulbOn function 
      setBulbOn(!bulbOn);
  }

  // Return the JSX for the component
  return (
      // Button to toggle the state of the bulb on click
      <div>
          {/* Add an onClick event listener to the button that calls the toggleBulb function */}
          <button onClick={toggleBulb}>Toggle the Bulb</button>
      </div>
  );
}

// Export the App component as the default export to be used in other files or components
export default App;
