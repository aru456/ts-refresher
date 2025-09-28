import type { Movie } from "../types/Movie"; // Use type-only import

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div>
      <div className="movie">
        <div>
          <p>{movie.Year}</p>
        </div>
        <div>
          <img
            src={
              movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/400"
            }
            alt={movie.Title}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/400";
            }}
          />
        </div>
        <div>
          <span>{movie.Type}</span>
          <h3>{movie.Title}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
