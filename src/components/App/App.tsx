import { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import {type Movie } from "../../types/movie";

import css from'./App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setMovies([])
    setIsError(false);
    setIsLoading(true);
    
    try {
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data);
    } catch {
      setIsError(true);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false); 
    }
  }
  
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

const handleCloseModal = () => {
  setSelectedMovie(null);
};

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      {movies.length > 0 && !isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      
      <Toaster position="top-center" />
    </div>
  );
}