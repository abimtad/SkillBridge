import React from "react";
import { usePrefsStore } from "../state/prefsStore.js";
import { useRenderCount } from "./useRenderCount.js";

export default function ThemeToggle() {
  useRenderCount("ThemeToggle");
  const theme = usePrefsStore((s) => s.theme);
  const toggleTheme = usePrefsStore((s) => s.toggleTheme);
  const reset = usePrefsStore((s) => s.reset);

  return (
    <div
      className="panel"
      style={{
        background: theme === "dark" ? "#1f2937" : "white",
        color: theme === "dark" ? "#f1f5f9" : "inherit",
      }}
    >
      <h2>Preferences Store</h2>
      <p>
        Theme: <strong>{theme}</strong>
      </p>
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <button onClick={reset}>Reset</button>
      </div>
      <small>Only theme persisted (sidebar flag not persisted).</small>
    </div>
  );
}
