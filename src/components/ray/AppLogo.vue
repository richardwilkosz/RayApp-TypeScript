<template>
  <div class="d-flex">
    <v-img
      src="../../assets/logo-ray.png"
      max-height="32"
      max-width="32"
    ></v-img>
    <v-toolbar-title class="mx-3">Ray</v-toolbar-title>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppLogo extends Vue { }
</script>