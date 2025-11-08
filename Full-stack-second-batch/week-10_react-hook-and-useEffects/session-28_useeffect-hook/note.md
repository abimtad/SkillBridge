Here’s a **teachable, well-structured Markdown** version — perfect for learning, note-taking, or using in documentation/tutorials 👇

---

# 🧩 Common `useEffect` Patterns in React

The `useEffect` hook lets you perform _side effects_ in function components — like data fetching, syncing with APIs, setting up subscriptions, and cleaning up.

Understanding common patterns helps you use it effectively and avoid confusion.

---

## 🧠 1. Run Once on Mount (Initialization)

```jsx
useEffect(() => {
  // Runs only once when the component mounts
  console.log("Component mounted");
}, []);
```

### 💡 Use Cases

- Fetch initial data
- Subscribe to an event or service
- Initialize timers or connections

**Example:**

```jsx
useEffect(() => {
  fetch("/api/user")
    .then((r) => r.json())
    .then(setUser);
}, []);
```

---

## 🔁 2. Run When Dependencies Change

```jsx
useEffect(() => {
  console.log("User ID changed:", userId);
  fetch(`/api/user/${userId}`)
    .then((r) => r.json())
    .then(setUser);
}, [userId]);
```

### 💡 Use Cases

- Fetch data when a prop or state changes
- Recalculate or re-render on filters
- Respond to user input changes

🧠 Think of `[deps]` as: _“Re-run this effect if any of these values change.”_

---

## 🧹 3. Cleanup on Unmount or Before Rerun

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // cleanup
}, []);
```

### 💡 Use Cases

- Clear timers or intervals
- Unsubscribe from sockets/events
- Reset state or listeners

React runs the cleanup:

- When the component **unmounts**, or
- Before re-running the effect when dependencies change

---

## 🔄 4. Dynamic Dependencies with Cleanup

```jsx
useEffect(() => {
  const connection = connectToServer(roomId);
  return () => connection.disconnect();
}, [roomId]);
```

### 💡 Use Cases

- When an effect depends on a changing value
- Managing a resource that must be cleaned up each time it changes

---

## 📦 5. Sync State with External Systems

```jsx
useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

### 💡 Use Cases

- Save preferences or app state in local storage
- Log user actions or analytics
- Keep UI state synced with APIs

---

## ⚡ 6. Derived Effects (Reacting to Computed Values)

```jsx
const isAdult = age >= 18;

useEffect(() => {
  if (isAdult) console.log("Welcome to the adult section!");
}, [isAdult]);
```

### 💡 Use Cases

- Trigger logic when a _derived_ value changes
- Conditional UI updates

---

## 🧩 7. Async Logic Inside Effects

```jsx
useEffect(() => {
  let isCancelled = false;

  async function loadData() {
    const data = await fetch("/api/data").then((r) => r.json());
    if (!isCancelled) setData(data);
  }

  loadData();

  return () => {
    isCancelled = true;
  };
}, []);
```

### 💡 Use Cases

- Fetch data safely with cleanup
- Prevent state updates after unmount

---

## 🪞 8. Reacting to Prop or Context Changes

```jsx
useEffect(() => {
  logAnalyticsEvent("page-view", { page });
}, [page]);
```

### 💡 Use Cases

- Analytics or tracking
- Respond to parent prop or context value changes

---

## ⏱️ 9. Debounced or Throttled Effects

```jsx
useEffect(() => {
  const timeout = setTimeout(() => {
    fetch(`/api/search?q=${query}`)
      .then((r) => r.json())
      .then(setResults);
  }, 500);

  return () => clearTimeout(timeout);
}, [query]);
```

### 💡 Use Cases

- Debouncing user input
- Optimizing performance-heavy updates

---

## 🧭 Summary

| Pattern           | When It Runs                | Common Use                       |
| ----------------- | --------------------------- | -------------------------------- |
| **Mount only**    | On component mount          | Initialization, first-time fetch |
| **On change**     | When dependencies change    | Data fetch, recalculation        |
| **Cleanup**       | On unmount or rerun         | Clear timers, unsubscribes       |
| **Async effect**  | When async logic runs       | Safe data fetching               |
| **Sync external** | On state/prop change        | Local storage, analytics         |
| **Derived**       | When computed value changes | Conditional effects              |
| **Debounced**     | Delayed after change        | Search, live filters             |

---

## 🧩 Bonus: Combined Example

```jsx
useEffect(() => {
  let ignore = false;

  async function fetchData() {
    const res = await fetch(`/api/user/${userId}`);
    const data = await res.json();
    if (!ignore) setUser(data);
    localStorage.setItem("lastUser", userId);
  }

  fetchData();

  return () => {
    ignore = true;
  };
}, [userId]);
```

### ✨ What Happens Here

- Runs whenever `userId` changes
- Fetches and updates data
- Saves user ID to `localStorage`
- Cleans up to prevent memory leaks

---

Would you like me to turn this into a **formatted `.md` file** you can download (for use in VS Code or Notion)?
