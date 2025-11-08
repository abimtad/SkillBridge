import React from "react";
<<<<<<< HEAD

const ThemedComponent = () => {
  // We will use the useTheme custom hook to get the theme and toggleTheme function

  return (
    <div>
      {/* This component will display the current theme and have a button to toggle it */}
=======
import { useTheme } from "../../hooks/useTheme";

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

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
>>>>>>> finished-app
    </div>
  );
};

export default ThemedComponent;
