<template>
  <div id="RayApp" class="AppWithFooter">
    <AppBar
      @update-search="search"
      @update-sort="updateSortBy"
      @update-filter="updateFilterGenres"
      @menu-view-all="queryAllOwned"
      :genres="genres"
      :ownedMovieTitles="getOwnedMovieTitles"
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
import axios from "axios";
import Constants from "../assets/Constants.js";
import SortService from "../services/SortService.js";
import FilterService from "../services/FilterService.js";

import AppBar from "../components/ray/AppBar";
import SortFilterMenu from "../components/ray/SortFilterMenu";
import MovieList from "../components/ray/MovieList";
import AppFooter from "../components/ray/AppFooter";

export default class RayApp extends Vue {
  id: "Ray",
  data: function(): {
    return {
    // Search
    searchInput: "",
    isLoading: true,

    // API consumption
    ownedMovies: [],
    ownedResults: [],
    unownedResults: [],

    // Sort/filter
    sortBy: Constants.SORT_ALPHA,
    isSortingByYear: false,
    filterGenreIds: [Constants.FILTER_DEFAULT],
    genres: [],
    }
  },

  components: {
    AppBar,
    SortFilterMenu,
    MovieList,
    AppFooter,
  },

  created() {
    document.title = "Ray"

    let vm = this;
    vm.$vuetify.theme.dark = true;

    // Get list of owned movies
    axios.get(Constants.OWNED_LIST_QUERY).then((response) => {
      let ownedResults = response.data.items;
      let ownedDetailPromises = [];

      // Get extra details of each owned movie, e.g. runtime
      ownedResults.forEach((result) =>
        ownedDetailPromises.push(vm.getOwnedDetails(result.id))
      );

      // Get list of genres
      axios.get(Constants.GENRES_QUERY).then((response) => {
        vm.genres = response.data.genres;
        vm.genres.unshift({
          id: Constants.FILTER_DEFAULT,
          name: "Include All Genres",
        });
      });

      // Finalize list after API calls are complete
      Promise.all(ownedDetailPromises).then(function (results) {
        results.forEach((result) => vm.ownedMovies.push(result.data));
        vm.queryAllOwned();
        vm.isLoading = false;
      });
    });
  },

  computed: {
    getOwnedMovieTitles() {
      let titles = new Array();
      this.ownedMovies.forEach((ownedMovie) => titles.push(ownedMovie.title));
      return titles;
    },
  },

  methods: {
    /*
      Search methods
    */
    search(searchInput) {
      // Prevent duplicate searches
      if (searchInput !== this.searchInput) {
        this.searchInput = searchInput;

        // Clear previous results
        this.ownedResults = new Array();
        this.unownedResults = new Array();

        if (searchInput === Constants.SEARCH_ALL) {
          this.queryAllOwned();
        } else {
          this.queryFromString(searchInput);
        }
      }
    },

    queryAllOwned() {
      this.ownedResults = this.ownedMovies;
    },

    queryFromString(searchInput) {
      let vm = this;
      vm.isLoading = true;

      // Query list of owned movies created at init
      vm.ownedResults = vm.ownedMovies.filter((ownedMovie) =>
        ownedMovie.title.toUpperCase().includes(searchInput.toUpperCase())
      );

      // Query API for unowned movies that match too, preventing duplicates
      axios.get(Constants.SEARCH_QUERY + searchInput).then((response) => {
        let allResults = response.data.results;
        vm.unownedResults = allResults.filter(
          (result) =>
            !vm.ownedResults.find((ownedResult) => ownedResult.id === result.id)
        );

        vm.isLoading = false;
      });
    },

    getOwnedDetails(id) {
      return axios.get(Constants.DETAILS_QUERY(id));
    },

    /*
      Sort/Filter methods
    */
    sortFilterResults: function (resultsArray) {
      let sortedFilteredArray = resultsArray.slice(); // Copy by value, not by reference
      sortedFilteredArray = this.filterResults(sortedFilteredArray);
      this.sortResults(sortedFilteredArray);
      return sortedFilteredArray;
    },

    updateSortBy(sortBy) {
      this.sortBy = sortBy;

      this.isSortingByYear =
        this.sortBy === Constants.SORT_NEW ||
        this.sortBy === Constants.SORT_OLD;
    },

    updateFilterGenres(filterGenreIds) {
      this.filterGenreIds = filterGenreIds;
    },

    sortResults: function (resultsArray) {
      return SortService.sortMovieArray(resultsArray, this.sortBy);
    },

    filterResults: function (resultsArray) {
      return FilterService.filterMovieArray(resultsArray, this.filterGenreIds);
    },
  },
});
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