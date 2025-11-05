import React from "react";
import UseContextExample from "./components/UseContextExample/UseContextExample";
import Counter from "./components/UseReducerExample/Counter";
import UseMemoCallbackExample from "./components/UseMemoCallbackExample/UseMemoCallbackExample";
import CustomHookExample from "./components/CustomHookExample/CustomHookExample";
import HookRules from "./components/HookRules/HookRules";
import "./App.css";

function App() {
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
    </div>
  );
}

export default App;
