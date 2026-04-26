import { useState } from "react";
import { fetchMovies } from "../services/movieService.ts";
import type { Movie } from "../types/movie.ts";

import SearchBar from "./SearchBar/SearchBar.tsx"; 
import MovieGrid from "./MovieGrid/MovieGrid.tsx";
import Loader from "./Loader/Loader.tsx";
import ErrorMessage from "./ErrorMessage/ErrorMessage.tsx";
import MovieModal from "./MovieModal/MovieModal.tsx";

import { Toaster, toast } from "react-hot-toast";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(false);
      setMovies([]);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}
      {error && <ErrorMessage />}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;