# React `useEffect` Hook: A Deep Dive

This project is a hands-on guide to understanding the `useEffect` hook in React. It's designed to be a teaching tool, demonstrating the core concepts of side effects, dependency arrays, and cleanup functions in a clear and interactive way.

## How to Run This Project

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

---

## Part 1: What is `useEffect`?

The `useEffect` hook is a fundamental tool in React that lets you perform "side effects" in your functional components.

**What is a Side Effect?**

A side effect is any interaction with the world outside of the component's render cycle. If your component is doing anything other than just calculating and returning JSX, it's a side effect. Common examples include:

- Fetching data from an API.
- Setting up timers (`setInterval`) or subscriptions.
- Manually changing the DOM (e.g., adding an event listener).
- Reading from `localStorage`.

**Why is `useEffect` Needed?**

A React component's main job is to render UI based on its props and state. This rendering process should be "pure" — meaning for the same inputs, it should always produce the same output.

If you place a side effect directly in the component's body, it will run on _every single render_. This can lead to unpredictable behavior and infinite loops. `useEffect` gives us a safe, controlled environment to run these side effects _after_ the component has rendered, and it allows us to control _when_ they run.

---

## Part 2: The Component Lifecycle with `useEffect`

In class components, you have lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. The `useEffect` hook unifies these concepts into a single API.

### 1. On Mount (like `componentDidMount`)

To run an effect only once when the component first mounts, provide an **empty dependency array `[]`**.

```javascript
useEffect(() => {
  // This code runs only once, after the initial render.
  console.log("Component has mounted!");
}, []); // <-- Empty array
```

### 2. On Update (like `componentDidUpdate`)

To run an effect when specific data changes, put that data in the **dependency array**.

```javascript
useEffect(() => {
  // This code runs on mount AND whenever `page` changes.
  console.log(`The page has changed to: ${page}`);
}, [page]); // <-- `page` is a dependency
```

### 3. On Unmount (like `componentWillUnmount`)

To run cleanup code when a component is removed from the screen, return a **cleanup function** from your effect.

```javascript
useEffect(() => {
  // Effect setup code runs here...

  return () => {
    // This cleanup code runs when the component unmounts.
    console.log("Component is unmounting. Cleaning up!");
  };
}, []);
```

---

## Part 3: Deep Dive into the Concepts

### Concept 1: Side Effects (Fetching Data)

**File:** `src/components/MovieSearch.js`

This component fetches a list of popular movies from The Movie Database (TMDB) API. This is a classic side effect.

**The Code:**

```javascript
// ...
const fetchMovies = useCallback(/* ... */);

useEffect(() => {
  fetchMovies(page);
}, [fetchMovies, page]);
// ...
```

**Step-by-Step Explanation:**

1.  The `useEffect` hook is defined. Its job is to call our `fetchMovies` function.
2.  When the component first mounts, React runs this effect after rendering the initial UI.
3.  The `fetchMovies` function is called, which makes a network request to the TMDB API.
4.  When the data arrives, `setMovies(data.results)` is called, updating the component's state and triggering a re-render to display the movies.

### Concept 2: The Dependency Array

**File:** `src/components/MovieSearch.js`

The dependency array is the most critical part of controlling your effects. It tells React: "Only re-run this effect if one of these values has changed."

**The Code:**

```javascript
useEffect(() => {
  fetchMovies(page);
}, [fetchMovies, page]); // <-- The dependency array
```

**What can go in the dependency array?**
Any value from your component's scope that is used inside the effect: **props, state, or functions**.

**Why is it so important?**
It prevents the effect from running unnecessarily. Let's look at the options:

- **`[page]`**: If we only included `page`, the effect would run when `page` changes. This seems right, but the ESLint rules will warn you that `fetchMovies` is also a dependency, because it's used inside the effect.
- **`[fetchMovies, page]`**: This is the correct set of dependencies. The effect will re-run if the `page` number changes OR if the `fetchMovies` function itself changes. (We use `useCallback` to make sure `fetchMovies` doesn't change on every render).
- **`[]` (Empty Array)**: The effect would only run on the initial mount. If you clicked "Next Page," the `page` state would update, but the effect wouldn't re-run, and no new movies would be fetched.
- **No Array (Omitted)**: The effect would run after _every single render_, leading to an infinite loop of API calls.

### Concept 3: The Cleanup Function

**File:** `src/components/CurrentTime.js`

This component demonstrates how to clean up a side effect. It sets up a timer that needs to be stopped when the component is no longer needed.

**The Code:**

```javascript
useEffect(() => {
  const timerId = setInterval(() => {
    setTime(new Date());
  }, 1000);

  // This is the cleanup function
  return () => {
    clearInterval(timerId);
    console.log("Timer cleared!");
  };
}, []);
```

**Step-by-Step Explanation:**

1.  **On Mount**: The `useEffect` hook runs. `setInterval` is called, which starts a timer that updates the time every second. The ID of this timer is stored in `timerId`.
2.  **The Return**: React sees that the effect returned a function. It holds onto this function for later.
3.  **On Unmount**: When you click "Hide Live Clock," the `CurrentTime` component is removed. Just before it's removed, React executes the cleanup function it was holding.
4.  **Cleanup**: `clearInterval(timerId)` is called, which stops the timer, preventing it from running in the background forever and causing a memory leak.

### Concept 4: `useCallback` and `useEffect`

**File:** `src/components/MovieSearch.js`

This is a more advanced but crucial concept for performance.

**The Code:**

```javascript
const fetchMovies = useCallback(
  (page) => {
    // ... fetch logic ...
  },
  [apiKey]
);

useEffect(() => {
  fetchMovies(page);
}, [fetchMovies, page]);
```

**Step-by-Step Explanation:**

1.  **The Problem**: In JavaScript, functions are objects. If you define a function inside a component, a _new_ function object is created on every single render.
2.  **The Consequence**: Our effect depends on `fetchMovies`. If `fetchMovies` is a new function on every render, React thinks the dependency has changed, and it re-runs the effect, causing an infinite loop.
3.  **The Solution (`useCallback`)**: `useCallback` is a hook that "memoizes" (remembers) your function. It will return the _exact same function instance_ on every re-render, unless one of _its own_ dependencies (`[apiKey]`) changes.
4.  **The Result**: Because `useCallback` gives `useEffect` a stable function, the effect no longer re-runs unnecessarily. It will only run when `page` changes, which is the behavior we want.

This project provides a solid foundation for understanding the `useEffect` hook. Encourage your students to experiment with the code, change the dependencies, and observe the results in the browser and console. Happy coding!
