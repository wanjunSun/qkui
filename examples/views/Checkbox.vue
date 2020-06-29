<template>
  <div>
    <qk-checkbox v-model="checkbox1">常规</qk-checkbox>
    <qk-checkbox v-model="checkbox1" size="large">大</qk-checkbox>
    <qk-checkbox v-model="checkbox1" size="small" disabled>小</qk-checkbox>
    <h3>group</h3>
    <qk-checkbox-group v-model="checkbox2">
      <qk-checkbox label="香蕉">香蕉</qk-checkbox>
      <qk-checkbox label="苹果">苹果</qk-checkbox>
    </qk-checkbox-group>
    {{ checkbox2 }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox1: "",
      checkbox2: [],
    }
  },
}
</script>
