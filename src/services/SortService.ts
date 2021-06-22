import Constants from "../assets/Constants.js";
import { Movie } from "../models/movie.model";

export default {
  sortMovieArray: function (movieArray: Array<Movie>, sortBy: number): void {
    switch (sortBy) {
      case Constants.SORT_ALPHA:
        return this.sortAlphabetical(movieArray);
      case Constants.SORT_SHORT:
        return this.sortByRuntime(movieArray, Constants.SORT_DESC);
      case Constants.SORT_LONG:
        return this.sortByRuntime(movieArray, Constants.SORT_ASC);
      case Constants.SORT_NEW:
        return this.sortByReleaseYear(movieArray, Constants.SORT_ASC);
      case Constants.SORT_OLD:
        return this.sortByReleaseYear(movieArray, Constants.SORT_DESC);
      default:
        return this.sortAlphabetical(movieArray);
    }
  },

  sortAlphabetical(movieArray: Array<Movie>) {
    movieArray.sort(function (a, b) {
      const titleA = a.title.replace("The ", "").toUpperCase();
      const titleB = b.title.replace("The ", "").toUpperCase();
      return titleA > titleB ? 1 : titleB > titleA ? -1 : 0;
    });
  },

  sortByRuntime(movieArray: Array<Movie>, ascOrDesc: string) {
    let sortMethod;

    if (ascOrDesc === Constants.SORT_ASC) {
      sortMethod = function (arr: Array<Movie>) {
          arr.sort((a, b) => (b.runtime ? b.runtime : 0) - (a.runtime ? a.runtime : 0));
      };
    } else {
      sortMethod = function (arr: Array<Movie>) {
        arr.sort((a, b) => (a.runtime ? a.runtime : 0) - (b.runtime ? b.runtime : 0));
      };
    }

    sortMethod(movieArray);
  },

  sortByReleaseYear(movieArray: Array<Movie>, ascOrDesc: string) {
    let sortMethod;

    if (ascOrDesc === Constants.SORT_ASC) {
      sortMethod = function (arr: Array<Movie>) {
        arr.sort(
          (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
        );
      };
    } else {
      sortMethod = function (arr: Array<Movie>) {
        arr.sort(
          (a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
        );
      };
    }

    sortMethod(movieArray);
  },
}