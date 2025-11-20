import React, { useEffect } from "react";
import { useCounterStore } from "../state/counterStore.js";
import { useRenderCount } from "./useRenderCount.js";

// Shows difference between subscribing to whole store vs a slice.
export default function PerformanceDemo() {
  useRenderCount("PerformanceDemo(full+slice)");
  const full = useCounterStore(); // full subscription (not recommended generally)
  const count = useCounterStore((s) => s.count); // slice subscription (preferred)

  useEffect(() => {
    console.log("[PerformanceDemo] render");
  });

  return (
    <div className="panel">
      <h2>Performance Demo</h2>
      <p>Full subscription count: {full.count}</p>
      <p>Slice subscription count: {count}</p>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <button onClick={full.increment}>Increment</button>
        <button onClick={full.reset}>Reset</button>
      </div>
      <small>
        Open console to see renders. Use selectors to reduce renders.
      </small>
    </div>
  );
}
