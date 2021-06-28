<template>
  <div>
    <v-subheader>SORT BY</v-subheader>
    <v-select
      filled
      hide-details
      v-model="sortSelect"
      :items="sortItems"
      item-text="text"
      item-value="value"
      @input="selectSort(sortSelect)"
    ></v-select>
    <v-divider></v-divider>
    <v-subheader>FILTER GENRES</v-subheader>
    <v-chip-group
      v-model="genresSelected"
      active-class="primary--text"
      @change="selectGenre()"
      multiple
      column
    >
      <v-chip v-for="genre in genres" :key="genre.id" small filter>
        {{ genre.name }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Constants from "../../assets/Constants";
import { Genre } from "../../models/genre.model";
import { SortMenuItem } from "../../models/sortMenuItem.model";

@Component
export default class SortFilterMenu extends Vue {
  @Prop(Array) genres!: Array<Genre>

  allGenreName = "Include All Genres";
  genresSelected: Array<number> = [Constants.FILTER_DEFAULT];

  sortSelect: SortMenuItem = { text: "Alphabetical", value: Constants.SORT_ALPHA };
  sortItems: Array<SortMenuItem> = [
    { text: "Alphabetical", value: Constants.SORT_ALPHA },
    { text: "Shortest", value: Constants.SORT_SHORT },
    { text: "Longest", value: Constants.SORT_LONG },
    { text: "Newest", value: Constants.SORT_NEW },
    { text: "Oldest", value: Constants.SORT_OLD },
  ];

  @Emit("update-sort")
  selectSort(select: number): number {
    return select;
  }

  @Emit("update-filter")
  selectGenre(): Array<number> {
    let filters: Array<number> = [];
    this.setIncludeAll();
    this.genresSelected.forEach((index) => filters.push(this.genres[index].id));
    return filters;
  }

  setIncludeAll(): void {
    const isAll = (index: number) => index === Constants.FILTER_DEFAULT;
    const setToAll = () => (this.genresSelected = [Constants.FILTER_DEFAULT]);

    // In the case of no filters, default back to All
    if (!this.genresSelected || this.genresSelected.length === 0) {
      setToAll();
    } else {
      let lastSelectedIndex = this.genresSelected.slice(-1)[0];

      // Either "Include All" is selected, or some subset of genres
      if (isAll(lastSelectedIndex)) {
        setToAll();
      }
      else {
        this.genresSelected = this.genresSelected.filter(
          (index) => !isAll(index)
        );
      }
    }
  }
}
</script>

<style>
.hidden {
  visibility: hidden;
}
</style>