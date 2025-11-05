import React from "react";

const HookRules = () => {
  return (
    <div>
      <h2>Hook Rules and Best Practices</h2>
      <ul>
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
      </ul>
    </div>
  );
};

export default HookRules;
