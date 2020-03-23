import Vue from "vue"
import VueRouter from "vue-router"
import App from "./app.vue"
import "../src/styles/index.less"
import QkUi from "../src/index"
Vue.use(VueRouter)
Vue.use(QkUi)
// 开启debug模式
Vue.config.debug = true
// 路由配置
const router = new VueRouter({
  router: [
    {
      path: "/button",
      component: resolve => require(["./routers/button.vue"], resolve)
    }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
