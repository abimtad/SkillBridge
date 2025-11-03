import "./App.css";
import MovieSearch from "./components/MovieSearch";

function App() {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  return (
    <div className="App">
      <header className="App-header">
        <h1>React useEffect Hook Workshop</h1>
      </header>
      <main>
        <MovieSearch apiKey={apiKey} />

        {/* 4. CLEANUP: We will add a new component here later to demonstrate the cleanup function. */}
      </main>
    </div>
  );
}

export default App;
