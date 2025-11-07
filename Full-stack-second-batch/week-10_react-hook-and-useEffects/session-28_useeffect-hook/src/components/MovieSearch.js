import { useState, useEffect, useCallback } from "react";
import MovieDetail from "./MovieDetail";

const MovieSearch = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = useCallback(
    (page) => {
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setMovies(data.results))
        .catch((error) => console.error("Error fetching movies:", error));
    },
    [apiKey]
  );

  useEffect(() => {
    fetchMovies(page);
  }, [fetchMovies, page]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBack = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    return <MovieDetail movie={selectedMovie} onBack={handleBack} />;
  }

  return (
    <div>
      <h2>Popular Movies</h2>
      <p>
        This component fetches a list of popular movies from The Movie Database
        (TMDB) API. This demonstrates how to use `useEffect` to fetch data when
        the component mounts and when a dependency (the page number) changes.
      </p>
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
