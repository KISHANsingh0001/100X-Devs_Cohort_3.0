import React from 'react';

// Define the Todo component
function Todo({ title, done }) {
    // Render a div for each todo item with conditional styling based on its completion status
    return (
        <div style={{
            border: '1px solid #ccc',             // Gray border around the todo item
            borderRadius: '5px',                  // Rounded corners for the div
            padding: '10px',                      // Padding inside the todo item
            margin: '10px',                       // Margin outside the todo item
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Light shadow for a subtle depth effect
            backgroundColor: done ? '#e0ffe0' : '#ffe0e0'  // Green if the todo is done, red if not
        }}>
            <h3>{title}</h3>                       // Display the title of the todo item
            <p>Status: {done ? 'Completed' : 'Not completed'}</p> // Show the completion status
        </div>
    );
}

// Main App component that renders multiple Todo components
function App() {
    // The list of todos, each represented as an object with a title and completion status
    const todos = [
        { title: "Go to gym", done: false },   // First todo item
        { title: "Eat food", done: true }      // Second todo item
    ];

    // Create an array to hold the Todo components
    const todoComponents = [];

    // Using a for loop to create Todo components from the todos array
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];                 // Get the current todo object
        // Create a Todo component for the current todo and pass the title and done status as props
        const todoComponent = <Todo key={i} title={todo.title} done={todo.done} />;
        todoComponents.push(todoComponent);    // Add the created component to the todoComponents array
    }

    // Render the list of Todo components
    return (
        // Display all Todo components in the returned div
        <div>
            {todoComponents} 
        </div>
    );
}

export default App; // Export the App component for use in other parts of the application