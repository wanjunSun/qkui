<template>
  <div>
    <qk-input type="text"> </qk-input>
    密码
    <qk-input type="password"></qk-input>
    <qk-input type="text" placeholder="请输入">
      <template slot="append">\(^o^)/</template>
    </qk-input>
    <qk-input type="text">
      <template slot="before">\(^o^)/</template>
    </qk-input>
    <qk-input type="text" show-word-limit maxlegth="210" v-model="input1">
      <template slot="before">\(^o^)/</template>
      <template slot="append">1</template>
    </qk-input>

    <qk-input type="text" size="small"> </qk-input>
    <qk-input
      type="text"
      size="large"
      show-word-limit
      maxlegth="210"
      v-model="input1"
    >
    </qk-input>
    <qk-input
      type="textarea"
      :autosize="{ minRow: 4, maxRow: 8 }"
      placeholder="说说你的想法吧..."
    >
    </qk-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
    }
  },
}
</script>

<style></style>
