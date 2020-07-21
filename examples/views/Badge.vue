<template>
  <div style="margin-top:30px">
    <qk-badge :value="1200" :max="999" style="margin-right:30px">
      <div class="test"></div>
    </qk-badge>
    <qk-badge isDot style="margin-right:30px">
      12zcs
    </qk-badge>
    <qk-badge isDot style="margin-right:30px">
      <div class="test"></div>
    </qk-badge>
    <qk-badge :value="12" :max="10" style="margin-right:40px"> </qk-badge>
    <qk-badge :value="12" :max="10"  color="#2177b8"> </qk-badge>
  </div>
</template>

<style lang="less" scoped>
.test {
  height: 40px;
  width: 40px;
  background-color: #e3e3e3;
}
</style>
