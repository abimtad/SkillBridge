import React from "react";

const MovieSearch = ({ apiKey }) => {
  // 1. STATE: We need a place to store the list of movies we fetch.
  //    - Create a state variable called `movies` and a function to update it called `setMovies`.
  //    - The initial value should be an empty array `[]`.

  // 2. SIDE EFFECT: We need to fetch data from the TMDB API when the component mounts.
  //    - Use the `useEffect` hook to perform this side effect.
  //    - Inside the effect, create a function to fetch popular movies.
  //    - URL: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  //    - Once you get the data, update the `movies` state with the results.
  //    - Remember to add an empty dependency array `[]` to run this effect only once on mount.

  return (
    <div>
      <h2>Popular Movies</h2>
      <p>Let's fetch and display some movies!</p>

      {/* 3. DISPLAY: We need to display the movies.
          - Map over the `movies` state array.
          - For each `movie`, render a `div` with a class of `movie-card`.
          - Inside the div, show the movie's poster and title.
          - Poster URL: `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          - Don't forget to add a unique `key` to each movie card!
      */}
      <div className="movie-list">{/* Movie cards will go here */}</div>
    </div>
  );
};

export default MovieSearch;
