import React, { useState } from "react";
import UseContextExample from "./components/UseContextExample/UseContextExample";
import Counter from "./components/UseReducerExample/Counter";
import UseMemoCallbackExample from "./components/UseMemoCallbackExample/UseMemoCallbackExample";
import CustomHookExample from "./components/CustomHookExample/CustomHookExample";
import HookRules from "./components/HookRules/HookRules";
import "./App.css";

function App() {
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
    </div>
  );
}

export default App;
