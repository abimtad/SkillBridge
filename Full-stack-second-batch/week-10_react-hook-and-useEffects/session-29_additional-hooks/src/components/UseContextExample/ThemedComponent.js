import React from "react";
import { useTheme } from "../../hooks/useTheme";

const ThemedComponent = () => {

  const style = {
    backgroundColor: theme === "dark" ? "#333" : "#FFF",
    color: theme === "dark" ? "#FFF" : "#333",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  return (
    <div style={style}>
      The current theme is {theme}.
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemedComponent;
