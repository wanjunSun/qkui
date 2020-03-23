<template>
  <button :class="classes" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
import { oneOf } from "../../../src/utils"
const prefixCls = "qk-button"
export default {
  name: "QKButton",
  props: {
    type: {
      validator(value) {
        return oneOf(value, [
          "primary",
          "ghost",
          "dashed",
          "text",
          "info",
          "success",
          "warning",
          "error",
          "default"
        ])
      }
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type
        }
      ]
    }
  },
  methods: {
    onClick() {
      this.$emit("click")
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../style/index.less");
</style>