<template>
  <button :class="classes" @click="onClick">
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
