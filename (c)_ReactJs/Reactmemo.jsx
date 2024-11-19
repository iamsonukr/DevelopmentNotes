import React, { useState } from 'react';

// Wrapped with React.memo to prevent unnecessary re-renders
const MemoizedChildComponent = React.memo(({ count }) => {
  console.log("MemoizedChildComponent rendered");
  return <p>Count in MemoizedChildComponent: {count}</p>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <h1>Parent Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type something" 
      />
      <MemoizedChildComponent count={count} />
    </div>
  );
}

export default ParentComponent;
