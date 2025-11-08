import React from "react";

const HookRules = () => {
  return (
    <div>
      <h2>Hook Rules and Best Practices</h2>
      <ul>
<<<<<<< HEAD
        <li>
          <strong>Only Call Hooks at the Top Level:</strong> Don't call Hooks
          inside loops, conditions, or nested functions.
        </li>
        <li>
          <strong>Only Call Hooks from React Functions:</strong> Call them from
          React function components and not from regular JavaScript functions.
        </li>
        <li>
          <strong>Custom Hooks Should Start with "use":</strong> This is a
          convention that allows linters to enforce the rules of hooks.
        </li>
=======
        <li>Only call hooks at the top level of your React functions.</li>
        <li>Don't call hooks inside loops, conditions, or nested functions.</li>
        <li>Only call hooks from React function components.</li>
        <li>Don't call hooks from regular JavaScript functions.</li>
        <li>Custom hooks should always start with the word "use".</li>
>>>>>>> finished-app
      </ul>
    </div>
  );
};

export default HookRules;
