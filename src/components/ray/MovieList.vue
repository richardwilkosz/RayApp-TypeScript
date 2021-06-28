<template>
  <div>
    <template v-if="isLoading">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          :size="50"
          class="mt-5"
        ></v-progress-circular>
      </div>
    </template>
    <template v-else>
      <!-- Owned Movie Results -->
      <template v-if="getOwnedMoviesCount() > 0">
        <v-row dense>
          <v-col cols="12" class="py-0">
            <h3 class="font-weight-regular my-2">
              OWNED MOVIES ({{ getOwnedMoviesCount() }})
            </h3>
          </v-col>
          <v-col
            v-for="movie in ownedMovies"
            :key="movie.id"
            cols="6"
            sm="4"
            md="3"
            lg="2"
            @click.stop="openDialog(movie.id)"
          >
            <OwnedMovie
              :title="movie.title"
              :src="getPosterImage(movie)"
              :releaseYear="getReleaseYear(movie)"
              :runtime="getRuntimeInHours(movie)"
              :isSortingByYear="isSortingByYear"
              v-ripple="{ class: 'primary--text' }"
            />
          </v-col>
        </v-row>
      </template>
      <template v-else-if="getUnownedMoviesCount() > 0">
        <v-container>
          <v-alert class="mb-0"
            >Sorry, I don't seem to own what you're searching for. You might
            also want to try filtering differently.</v-alert
          >
        </v-container>
      </template>

      <!-- Unowned Movie Results -->
      <template v-if="getUnownedMoviesCount() > 0">
        <v-row dense class="my-1">
          <v-col cols="12" class="py-0">
            <h3 class="font-weight-regular my-3">MOVIES I DON'T OWN... YET</h3>
          </v-col>
          <v-col
            v-for="movie in unownedMovies"
            :key="movie.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            class="pr-0 pb-0"
            @click.stop="openDialog(movie.id)"
          >
            <UnownedMovie
              :title="movie.title"
              :src="getPosterImage(movie)"
              class="pa-0"
              v-ripple="{ class: 'primary--text' }"
            />
          </v-col>
        </v-row>
      </template>

      <!-- No Results -->
      <template
        v-if="getOwnedMoviesCount() === 0 && getUnownedMoviesCount() === 0"
      >
        <v-container>
          <v-alert
            >No movies found. Try searching or filtering differently.</v-alert
          >
        </v-container>
      </template>

      <MovieDetails
        :movie="openedMovie"
        :imagePath="openedMovieImagePath"
        :dialogOpen="dialogOpen"
        @close-dialog="dialogOpen = false"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import axios from "axios";
import Constants from "../../assets/Constants";

import OwnedMovie from "./OwnedMovie.vue";
import UnownedMovie from "./UnownedMovie.vue";
import MovieDetails from "./MovieDetails.vue";

import { Movie } from "../../models/movie.model";
import { Genre } from "../../models/genre.model";

@Component({
  components: {
    OwnedMovie,
    UnownedMovie,
    MovieDetails,
  },
})
export default class MovieList extends Vue {
  @Prop(Array) ownedMovies!: Array<Movie>;
  @Prop(Array) unownedMovies!: Array<Movie>;
  @Prop(Array) genres!: Array<Genre>;
  @Prop(Boolean) isLoading!: boolean;
  @Prop(Boolean) isSortingByYear!: boolean;
  dialogOpen = false;
  openedMovie?: Movie = undefined;
  openedMovieImagePath = "";

  created(): void {
    this.openedMovie = Constants.MOVIE_DETAILS_DEFAULT;
    this.openedMovieImagePath = Constants.MOVIE_DETAILS_DEFAULT_IMAGE
  }

  getPosterImage(movie: Movie): string {
    return movie.poster_path ? Constants.IMAGE_QUERY + movie.poster_path : "";
  }
  getReleaseYear(movie: Movie): string {
    return movie.release_date ? movie.release_date.substring(0, 4) : "";
  }
  getRuntimeInHours(movie: Movie): string {
    return movie.runtime
      ? Math.floor(movie.runtime / 60) + "h " + (movie.runtime % 60) + "m"
      : "";
  }

  getOwnedMoviesCount(): number {
    return this.ownedMovies.length;
  }
  getUnownedMoviesCount(): number {
    return this.unownedMovies.length;
  }

  openDialog(id: number): void {
    let detailsQuery = Constants.DETAILS_QUERY(id);

    axios.get(detailsQuery).then((response) => {
      this.openedMovie = this.apiCallToModel(response.data);

      if (this.openedMovie.backdrop_path) {
        this.openedMovieImagePath =
          Constants.BACKDROP_PATH + this.openedMovie.backdrop_path;
      } else {
        this.openedMovieImagePath = "";
      }

      this.dialogOpen = true;
    });
  }

  apiCallToModel(a: any): Movie {
    return new Movie(
      a.id,
      a.title,
      a.release_date,
      a.overview,
      a.runtime,
      a.poster_path,
      a.backdrop_path,
      a.genres,
      a.genre_ids
    );
  }
}
</script>