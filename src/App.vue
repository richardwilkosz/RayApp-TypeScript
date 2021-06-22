<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RichardResume',

  data: () => ({
    //
  }),
});
</script>

<style lang="scss">
// Add to div inside v-col you want to be sticky
// Note: Make sure v-col element is "display: block"
.StickyColContent {
  position: sticky;
  top: 0;
  padding-top: 65px; // Prevent app bar overlap
}

// Makes footer spacing compatible with app-router
.AppWithFooter {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

// Used for mobile browsers' scroll bouncing
html {
  background-color: #272727;
}
</style>