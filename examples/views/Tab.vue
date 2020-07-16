<template>
  <qk-tab v-model="name" >
    <qk-tab-pan label="1" name="1" icon="qk-icon-set">1</qk-tab-pan>
    <qk-tab-pan label="2" name="2">2</qk-tab-pan>
  </qk-tab>
</template>

<script>
export default {
  data() {
    return {
      name: "1",
    }
  },
}
</script>
