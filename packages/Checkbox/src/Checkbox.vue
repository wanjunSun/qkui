<template>
  <label :class="warpClasses">
    <span :class="checkboxClasses">
      <span :class="innerClasses"></span>
      <input
        type="checkbox"
        :class="inputClasses"
        :name="name"
        :value="label"
        :disabled="disabled"
        v-model="model"
        @change="handelChange"
        @focus="focusInner = true"
        @blur="focusInner = false"
      />
    </span>
    <slot>
      <span v-if="!$slots.default">{{ label }}</span>
    </slot>
  </label>
</template>

<script>
const perfixCls = "qk-checkbox"
// import { oneOf, findFComponent } from "../../../src/utils"
import mixin from "../../../src/mixins/emitter"
export default {
  name: "qkCheckbox",
  mixins: [mixin],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: [String, Number, Boolean],
    },
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      model: [],
      group: false,
      focusInner: false,
      currentValue: this.value,
    }
  },
  computed: {
    warpClasses() {
      return [
        `${perfixCls}-wapper`,
        {
          [`${perfixCls}-wapper-checked`]: !!this.currentValue,
          [`${perfixCls}-wapper-disabled`]: this.disabled,
        },
      ]
    },
    checkboxClasses() {
      return [
        `${perfixCls}`,
        {
          [`${perfixCls}-checked`]: !!this.currentValue,
          [`${perfixCls}-disabled`]: this.disabled,
        },
      ]
    },
    innerClasses() {
      return [
        `${perfixCls}-inner`,
        {
          [`${perfixCls}-focus`]: this.focusInner,
        },
      ]
    },
    inputClasses() {
      return [`${perfixCls}-input`]
    },
  },
  methods: {
    handelChange(event) {
      if (this.disabled) return false
      const checked = event.target.checked
      this.$emit("input", checked)
    },
    updateValue() {
      this.currentValue = this.value
    },
  },
  watch: {
    value(v) {
      if (v === this.value) {
        this.updateValue()
      } else {
        console.error("错误")
      }
    },
  },
}
</script>
