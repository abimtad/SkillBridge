<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> finished-app
import UseContextExample from "./components/UseContextExample/UseContextExample";
import Counter from "./components/UseReducerExample/Counter";
import UseMemoCallbackExample from "./components/UseMemoCallbackExample/UseMemoCallbackExample";
import CustomHookExample from "./components/CustomHookExample/CustomHookExample";
import HookRules from "./components/HookRules/HookRules";
import "./App.css";

function App() {
<<<<<<< HEAD
  return (
    <div className="App">
      <h1>React Hooks Demo</h1>
      <div className="page">
        <UseContextExample />
      </div>
      <div className="page">
        <Counter />
      </div>
      <div className="page">
        <UseMemoCallbackExample />
      </div>
      <div className="page">
        <CustomHookExample />
      </div>
      <div className="page">
        <HookRules />
      </div>
=======
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>React Hooks Demo</h1>
      <hr />
      <UseContextExample count={count} setCount={setCount} />
      <hr />
      <Counter />
      <hr />
      <UseMemoCallbackExample />
      <hr />
      <CustomHookExample />
      <hr />
      <HookRules />
>>>>>>> finished-app
    </div>
  );
}

export default App;
