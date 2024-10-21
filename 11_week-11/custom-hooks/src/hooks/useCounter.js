// Import useState from React to manage state in the hook
import { useState } from 'react'

// Custom hook: useCounter
// This hook provides a simple counter with an initial value of 0
export function useCounter() {
  // Define a state variable 'count' and a function 'setCount' to update it
  const [count, setCount] = useState(0)

  // Function to increment the count by 1
  function increseCount() {
    // Update the state by increasing the count
    setCount(count + 1);
  }

  // Return an object that provides access to the count and the function to increment it
  return {
    count,       // Current count value
    increseCount // Function to increase the count
  }
}