<template>
  <div id="app" style="padding:10px">
    <router-link
      class="router"
      :to="'/' + item"
      v-for="(item, index) in routerList"
      :key="index"
      >{{ item }}</router-link
    >
    <br />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerList: [
        "row",
        "button",
        "tag",
        "alert",
        "input",
        "radio",
        "checkbox",
        "number",
        "notice",
        "message",
        "drop",
        // "select",
        "tab",
        "card"
      ],
    }
  },
}
</script>
<style>
.router {
  margin: 5px;
}
</style>
