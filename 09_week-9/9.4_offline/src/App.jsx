import React from 'react';
import { useState } from 'react';
// A simple functional component for rendering a Card
// function Card({ children }) {
//     // Inline styling for the Card component
//     return (
//         <div style={{
//             border: '1px solid #ccc',          // Gray border
//             borderRadius: '5px',               // Rounded corners
//             padding: '20px',                   // Padding inside the card
//             margin: '10px',                    // Margin outside the card
//             boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',  // Light shadow for depth
//         }}>
//             {children}  {/* Rendering children passed to the Card */}
//         </div>
//     );
// }
function Todo({ title, done }) {
  return (
      <div style={{
          border: '1px solid #ccc',
          borderRadius: '15px',
          padding: '10px',
          margin: '10px',
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
          backgroundColor: done ? '#e0ffe0' : '#ffe0e0'  // Green if done, red if not
      }}>
          <h3>{title}</h3>
          <p>Status: {done ? 'Completed' : 'Not completed'}</p>
      </div>
  );
}

// Main App component that renders multiple Card components
function App() {
  // The list of todos
  const todos = [
    { title: "Go to gym", done: false },
    { title: "Eat food", done: true }
  ];

  // Create an array to hold the Todo components
  const todoComponents = [];

  // Using a for loop to create Todo components
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const todoComponent = <Todo key={i} title={todo.title} done={todo.done} />;
    todoComponents.push(todoComponent);
  }

  return (
    <div>
      {todoComponents}
    </div>
  );
  // <div>
  //     {/* First card with a title and content */}
  //     <Card>
  //         <h2>Card Title</h2>
  //         <p>This is some content inside the card.</p>
  //     </Card>

  //     {/* Second card with different content */}
  //     <Card>
  //         <h2>Another Card</h2>
  //         <input type={"text"}  placeholder='enter your text'/>
  //         <p>This card has different content!</p>
  //     </Card>
  // </div>
}

export default App;
