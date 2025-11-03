import React from "react";

const MovieDetail = ({ movie, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back to List</button>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetail;
