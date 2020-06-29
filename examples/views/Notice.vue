<template>
  <div>
    <qk-button @click="openNotice('info')" type="info"
      >测试Notice信息</qk-button
    >
    <qk-button @click="openNotice('success')" type="success"
      >测试Notice成功</qk-button
    >
    <qk-button @click="openNotice('warning')" type="warning"
      >测试Notice警告</qk-button
    >
    <qk-button @click="openNotice('error')" type="error"
      >测试Notice失败</qk-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    openNotice(name) {
      this.$qkNotice[`${name}`]({
        title: "臭弟弟",
        desc: "你是个弟弟 弟中弟",
      })
    },
  },
}
</script>

<style></style>
