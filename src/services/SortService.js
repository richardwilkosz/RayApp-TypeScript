import Constants from "../assets/Constants.js";

export default {
  sortMovieArray: function (movieArray, sortBy) {
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

  sortAlphabetical(movieArray) {
    movieArray.sort(function (a, b) {
      let titleA = a.title.replace("The ", "").toUpperCase();
      let titleB = b.title.replace("The ", "").toUpperCase();
      return titleA > titleB ? 1 : titleB > titleA ? -1 : 0;
    });
  },

  sortByRuntime(movieArray, ascOrDesc) {
    let sortMethod;

    if (ascOrDesc === Constants.SORT_ASC) {
      sortMethod = function (arr) {
        arr.sort((a, b) => b.runtime - a.runtime);
      };
    } else {
      sortMethod = function (arr) {
        arr.sort((a, b) => a.runtime - b.runtime);
      };
    }

    sortMethod(movieArray);
  },

  sortByReleaseYear(movieArray, ascOrDesc) {
    let sortMethod;

    if (ascOrDesc === Constants.SORT_ASC) {
      sortMethod = function (arr) {
        arr.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      };
    } else {
      sortMethod = function (arr) {
        arr.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      };
    }

    sortMethod(movieArray);
  },
}