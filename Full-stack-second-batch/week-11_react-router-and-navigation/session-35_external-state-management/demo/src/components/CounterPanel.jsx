import React from "react";
import { useCounterStore } from "../state/counterStore.js";
import { useRenderCount } from "./useRenderCount.js";

export default function CounterPanel() {
  useRenderCount("CounterPanel");
  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);
  const decrement = useCounterStore((s) => s.decrement);
  const reset = useCounterStore((s) => s.reset);

  return (
    <div className="panel">
      <h2>Counter Store</h2>
      <p>
        Count: <strong>{count}</strong>
      </p>
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
      <small>Each button uses a selector so only needed parts re-render.</small>
    </div>
  );
}
