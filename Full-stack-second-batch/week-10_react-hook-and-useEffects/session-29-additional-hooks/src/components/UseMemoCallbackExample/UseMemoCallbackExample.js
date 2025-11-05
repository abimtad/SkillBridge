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
  }, []);

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
    </div>
  );
};

export default UseMemoCallbackExample;
