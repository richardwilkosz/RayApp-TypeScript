<template>
  <v-app-bar app>
    <AppLogo />
    <v-spacer></v-spacer>
    <SearchBar
      @update-search="updateSearch"
      :ownedMovieTitles="ownedMovieTitles"
    />
    <v-spacer></v-spacer>
    <div class="d-lg-none ml-2">
      <v-menu bottom offset-y v-bind:close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-sm-none">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-tune</v-icon>
            </v-btn>
          </div>
          <div class="d-none d-sm-flex">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon left class="mr-3">mdi-tune</v-icon>
              Sort &amp; Filter
            </v-btn>
          </div>
        </template>
        <v-sheet dark class="px-2">
          <SortFilterMenu
            :genres="genres"
            @update-sort="updateSort"
            @update-filter="updateFilter"
          />
        </v-sheet>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import AppLogo from "./AppLogo";
import SearchBar from "./SearchBar";
import SortFilterMenu from "./SortFilterMenu";

export default {
  components: {
    AppLogo,
    SearchBar,
    SortFilterMenu,
  },

  props: {
    genres: Array,
    ownedMovieTitles: Array,
  },

  data: () => ({
    isSearchingMobile: false,
  }),

  methods: {
    updateSearch: function (e) {
      this.$emit("update-search", e);
    },
    updateSort: function (e) {
      this.$emit("update-sort", e);
    },
    updateFilter: function (e) {
      this.$emit("update-filter", e);
    },
  },
};
</script>

<style>
.v-toolbar__content {
  padding-right: 0;
}
</style>