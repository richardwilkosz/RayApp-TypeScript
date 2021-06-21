<template>
  <v-combobox
    solo
    flat
    dense
    clearable
    id="searchBar"
    class="mt-6"
    placeholder="Search movies"
    prepend-inner-icon="mdi-magnify"
    append-icon=""
    :search-input.sync="searchInput"
    :items="suggestedMovieTitles"
    @keydown.enter="endSearch()"
    @click:prepend-inner="endSearch()"
    @click:clear="clearSearch()"
    @update:search-input="updateSearch()"
  >
    <template v-slot:prepend-item>
      <v-subheader>SUGGESTED SEARCHES</v-subheader>
    </template>
  </v-combobox>
</template>

<script>
import _ from "lodash";
import Constants from "../../assets/Constants.js";

export default {
  data: () => ({
    searchInput: "",
    suggestedMovieTitles: new Array(),
  }),

  props: {
    ownedMovieTitles: Array,
  },

  methods: {
    updateSearch: function() {
      // Only show suggestions when there's actual input
      this.suggestedMovieTitles = this.searchInput ? this.ownedMovieTitles : new Array();
      this.emitSearch();
    },

    emitSearch: _.debounce(function () {
      this.$emit("update-search", this.searchInput ? this.searchInput : Constants.SEARCH_ALL);
    }, 750),

    // Workaround since comboboxes don't close on enter
    endSearch: function () {
      this.$children[0].blur();
    },

    clearSearch: function () {
      this.$emit("update-search", Constants.SEARCH_ALL);
    },
  },
};
</script>

<style lang="scss">
#searchBar ~ .v-input__append-inner .v-input__icon--append .v-icon {
  transform: none;
}

.v-input__append-outer {
  margin: 0 !important;
}
</style>