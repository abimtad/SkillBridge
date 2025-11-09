import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => {
  // This custom hook simplifies using the ThemeContext.
  // Instead of `useContext(ThemeContext)` in every component, we can just use `useTheme()`.
  // It also provides a safety check to ensure the context is used within a provider.
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
