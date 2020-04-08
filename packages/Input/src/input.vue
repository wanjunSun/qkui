<template>
  <div :class="classes">
    <input
      :class="inputClass"
      :type="type"
      :disabled="disabled"
      @keyup.enter="handleEnter"
      @input="handleInput"
    />
  </div>
</template>

<script>
const prefixCls = "qk-input"
import { oneOf } from "../../../src/utils"
export default {
  name: "qkInput",
  props: {
    type: {
      validator(v) {
        return oneOf(v, ["text", "password", "email", "url", "textarea"])
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxlength: Number,
  },
  computed: {
    classes() {
      return [`${prefixCls}`, { [`${prefixCls}-type`]: !!this.type }]
    },
    inputClass() {
      return [
        `${prefixCls}-inner`,
        { [`${prefixCls}-disabled`]: !!this.disabled },
      ]
    },
  },
  methods: {
    handleEnter(e) {
      this.$emit("enter", e)
    },
    handleInput(e) {
      this.$emit("change", e)
    },
  },
}
</script>
