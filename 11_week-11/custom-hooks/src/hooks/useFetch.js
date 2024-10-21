import { useState, useEffect } from 'react'

// Custom hook that fetches data from a given URL
export function useFetch(url) {
   // useState hook to store the fetched data; initialized as an empty object
   const [data, setData] = useState({});
   const [loading , setLoading] = useState(true);

   // Async function to fetch data from the URL and update the state
   async function getDetails(url) {
       setLoading(true);
       const res = await fetch(url); // Perform the fetch request
       const json = await res.json(); // Parse the response as JSON
       setData(json); // Update the state with the fetched data
       setLoading(false);
     }

   // useEffect hook to trigger the data fetch when the component mounts
   // or whenever the 'url' dependency changes
   useEffect(() => {
     getDetails(url); // Call the fetch function
   }, [url]); // Re-run the effect when 'url' changes

   // Return the userId from the fetched data, or show "Loading..." if data isn't available yet
   return {data , loading};
}