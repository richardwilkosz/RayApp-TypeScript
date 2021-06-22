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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

// import AppLogo from "./AppLogo";
// import SearchBar from "./SearchBar";
// import SortFilterMenu from "./SortFilterMenu";

import { Genre } from "../../models/genre.model";

@Component
export default class AppBar extends Vue {
  // components: {
  //   AppLogo,
  //   SearchBar,
  //   SortFilterMenu,
  // },

  @Prop(Array) genres!: Array<Genre>
  @Prop(Array) ownedMovieTitles!: Array<string>
  isSearchingMobile = false;

  updateSearch(e: string): void {
    this.$emit("update-search", e);
  }

  updateSort(e: string): void {
    this.$emit("update-sort", e);
  }

  updateFilter(e: string): void {
    this.$emit("update-filter", e);
  }
}
</script>

<style>
.v-toolbar__content {
  padding-right: 0;
}
</style>