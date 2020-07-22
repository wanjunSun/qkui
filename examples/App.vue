<template>
  <div id="app" style="padding:10px">
    <header class="header">
      <img src="./assets/logo.png" class="logo" title="qkui、轻量级ui" />
    </header>
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
  mounted() {
    this.$router.options.routes.map((x) => {
      this.routerList.push(x.name)
    })
  },
  data() {
    return {
      routerList: [],
    }
  },
}
</script>
<style>
.router {
  margin: 5px;
}

.logo {
  width: 30px;
  height: 30px;
}
.header {
  width: 100%;
  padding: 0 5px;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(to right, #005eda, #64ff64);
  border-image-slice: 10;
}
</style>
