import React, { useState } from "react";
import "./App.css";
import MovieSearch from "./components/MovieSearch";
import CurrentTime from "./components/CurrentTime";

function App() {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [showTime, setShowTime] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React useEffect Hook Concepts</h1>
      </header>
      <main>
        <button onClick={() => setShowTime(!showTime)}>
          {showTime ? "Hide" : "Show"} Live Clock
        </button>
        {showTime && <CurrentTime />}
        <MovieSearch apiKey={apiKey} />
      </main>
    </div>
  );
}

export default App;
