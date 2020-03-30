<template>
  <button :class="classes" @click="onClick" :disabled="disabled" :long="long">
    <slot></slot>
  </button>
</template>

<script>
import { oneOf } from "../../../src/utils"
const prefixCls = "qk-btn"
export default {
  name: "qkButton",
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
    disabled: Boolean,
    long: {
      type: Boolean,
      default: false
    },
    size: {
      validator(value) {
        return oneOf(value, ["small", "large", "default"])
      }
    },
    shape: {
      validator(value) {
        return oneOf(value, ["circle"])
      }
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-${this.shape}`]: !!this.shape
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
