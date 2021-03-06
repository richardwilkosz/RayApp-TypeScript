import Constants from "../assets/Constants";
import { Movie } from "../models/movie.model";

export default {
  filterMovieArray(movieArray: Array<Movie>, filterGenreIds: Array<number>): Array<Movie> {
    if (filterGenreIds.includes(Constants.FILTER_DEFAULT)) {
      return movieArray;
    }
    else {
      return movieArray.filter(function (movie) {
        // Account for the fact that TMDB sets genres to different property names based on query
        // Owned movies: Array<object> genres
        if (movie.genres) {
          return movie.genres ? movie.genres.some(genre => filterGenreIds.includes(genre.id)) : [];
        }
        // Unowned movies: Array<number> genre_ids
        else {
          return movie.genre_ids ? movie.genre_ids.some(genreId => filterGenreIds.includes(genreId)) : [];
        }
      });
    }
  }
}