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
    clear-icon="mdi-trash-can-outline"
    :search-input.sync="searchInput"
    :items="suggestedMovieTitles"
    @click:clear="clearSearch()"
    @update:search-input="updateSearch()"
    :menu-props="{ closeOnContentClick: true }"
  >
    <!-- Reimplement '@keydown.enter="endSearch()"' in TypeScript -->
    <template v-slot:prepend-item>
      <v-subheader>
        <span>SUGGESTED SEARCHES</span>
        <v-spacer></v-spacer>
        <v-icon>mdi-close</v-icon>
      </v-subheader>
    </template>
  </v-combobox>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Debounce } from "vue-debounce-decorator";
import Constants from "../../assets/Constants";

@Component
export default class SearchBar extends Vue {
  @Prop(Array) ownedMovieTitles!: Array<string>;
  searchInput = "";
  suggestedMovieTitles: Array<string> = [];

  updateSearch(): void {
    // Only show suggestions when there's actual input
    this.suggestedMovieTitles = this.searchInput ? this.ownedMovieTitles : [];
    this.emitSearch();
  }

  @Emit("update-search")
  @Debounce(750)
  emitSearch(): string {
    return this.searchInput ? this.searchInput : Constants.SEARCH_ALL;
  }

  @Emit("update-search")
  clearSearch(): string {
    return Constants.SEARCH_ALL;
  }
}
</script>

<style lang="scss">
#searchBar ~ .v-input__append-inner .v-input__icon--append .v-icon {
  transform: none;
}

.v-input__append-outer {
  margin: 0 !important;
}
</style>