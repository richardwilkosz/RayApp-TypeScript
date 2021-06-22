<template>
  <v-dialog
    v-model="dialogOpen"
    @click:outside="closeDialog()"
    max-width="720"
    overlay-opacity="0.75"
  >
    <v-card>
      <v-icon class="float-right mt-4 mr-3" @click.stop="closeDialog()"
        >mdi-close</v-icon
      >
      <v-card-title class="mb-2">
        {{ movie.title ? movie.title : "" }}
      </v-card-title>
      <v-card-subtitle class="pb-4">
        {{ getReleaseYear(movie) }}{{ getRuntimeInHours(movie) }}
      </v-card-subtitle>
      <v-img v-if="imagePath" :src="imagePath">
      </v-img>
      <v-card-text>
        <div class="primary--text font-weight-bold mt-3 mb-2">
          <span v-for="(genre, index) in movie.genres" :key="genre.id">
            <span v-if="index !== movie.genres.length - 1"
              >{{ genre.name }},
            </span>
            <span v-else>{{ genre.name }}</span>
          </span>
        </div>
        <div>{{ movie.overview ? movie.overview : "" }}</div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    movie: Object,
    dialogOpen: Boolean,
    imagePath: String,
  },

  methods: {
    closeDialog: function () {
      this.$emit("close-dialog");
    },

    // As long as $parent is referenced, MovieDetails must be a child of MovieList
    getReleaseYear: function (movie) {
      return this.$parent.getReleaseYear(movie);
    },
    getRuntimeInHours: function (movie) {
      let runtime = this.$parent.getRuntimeInHours(movie);
      return runtime ? ", " + runtime : "";
    },
  },
};
</script>

<style>
.v-card__title{
  word-break: normal !important;
  line-height: normal !important;
}
</style>