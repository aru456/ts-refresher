import { useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import type { Movie } from "./types/Movie";

const API_URL = "http://www.omdbapi.com/?apikey=72389c5f";

const App = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const searchMovies = async (title: string) => {
    if (!title) {
      setMovies([]);
      return;
    }
    setLoading(true); // Set loading to true before API call
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error || "No movies found");
      }
      setMovies(Array.isArray(data.Search) ? data.Search : []);
    } catch (error: any) {
      console.error("Error fetching movies:", error.message);
      setMovies([]);
    } finally {
      setTimeout(() => setLoading(false), 300); // Add a minimum delay of 300ms before hiding the loading state
    }
  };

  return (
    <>
      <div className="app">
        <h1>Movie Land</h1>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              searchMovies(e.target.value);
            }}
          />
          <img src="https://img.icons8.com/?size=100&id=e4NkZ7kWAD7f&format=png&color=FFBD00" />
        </div>
        {searchInput?.length > 0 ? (
          loading ? (
            <h3 style={{ color: "white" }}>Loading...</h3>
          ) : movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie}></MovieCard>
              ))}
            </div>
          ) : (
            <h3 style={{ color: "white" }}>
              No movies found with "{searchInput}"
            </h3>
          )
        ) : (
          <h1>Search a title above</h1>
        )}
      </div>
    </>
  );
};

export default App;
