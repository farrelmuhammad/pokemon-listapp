import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'

loadFonts()

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

