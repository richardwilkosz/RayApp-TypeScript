<template>
  <span v-if="data.isRouterLink">
    <router-link :to="data.href" class="text-decoration-none">
      <v-btn :color="data.color" rounded large class="mr-3 mb-2">
        <v-icon dark class="mr-2">{{ data.icon }}</v-icon
        >{{ data.label }}
      </v-btn>
    </router-link>
  </span>
  <span v-else>
    <v-btn
      :color="data.color"
      :href="data.href"
      target="_blank"
      rounded
      large
      class="mr-3 mb-2"
    >
      <v-icon dark class="mr-2">{{ data.icon }}</v-icon
      >{{ data.label }}
    </v-btn>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ButtonLinkData } from "../../models/buttonLinkData.model";

@Component
export default class ButtonLink extends Vue {
  @Prop(Object) data!: ButtonLinkData
}
</script>