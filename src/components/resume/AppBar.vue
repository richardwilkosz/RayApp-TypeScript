<template>
  <v-app-bar app color="primary" dark inverted-scroll scroll-threshold="300">
    <!-- Current portrait too small to make out -->
    <!-- <v-avatar class="d-none d-sm-flex mr-3">
        <v-img src="../../assets/resume-portrait.jpg"></v-img>
      </v-avatar> -->
    <v-toolbar-title class="title-font">RICHARD WILKOSZ</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      href="/Resume_Richard_Wilkosz.pdf"
      target="_blank"
      light
      rounded
      :small="viewportSize === 'xs'"
      :large="viewportSize === 'lg' || viewportSize === 'xl'"
      class="mr-2"
      >
        GET RESUME
      </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppBar extends Vue {
  @Prop(String) viewportSize!: string
}
</script>