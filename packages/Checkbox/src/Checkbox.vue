<template>
  <label :class="warpClasses">
    <span :class="checkboxClasses">
      <span :class="innerClasses"></span>
      <input
        v-if="group"
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
      <input
        v-else
        type="checkbox"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="name"
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
import { oneOf, findFComponent } from "../../../src/utils"
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
    indeterminate: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator(val) {
        return oneOf(val, ["small", "large", "default"])
      },
    },
  },
  data() {
    return {
      model: [],
      group: false,
      focusInner: false,
      currentValue: this.value,
      parent: findFComponent(this, "qkCheckboxGroup"),
    }
  },
  computed: {
    warpClasses() {
      return [
        `${perfixCls}-wapper`,
        {
          [`${perfixCls}-wapper-checked`]: !!this.currentValue,
          [`${perfixCls}-wapper-disabled`]: this.disabled,
          [`${perfixCls}-${this.size}`]: !!this.size,
        },
      ]
    },
    checkboxClasses() {
      return [
        `${perfixCls}`,
        {
          [`${perfixCls}-checked`]: !!this.currentValue,
          [`${perfixCls}-disabled`]: this.disabled,
          [`${perfixCls}-indeterminate`]: this.indeterminate,
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
      this.currentValue = checked
      this.$emit("input", checked)
      if (this.group) {
        this.parent.change(this.model)
      } else {
        this.$emit("change", checked)
      }
    },
    updateValue() {
      this.currentValue = this.value
    },
  },
  mounted() {
    this.parent = findFComponent(this, "qkCheckboxGroup")
    if (this.parent) {
      this.group = true
    }
    if (this.group) {
      this.parent.updateModal(true)
    } else {
      this.updateValue()
    }
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
