<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = "qk-btn-group"
import { oneOf } from "../../../src/utils"
export default {
  name: "qk-button-group",
  props: {
    size: {
      validator(value) {
        return oneOf(value, ["small", "large", "default"])
      }
    },
    shape: {
      validator(value) {
        return oneOf(value, ["circle"])
      }
    },
    vertically: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-vertically`]: this.vertically
        }
      ]
    }
  }
}
</script>
