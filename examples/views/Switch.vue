<template>
  <div>
    <qk-switch v-model="val"> </qk-switch>
    <qk-switch v-model="val" size="large"> </qk-switch>
    <qk-switch v-model="val" success-color="#ade498" error-color='#e84a5f'> </qk-switch>
    <qk-switch v-model="val" success-color="#ade498" error-color='#e84a5f'>
      <span slot="left">开</span>
      <span slot="right">关</span>
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
