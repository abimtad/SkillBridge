<<<<<<< HEAD
import React from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeProvider = ({ children }) => {
  // We will use useState to manage the theme state (light/dark)
  // We will create a function to toggle the theme

  return (
    // We will provide the theme state and the toggle function to the children
    // <ThemeContext.Provider value={{ theme, toggleTheme }}>
    //   {children}
    // </ThemeContext.Provider>
    <>{children}</>
=======
import React, { useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
>>>>>>> finished-app
  );
};

export default ThemeProvider;
