import React from "react";
import ThemedComponent from "./ThemedComponent";
import ThemeProvider from "../../providers/ThemeProvider";

const UseContextExample = () => {
  return (
    <div>
      {/* 
        useContext Syntax:
        1. Create a context: export const MyContext = React.createContext(defaultValue);
        2. Provide the context value to children: <MyContext.Provider value={...}>...</MyContext.Provider>
        3. Consume the context value: const value = useContext(MyContext);
      */}
      <h2>useContext Example</h2>
      <ThemeProvider>
        <ThemedComponent />
      </ThemeProvider>
    </div>
  );
};

export default UseContextExample;
