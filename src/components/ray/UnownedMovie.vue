<template>
  <v-col cols="12">
    <v-sheet>
      <v-row dense align="center">
        <v-col cols="auto" class="pa-0 ml-1 mr-5">
          <v-img :src="src ? src : placeholderSrc" height="75" width="50"></v-img>
        </v-col>
        <v-col class="pa-0">
          <span v-text="title" class="pr-5"></span>
        </v-col>
      </v-row>
    </v-sheet>
    <v-divider class="mt-1"></v-divider>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    placeholderSrc: require("../../assets/movie-placeholder.jpg"),
  }),

  props: {
    title: String,
    src: String,
  },
};
</script>