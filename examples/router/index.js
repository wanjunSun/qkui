import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: "/row" },
  {
    path: "/button",
    name: "button",
    component: () => import("../views/Button.vue"),
  },
  {
    path: "/row",
    name: "row",
    component: () => import("../views/Row.vue"),
  },
  {
    path: "/tag",
    name: "tag",
    component: () => import("../views/Tag.vue"),
  },
  {
    path: "/alert",
    name: "alert",
    component: () => import("../views/Alert.vue"),
  },
  {
    path: "/input",
    name: "input",
    component: (reverse) => require(["../views/Input.vue"], reverse),
  },
  {
    path: "/radio",
    name: "radio",
    component: (reverse) => require(["../views/Radio.vue"], reverse),
  },
  {
    path: "/checkbox",
    name: "checkbox",
    component: (reverse) => require(["../views/Checkbox.vue"], reverse),
  },
  {
    path: "/number",
    name: "number",
    component: (reverse) => require(["../views/Number.vue"], reverse),
  },
  {
    path: "/notice",
    name: "notice",
    component: (reverse) => require(["../views/Notice.vue"], reverse),
  },
  {
    path: "/message",
    name: "message",
    component: (reverse) => require(["../views/Message.vue"], reverse),
  },
  {
    path: "/drop",
    name: "drop",
    component: (reverse) => require(["../views/Drop.vue"], reverse),
  },
]

const router = new VueRouter({
  routes,
})

export default router
