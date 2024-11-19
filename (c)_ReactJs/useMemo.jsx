import React, { useState, useMemo } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Memoize the result of this expensive calculation
  const expensiveCalculation = useMemo(() => {
    console.log("Running expensive calculation...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += 1;
    }
    return result + count;
  }, [count]); // Recalculate only when `count` changes

  const memoSample=useMemo(()=>{
    return result+ count
  })

  return (
    <div>
      <h1>Expensive Calculation Result: {expensiveCalculation}</h1>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type something" 
      />
    </div>
  );
}

export default ExpensiveComponent;
