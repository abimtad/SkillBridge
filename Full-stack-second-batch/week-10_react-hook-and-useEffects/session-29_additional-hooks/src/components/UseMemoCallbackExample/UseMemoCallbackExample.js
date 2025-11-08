<<<<<<< HEAD
import React from "react";

const UseMemoCallbackExample = () => {
  return (
    <div>
      {/*
        useMemo:
        - Why: To optimize performance by memoizing the result of an expensive calculation.
        - What: It returns a memoized value. The calculation is only re-run if a dependency changes.
        - How: `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`

        useCallback:
        - Why: To optimize performance by memoizing a function, preventing unnecessary re-renders of child components.
        - What: It returns a memoized version of the callback function that only changes if a dependency has changed.
        - How: `const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);`
      */}
      <h2>useMemo and useCallback Example</h2>
      {/* We will have an expensive calculation and a memoized component to demonstrate the hooks */}
=======
import React, { useMemo, useState, useCallback } from "react";

const MemoizedComponent = React.memo(({ value, onClick }) => {
  console.log("MemoizedComponent rendered");
  return <button onClick={onClick}>Value: {value}</button>;
});

const UseMemoCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const expensiveValue = useMemo(() => {
    console.log("Calculating expensive value...");
    let value = 0;
    for (let i = 0; i < 1000000000; i++) {
      value += 1;
    }
    return value + count;
  }, [count]);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
    setCount((c) => c + 1);
  });

  return (
    <div>
      <h2>useMemo and useCallback Example</h2>
      <p>Expensive Value: {expensiveValue}</p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <MemoizedComponent value={count} onClick={handleClick} />
>>>>>>> finished-app
    </div>
  );
};

export default UseMemoCallbackExample;
