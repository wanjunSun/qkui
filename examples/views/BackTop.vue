<template>
  <div style="height:36000px">
    <qk-back-top></qk-back-top>
    <qk-back-top :bottom="100"> <div class="top">返回顶端</div></qk-back-top>
  </div>
</template>

<script>
export default {}
</script>

<style scope>
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>
