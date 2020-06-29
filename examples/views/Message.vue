<template>
  <div>
    <qk-button @click="openMessage('info')" type="info"
      >测试message信息</qk-button
    >
    <qk-button @click="openMessage('success')" type="success"
      >测试message成功</qk-button
    >
    <qk-button @click="openMessage('warning')" type="warning"
      >测试message警告</qk-button
    >
    <qk-button @click="openMessage('error')" type="error"
      >测试message失败</qk-button
    >
    <qk-button @click="openMessage('loading')" type="info"
      >测试loading</qk-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    openMessage(name) {
      this.$qkMessage[`${name}`]({
        content: "测试",
      })
    },
  },
}
</script>

<style></style>
