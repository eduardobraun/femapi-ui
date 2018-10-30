import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createProvider } from "./vue-apollo";

import "./theme/default.styl";
import "@fortawesome/fontawesome-free/js/all.js";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";
// eslint-disable-next-line
import colors from "vuetify/es5/util/colors";
import Truncate from "lodash.truncate";
Vue.config.productionTip = false;
// Helpers
// Global filters
Vue.filter("truncate", Truncate);
Vue.use(VeeValidate, { fieldsBagName: "formFields" });
Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.base, // #E53935
    secondary: colors.indigo.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  },
  iconfont: "mdi",
  options: {
    themeVariations: ["primary", "secondary", "accent"],
    extra: {
      mainToolbar: {
        color: "primary"
      },
      sideToolbar: {},
      sideNav: "primary",
      mainNav: "primary lighten-1",
      bodyBg: ""
    }
  }
});
// Bootstrap application components

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
