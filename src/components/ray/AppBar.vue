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
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

import AppLogo from "./AppLogo.vue";
import SearchBar from "./SearchBar.vue";
import SortFilterMenu from "./SortFilterMenu.vue";

import { Genre } from "../../models/genre.model";

@Component({
  components: {
    AppLogo,
    SearchBar,
    SortFilterMenu,
  },
})
export default class AppBar extends Vue {
  @Prop(Array) genres!: Array<Genre>;
  @Prop(Array) ownedMovieTitles!: Array<string>;
  isSearchingMobile = false;

  @Emit("update-search")
  updateSearch(e: string): string {
    return e;
  }

  @Emit("update-sort")
  updateSort(e: string): string {
    return e;
  }

  @Emit("update-filter")
  updateFilter(e: string): string {
    return e;
  }
}
</script>

<style>
.v-toolbar__content {
  padding-right: 0;
}
</style>