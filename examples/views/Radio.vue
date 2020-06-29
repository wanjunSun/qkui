<template>
  <div>
    <qk-radio label="2" v-model="radio1" size="small">小按钮</qk-radio>
    <qk-radio label="2" v-model="radio1">默认按钮</qk-radio>
    <qk-radio label="2" v-model="radio1" size="large">大按钮</qk-radio>
    <qk-radio label="2" v-model="radio1" disabled border>带边框</qk-radio>
    <qk-radio-group v-model="radio" vertical>
      <qk-radio label="1">按钮组1</qk-radio>
      <qk-radio label="2">按钮组2</qk-radio>
    </qk-radio-group>
    <qk-radio-group v-model="radio" type="button">
      <qk-radio label="1">按钮组1</qk-radio>
      <qk-radio label="2">按钮组2</qk-radio>
      <qk-radio label="3">按钮组3</qk-radio>
    </qk-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      radio1: "",
    }
  },
}
</script>

<style></style>
