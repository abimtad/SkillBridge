import React from "react";

const HookRules = () => {
  return (
    <div>
      <h2>Hook Rules and Best Practices</h2>
      <ul>
        <li>Only call hooks at the top level of your React functions.</li>
        <li>Don't call hooks inside loops, conditions, or nested functions.</li>
        <li>Only call hooks from React function components.</li>
        <li>Don't call hooks from regular JavaScript functions.</li>
        <li>Custom hooks should always start with the word "use".</li>
      </ul>
    </div>
  );
};

export default HookRules;
