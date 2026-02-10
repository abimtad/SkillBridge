import React from "react";

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
    </div>
  );
};

export default CustomHookExample;
