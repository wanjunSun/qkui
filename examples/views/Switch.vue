<template>
  <div>
    <qk-switch v-model="val">
      <span slot="open">开</span>
      <span slot="close">关</span>
    </qk-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: false,
    }
  },
}
</script>

<style></style>
