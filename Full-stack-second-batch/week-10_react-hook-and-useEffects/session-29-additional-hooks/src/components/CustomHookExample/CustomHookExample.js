import React from "react";
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
    </div>
  );
};

export default CustomHookExample;
