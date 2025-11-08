import React from "react";
<<<<<<< HEAD

const CustomHookExample = () => {
  return (
    <div>
      {/*
        Custom Hooks:
        - Why: To reuse stateful logic between components.
        - What: A JavaScript function whose name starts with "use" and that may call other hooks.
        - How:
          1. Create a function starting with `use` (e.g., `useWindowWidth`).
          2. Use other hooks inside it (e.g., `useState`, `useEffect`).
          3. Return the value you want to expose to the components.
      */}
      <h2>Custom Hook Example</h2>
      {/* We will use a custom hook to get and display the window width */}
=======
import useWindowWidth from "../../hooks/useWindowWidth";

const CustomHookExample = () => {
  const width = useWindowWidth();

  return (
    <div>
      {/*
        Custom Hook Syntax:
        function useCustomHook(args) {
          // ... hook logic
          return value;
        }
        - A custom hook is a JavaScript function whose name starts with ”use” and that may call other hooks.
      */}
      <h2>Custom Hook Example</h2>
      <p>Window width is: {width}</p>
>>>>>>> finished-app
    </div>
  );
};

export default CustomHookExample;
