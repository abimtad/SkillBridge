<<<<<<< HEAD
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
=======
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error();
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {/*
        useReducer Syntax:
        const [state, dispatch] = useReducer(reducer, initialState);
        - reducer: A function that specifies how the state gets updated. (state, action) => newState
        - initialState: The initial state.
        - dispatch: A function to dispatch actions to the reducer.
      */}
      <h2>useReducer Example</h2>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment", payload: 2 })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 2 })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: "reset", payload: 2 })}>
        Reset
      </button>
>>>>>>> finished-app
    </div>
  );
};

export default Counter;
