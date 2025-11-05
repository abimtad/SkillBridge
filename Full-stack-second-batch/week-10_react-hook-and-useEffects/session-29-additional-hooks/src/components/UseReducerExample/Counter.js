import React from "react";

const Counter = () => {
  return (
    <div>
      {/*
        useReducer:
        - Why: For managing complex state logic that involves multiple sub-values or when the next state depends on the previous one.
        - What: An alternative to useState. It accepts a reducer function and an initial state, and returns the current state and a dispatch function.
        - How:
          1. Define a `reducer` function: `(state, action) => newState`.
          2. Call `useReducer(reducer, initialState)` to get `[state, dispatch]`.
          3. Call `dispatch({ type: 'ACTION_TYPE', payload: ... })` to update the state.
      */}
      <h2>useReducer Example</h2>
      {/* We will display the count and buttons to increment, decrement, and reset it */}
    </div>
  );
};

export default Counter;
