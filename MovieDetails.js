import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "1a7c8b6d"; 

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]); 

  const fetchMovieDetails = async () => {
    try {
      const res = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      setMovie(res.data);
    } catch (err) {
      setError("Failed to fetch movie details. Please try again later.");
      console.error("Error fetching movie details:", err);
    }
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container text-center mt-4">
      <h2 className="text-warning">{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded shadow" />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
    </div>
  );
}

export default MovieDetails;
