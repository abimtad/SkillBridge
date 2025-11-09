import React from "react";

const UseContextExample = () => {
  return (
    <div>
      {/*
        useContext:
        - Why: To avoid "prop drilling" - passing props down through many levels of components.
        - What: It lets you "subscribe" to a context and get the latest value from the nearest provider.
        - How:
          1. Create a context with `React.createContext()`.
          2. Wrap a component tree with a `<MyContext.Provider value={...}>`.
          3. Use `useContext(MyContext)` in any child component to get the value.
      */}
      <h2>useContext Example</h2>
      {/* We will wrap our component with the provider we created */}
    </div>
  );
};

export default UseContextExample;
