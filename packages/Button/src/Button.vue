<template>
  <button :class="classes" @click="onClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
import { oneOf } from "../../../src/utils"
const prefixCls = "qk-btn"
export default {
  name: "qk-button",
  props: {
    type: {
      default: "default",
      validator(value) {
        return oneOf(value, [
          "primary",
          // "ghost",
          // "dashed",
          "text",
          "success",
          "warning",
          "error",
          "default"
        ])
      }
    },
    disabled: Boolean
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
