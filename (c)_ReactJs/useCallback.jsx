import React, { useState, useCallback } from 'react';

function ChildComponent({ onButtonClick }) {
  console.log("Child component rendered");
  return <button onClick={onButtonClick}>Click Me!</button>;
}

function ParentComponent() {
  const [count, setCount] = useState(0);

  // Memoize the callback function so it doesn’t get recreated on every render
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []); // No dependencies, so this function will not change


  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <ChildComponent onButtonClick={handleClick} />
    </div>
  );
}

export default ParentComponent;
