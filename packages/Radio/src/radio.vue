<template>
  <label :class="wrapClasses">
    <span :class="radioClasses">
      <span :class="innerClasses"></span>
      <input
        type="radio"
        ref="radio"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="groupName"
        @change="handelChange"
        @blur="focusInner = false"
        @focus="focusInner = true"
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
import { oneOf, findFComponent } from "../../../src/utils"
import mixin from "../../../src/mixins/emitter"
export default {
  name: "qkRadio",
  mixins: [mixin],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: String,
    label: {
      type: [String, Number],
    },
    size: {
      validator(v) {
        return oneOf(v, ["small", "large"])
      },
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.value,
      groupName: this.name,
      parent: findFComponent(this, "qkRadioGroup"),
      focusInner: false,
      group: false,
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
      if (this.group) {
        if (this.label !== undefined) {
          this.parent.change({
            value: this.label,
            checked: this.value,
          })
        }
      } else {
        this.$emit("change", checked)
      }
    },
    updateValue() {
      this.currentValue = this.value
    },
    hasParent() {
      if (this.parent) {
        this.group = true
        if (this.name && this.name !== this.$parent.name) {
          console.error("错误")
        } else {
          this.groupName = this.parent.name
        }
      }
    },
  },
  mounted() {
    this.hasParent()

    if (this.group) {
      this.parent.updateValue()
    } else {
      this.updateValue()
    }
  },
  computed: {
    active() {
      return (
        this.border &&
        this.currentValue !== "" &&
        this.currentValue === this.value
      )
    },
    wrapClasses() {
      return [
        `${perfixCls}-wrap`,
        {
          [`${perfixCls}-wrap-disabled`]: this.disabled,
          [`${perfixCls}-${this.size}`]: !!this.size,
          [`${perfixCls}-wrap-border`]: this.border,
          [`${perfixCls}-wrap-border-checked`]: this.active,
        },
      ]
    },
    radioClasses() {
      return [
        `${perfixCls}`,
        {
          [`${perfixCls}-checked`]: this.currentValue,
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
