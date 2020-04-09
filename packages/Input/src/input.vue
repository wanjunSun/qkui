<template>
  <div :class="classes">
    <template v-if="type !== 'textarea'">
      <div :class="[prefixCls + '-group-before']" v-if="before">
        <slot name="before"></slot>
      </div>

      <input
        :class="inputClass"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        @keyup.enter="handleEnter"
        @blur="handelBlur"
        @focus="handelFocus"
        @input="handleInput"
      />
      <div :class="[prefixCls + '-group-append']" v-if="append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <input
        :class="inputClass"
        type="textarea"
        :disabled="disabled"
        @keyup.enter="handleEnter"
        @input="handleInput"
      />
    </template>
  </div>
</template>

<script>
const prefixCls = "qk-input"
import { oneOf } from "../../../src/utils"
export default {
  name: "qkInput",
  data() {
    return { before: false, append: false, prefixCls }
  },
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
    placeholder: String,
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-type`]: !!this.type,
          [`${prefixCls}-group`]: this.before || this.append,
          [`${prefixCls}-group-with-before`]: this.before,
          [`${prefixCls}-group-with-append`]: this.append,
        },
      ]
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
      this.$emit("input", e.target.value)
    },
    handelBlur(e) {
      this.$emit("blur", e)
    },
    handelFocus(e) {
      this.$emit("focus", e)
    },
  },
  mounted() {
    if (this.type !== "textarea") {
      this.before = this.$slots.before !== undefined
      this.append = this.$slots.append !== undefined
    } else {
      this.before = false
      this.append = false
    }
  },
}
</script>
