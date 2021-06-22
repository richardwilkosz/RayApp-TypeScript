import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // dark: true,
    themes: {
      light: {
        primary: colors.teal.darken2,
      },
      dark: {
        primary: colors.lightBlue.lighten3,
        error: colors.red.lighten3,
      }
    }
  }
});
