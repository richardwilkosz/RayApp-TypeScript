<template>
  <v-footer>
    <v-container>
      <v-row dense justify="center">
        <v-col
          v-for="item in techStack"
          :key="item.id"
          cols="auto"
          class="d-flex child-flex"
        >
          <v-menu top offset-y class="text-center">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text dark v-bind="attrs" v-on="on">
                <v-img
                  :src="require('../../assets/' + item.imgSrc)"
                  contain
                  height="32"
                  :width="item.width ? item.width : 32"
                  v-bind="attrs"
                  v-on="on"
                ></v-img>
              </v-btn>
            </template>
            <v-sheet color="grey darken-3" class="py-2 px-3 text-center">
              <span v-html="item.label"></span>
            </v-sheet>
          </v-menu>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="text-center text--disabled pt-3" cols="12">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </v-col>
        <v-col class="text-center text--disabled" cols="12">
          Web Application © {{ new Date().getFullYear() }} Richard Wilkosz
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    techStack: [
      {
        id: 0,
        imgSrc: "logo-vue.png",
        label:
          'JavaScript Framework:<br><a href="https://vuejs.org/" target="_blank">Vue.js</a>',
      },
      {
        id: 1,
        imgSrc: "logo-vuetify.svg",
        label:
          'Vue UI Library:<br><a href="https://vuetifyjs.com/" target="_blank">Vuetify</a>',
      },
      {
        id: 2,
        imgSrc: "logo-freepik.png",
        label:
          '<div>Manta Ray and Flaticon Brand icon<br>made by <a href="https://www.flaticon.com/authors/freepik" target="_blank" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" target="_blank" title="Flaticon">www.flaticon.com</a></div>',
      },
      {
        id: 3,
        imgSrc: "logo-tmdb.svg",
        label:
          'Data Source API:<br><a href="https://www.themoviedb.org/" target="_blank">The Movie Database</a>',
      },
      {
        id: 4,
        imgSrc: "logo-firebase.png",
        label:
          'Backend as a Service:<br><a href="https://firebase.google.com/" target="_blank">Google Firebase</a>',
        width: 95,
      },
    ],
  }),
};
</script>