<template>
  <v-card>
    <v-img :src="src" :lazy-src="lazySrc"></v-img>
    <v-card-text class="py-2">
      <v-row dense>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          lg="12"
          xl="6"
          class="text-center text-sm-left text-lg-center text-xl-left"
          :class="{ 'd-none d-sm-flex d-lg-none d-xl-flex': !isSortingByYear }"
        >
          <v-icon small>mdi-calendar</v-icon>
          <span v-text="releaseYear" class="pl-2"></span>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          lg="12"
          xl="6"
          class="text-center text-sm-right text-lg-center text-xl-right"
          :class="{ 'd-none d-sm-flex d-lg-none d-xl-flex': isSortingByYear }"
        >
          <v-icon small>mdi-clock</v-icon>
          <span v-text="runtime" class="pl-2"></span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    src: String,
    releaseYear: String,
    runtime: String,

    // With certain viewports, where only runtime or release year can fit,
    // show runtime unless sorting on release year
    isSortingByYear: Boolean,
  },

  computed: {
    lazySrc: function() {
      return this.src.replace('/w500/', '/w200/');
    }
  }
};
</script>