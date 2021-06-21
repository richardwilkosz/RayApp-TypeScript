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

<script>
import Constants from "../../assets/Constants.js";

export default {
  props: {
    genres: Array,
  },

  data: () => ({
    allGenreName: "Include All Genres",
    genresSelected: [Constants.FILTER_DEFAULT],

    sortSelect: { text: "Alphabetical", value: Constants.SORT_ALPHA },
    sortItems: [
      { text: "Alphabetical", value: Constants.SORT_ALPHA },
      { text: "Shortest", value: Constants.SORT_SHORT },
      { text: "Longest", value: Constants.SORT_LONG },
      { text: "Newest", value: Constants.SORT_NEW },
      { text: "Oldest", value: Constants.SORT_OLD },
    ],
  }),

  methods: {
    selectSort: function (select) {
      this.$emit("update-sort", select);
    },

    selectGenre: function () {
      let vm = this;
      let filters = new Array();
      this.setIncludeAll();
      this.genresSelected.forEach((index) => filters.push(vm.genres[index].id));
      vm.$emit("update-filter", filters);
    },

    setIncludeAll: function () {
      const isAll = (index) => index === Constants.FILTER_DEFAULT;
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
    },
  },
};
</script>

<style>
.hidden {
  visibility: hidden;
}
</style>