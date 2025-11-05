import React from "react";

const UseMemoCallbackExample = () => {
  return (
    <div>
      {/*
        useMemo:
        - Why: To optimize performance by memoizing the result of an expensive calculation.
        - What: It returns a memoized value. The calculation is only re-run if a dependency changes.
        - How: `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`

        useCallback:
        - Why: To optimize performance by memoizing a function, preventing unnecessary re-renders of child components.
        - What: It returns a memoized version of the callback function that only changes if a dependency has changed.
        - How: `const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);`
      */}
      <h2>useMemo and useCallback Example</h2>
      {/* We will have an expensive calculation and a memoized component to demonstrate the hooks */}
    </div>
  );
};

export default UseMemoCallbackExample;
