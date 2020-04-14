<template>
  <label :class="wrapClasses">
    <span :class="radioClasses">
      <span :class="innerClasses"></span>
      <input
        type="radio"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        v-model="model"
        :name="groupName"
        @change="handelChange"
        @blur="handelBlur"
        @focus="handelFocus"
      />
    </span>
    <span>
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
const perfixCls = "qk-radio"
// import { oneOf, findFComponent } from "../../../src/utils"
export default {
  name: "qkRadio",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: String,
    label: {
      type: [String, Number]
    }
  },
  data() {
    return {
      currentValue: this.value,
      groupName: this.name,
      focusInner: false
    }
  },
  methods: {
    handelChange(e) {
      if (this.disabled) {
        return false
      }
      const checked = e.target.checked
      this.currentValue = checked
      this.$emit("input", checked)
    },
    handelBlur() {
      this.focusInner = false
    },
    handelFocus() {
      this.focusInner = true
    },
    updateValue() {
      this.currentValue = this.value
    }
  },
  computed: {
    wrapClasses() {
      return [
        `${perfixCls}-wrap`,
        {
          [`${perfixCls}-warp-disabled`]: this.disabled
        }
      ]
    },
    radioClasses() {
      return [
        `${perfixCls}`,
        {
          [`${perfixCls}-checked`]: this.currentValue
        }
      ]
    },
    innerClasses() {
      return [
        `${perfixCls}-inner`,
        {
          [`${perfixCls}-focus`]: this.focusInner
        }
      ]
    },
    inputClasses() {
      return [`${perfixCls}-input`]
    }
  },
  watch: {
    value(nV) {
      this.updateValue(nV)
    }
  }
}
</script>
