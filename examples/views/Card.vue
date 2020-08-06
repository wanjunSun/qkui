<template>
<div>
  <qk-card width="150px" shadow="hover">
    鼠标移入样式
  </qk-card>
  <qk-card width="150px" shadow="alawys">
   一直存在阴影
  </qk-card>
  <qk-card width="150px">
    无阴影  0.00
  </qk-card>
  <qk-card width="150px" hasAngle>
    直角
  </qk-card>
  <qk-card width="100%" >
    宽度的单位按照百分比
  </qk-card>
  <qk-card >
    <div slot="head">
      这是头部
      <a style="float:right">操作按钮</a>
    </div>
    我是body啊
  </qk-card>
</div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped></style>
