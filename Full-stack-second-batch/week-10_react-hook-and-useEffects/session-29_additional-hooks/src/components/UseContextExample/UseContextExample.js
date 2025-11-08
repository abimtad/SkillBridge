import React from "react";
<<<<<<< HEAD

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
=======
import ThemedComponent from "./ThemedComponent";
import ThemeProvider from "../../providers/ThemeProvider";

const UseContextExample = ({ count, setCount }) => {
  return (
    <div>
      {/* 
        useContext Syntax:
        1. Create a context: export const MyContext = React.createContext(defaultValue);
        2. Provide the context value to children: <MyContext.Provider value={...}>...</MyContext.Provider>
        3. Consume the context value: const value = useContext(MyContext);
      */}
      <h2>useContext Example</h2>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <ThemeProvider>
        <ThemedComponent />
        <component />
      </ThemeProvider>
>>>>>>> finished-app
    </div>
  );
};

export default UseContextExample;
