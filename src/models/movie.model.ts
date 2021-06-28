import { Genre } from "./genre.model";

export class Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  runtime?: number;
  poster_path?: string;
  backdrop_path?: string;
  
  // Account for the fact that TMDB sets genres to different property names based on query
  genres?: Array<Genre>      // Owned movies: Array<object> genres
  genre_ids?: Array<number>  // Unowned movies: Array<number> genre_ids

  // constructor(id: number, title: string, release_date: string, overview: string, runtime?: number, poster_path?: string, backdrop_path?: string, genres?: Array<Genre>, genre_ids?: Array<number>) {
  //   this.id = id;
  //   this.title = title;
  //   this.release_date = release_date;
  //   this.overview = overview;

  //   // Optional
  //   this.runtime = runtime;
  //   this.poster_path = poster_path;
  //   this.backdrop_path = backdrop_path;
  //   this.genres = genres;
  //   this.genre_ids = genre_ids;
  // }

  constructor(tmdbObject: any) {
    this.id = tmdbObject.id;
    this.title = tmdbObject.title;
    this.release_date = tmdbObject.release_date;
    this.overview = tmdbObject.overview;

    // Optional
    this.runtime = tmdbObject.runtime;
    this.poster_path = tmdbObject.poster_path;
    this.backdrop_path = tmdbObject.backdrop_path;
    this.genres = tmdbObject.genres;
    this.genre_ids = tmdbObject.genre_ids;
  }
}