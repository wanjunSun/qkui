import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import QkUI from "../packages"
Vue.config.productionTip = false
Vue.use(QkUI)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
