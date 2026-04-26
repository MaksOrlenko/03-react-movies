import type { Movie } from "../../types/movie";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: Props) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "https://placehold.co/300x450?text=No+Image"
            }
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
}