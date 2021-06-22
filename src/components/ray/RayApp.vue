<template>
  <div id="RayApp" class="AppWithFooter">
    <AppBar
      @update-search="search"
      @update-sort="updateSortBy"
      @update-filter="updateFilterGenres"
      @menu-view-all="queryAllOwned"
      :genres="genres"
      :ownedMovieTitles="ownedMovieTitles"
    />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col lg="2" class="d-none d-lg-block">
            <div class="StickyColContent">
              <SortFilterMenu
                :genres="genres"
                @update-sort="updateSortBy"
                @update-filter="updateFilterGenres"
              />
            </div>
          </v-col>
          <v-col cols="12" lg="10">
            <MovieList
              :ownedMovies="sortFilterResults(ownedResults)"
              :unownedMovies="sortFilterResults(unownedResults)"
              :genres="genres"
              :isLoading="isLoading"
              :isSortingByYear="isSortingByYear"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from "axios";
import Constants from "../../assets/Constants";
import SortService from "../../services/SortService";
import FilterService from "../../services/FilterService";

import AppBar from "./AppBar.vue";
import SortFilterMenu from "./SortFilterMenu.vue";
import MovieList from "./MovieList.vue";
import AppFooter from "./AppFooter.vue";

import { Movie } from "../../models/movie.model";
import { Genre } from "../../models/genre.model";

@Component({
  components: {
    AppBar,
    SortFilterMenu,
    MovieList,
    AppFooter,
  }
})

export default class RayApp extends Vue {
  /*
    Properties
  */
  name = "Ray";

  // Search
  searchInput = "";
  isLoading = true;
  ownedMovieTitles: Array<string> = [];

  // API consumption
  ownedMovies: Array<Movie> = [];
  ownedResults: Array<Movie> = [];
  unownedResults: Array<Movie> = [];

  // Sort/filter
  sortBy: number = Constants.SORT_ALPHA;
  isSortingByYear = false;
  filterGenreIds: Array<number> = [Constants.FILTER_DEFAULT];
  genres: Array<Genre> = [];

  created(): void {
    document.title = "Ray"
    this.$vuetify.theme.dark = true;


    // Get list of owned movies
    axios.get(Constants.OWNED_LIST_QUERY).then((response) => {
      let ownedResults = response.data.items;
      let ownedDetailPromises: Array<any> = [];

      // Get extra details of each owned movie, e.g. runtime
      ownedResults.forEach((result: Movie) =>
        ownedDetailPromises.push(this.getOwnedDetails(result.id))
      );

      // Get list of genres
      axios.get(Constants.GENRES_QUERY).then((response) => {
        this.genres = response.data.genres;
        this.genres.unshift({
          id: Constants.FILTER_DEFAULT,
          name: "Include All Genres",
        });
      });

      // Finalize lists after API calls are complete
      Promise.all(ownedDetailPromises).then((results) => {        
        // Finalize search results
        results.forEach((result) => this.ownedMovies.push(this.apiCallToModel(result.data)));
        this.queryAllOwned();
        this.isLoading = false;

        // Finalize search autocomplete
        let titles = new Array<string>();
        this.ownedMovies.forEach((ownedMovie: Movie) => titles.push(ownedMovie.title));
        this.ownedMovieTitles = titles;
      });
    });
  }

  /*
    Search methods
  */
  search(searchInput: string): void {
    // Prevent duplicate searches
    if (searchInput !== this.searchInput) {
      this.searchInput = searchInput;

      // Clear previous results
      this.ownedResults = [];
      this.unownedResults = [];

      if (searchInput === Constants.SEARCH_ALL) {
        this.queryAllOwned();
      } else {
        this.queryFromString(searchInput);
      }
    }
  }

  queryAllOwned(): void {
    this.ownedResults = this.ownedMovies;
  }

  queryFromString(searchInput: string): void {
    this.isLoading = true;

    // Query list of owned movies created at init
    this.ownedResults = this.ownedMovies.filter((ownedMovie: Movie) =>
      ownedMovie.title.toUpperCase().includes(searchInput.toUpperCase())
    );

    // Query API for unowned movies that match too, preventing duplicates
    axios.get(Constants.SEARCH_QUERY + searchInput).then((response) => {
      let allResults = response.data.results;
      this.unownedResults = allResults.filter(
        (result: Movie) =>
          !this.ownedResults.find((ownedResult: Movie) => ownedResult.id === result.id)
      );

      this.isLoading = false;
    });
  }

  getOwnedDetails(id: number): any {
    return axios.get(Constants.DETAILS_QUERY(id));
  }

  apiCallToModel(a: any): Movie {
    return new Movie(a.id, a.title, a.release_date, a.description, a.runtime, a.poster_path, a.backdrop_path, a.genres, a.genre_ids);
  }

  /*
    Sort/Filter methods
  */
  sortFilterResults(resultsArray: Array<Movie>): Array<Movie> {
    let sortedFilteredArray = resultsArray.slice(); // Copy by value, not by reference
    sortedFilteredArray = this.filterResults(sortedFilteredArray);
    this.sortResults(sortedFilteredArray);
    return sortedFilteredArray;
  }

  updateSortBy(sortBy: number): void {
    this.sortBy = sortBy;

    this.isSortingByYear =
      this.sortBy === Constants.SORT_NEW ||
      this.sortBy === Constants.SORT_OLD;
  }

  updateFilterGenres(filterGenreIds: Array<number>): void {
    this.filterGenreIds = filterGenreIds;
  }

  sortResults(resultsArray: Array<Movie>): void {
    return SortService.sortMovieArray(resultsArray, this.sortBy);
  }

  filterResults(resultsArray: Array<Movie>): Array<Movie> {
    return FilterService.filterMovieArray(resultsArray, this.filterGenreIds);
  }
}
</script>

<style lang="scss">
// Custom font(s)
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap");
$body-font-family: "Open Sans";
$title-font: "Open Sans";
.v-application {
  font-family: $body-font-family, sans-serif !important;
  .title {
    // To pin point specific classes of some components
    font-family: $title-font, sans-serif !important;
  }
}
</style>