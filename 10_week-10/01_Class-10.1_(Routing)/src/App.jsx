// import React , { useRef } from "react";
// import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Outlet } from "react-router-dom";
// import { useEffect } from "react";

// function App() {
//   return (
//     <BrowserRouter>
//       <MainApp />
//     </BrowserRouter>
//   );
// }

// function MainApp() {
//   const location = useLocation(); 

//   const validPaths = ["/", "/neet/online-coaching-class-11", "/neet/online-coaching-class-12"];

//   return (
//     <div>
//       {validPaths.includes(location.pathname) && (
//         <nav style={{ display: "flex", gap: "10px", justifyContent: "space-evenly"  , border: '1px solid #ccc', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' , backgroundColor:"black"}}>
//           <Link to="/" style={{textDecoration:"none" , fontSize:"20px" , color:"white"}}>Allen</Link>
//           <Link to="/neet/online-coaching-class-11" style={{textDecoration:"none" , fontSize:"20px" , color:"white"}}>Class 11 Program</Link>
//           <Link to="/neet/online-coaching-class-12" style={{textDecoration:"none" , fontSize:"20px" , color:"white"}}>Class 12 Program</Link>
//         </nav>
//       )}

//       <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route path="/" element={<Landing />} />
//         <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
//         <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
//         <Route path="*" element={<PageNotFound />} />
//       </Route>
//       </Routes>
//     </div>
//   );
// }

// function Layout() {
//   return <div>
//     Header
//      <Outlet />
//     Footer
//   </div>
// }

// function Class11Program() {
//   return (
//     <div>
//       <h1>Class 11 Program is here</h1>
//     </div>
//   );
// }

// function Class12Program() {
//   const navigate = useNavigate();

//   useEffect(function(){
//     const timeoutId = setTimeout(function(){
//       console.log("Timeout is Called");
//       navigate("/");
//     }, 5000);

//     return () => clearTimeout(timeoutId);
//   }, [navigate]);

//   return (
//     <div>
//       <h1>Class 12 Program is here</h1>
//       <p>You'll be redirected to the home(Landing) page in 5 seconds...</p>
//     </div>
//   );
// }

// function Landing() {
//   return (
//     <div>
//       <h1>Welcome to Allen Coaching Classes!</h1>
//     </div>
//   );
// }

// function PageNotFound() {
//   const navigate = useNavigate();
//   function redirectUser(){
//     navigate("/");
//   }
//   return (
//     <div style={{ textAlign: "center", width: "600px", padding: 10 }}>
//       <h1 style={{ fontFamily: "monospace" }}>404! Page Not Found...</h1>
//        <button onClick={redirectUser} style={{borderRadius:15 , fontSize:"20px" , fontFamily:"sans-serif" , color:"blue"
//        }}>Go back to Home</button>
//     </div>
//   );
// }

// useRef :- reference to a value , such htat when u change the value, the component Does not RE-RENDER

// Focussing on an input box
// function App() {
//   // Step 1: Create a ref to store the input element
//   const inputRef = useRef();

//   // Step 2: Define the function to focus the input
//   function focusOninput() {
//     // document.getElementById("name").focus();
//     // Access the Dom node and call the focus method
//     inputRef.current.focus();
//   }
//   return <div>
//     <h2>Sign Up</h2>
//     {/*Step 3: Attach the ref to the input element */}
//     <input ref={inputRef} type="text" placeholder="Enter username" />
//     <input type="password" placeholder="Enter password" />
//     <button onClick={focusOninput}>Sumbit</button>
//   </div>
// }
import { useRef, useState } from "react";
function App(){
 const [currCount , setcurrCount] = useState(1);
//  let timer = 0;
 //const [timer , setTimer] = useState(0); // Gureded from re-renders
 const timer = useRef();
  
 function startClock(){
   let value = setInterval(function(){
    setcurrCount(c => c+1);
   } , 1000);
  //  setTimer(value)
   timer.current = value;
 }

 function stopClock(){
  console.log(timer);
  /* Timer will not stop because of when re-render is happen then timer variable will again initilize to zero */
  // to solve this (ugly approch) make timer to state variable 
  //clearInterval(timer); // (Triggering extra re-render)
  clearInterval(timer.current); // (Triggering extra re-render)
 }

  return <div>
    {currCount}
    <br />
    <button ref={timer} onClick={startClock}>Start</button>
    <button onClick={stopClock}>Stop</button>
  </div>
}

export default App;