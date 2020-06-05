<template>
  <div :class="classes">
    <div :class="selectionCls">
      <span :class="prefixCls + '-hader-font'">{{ selectVal }}</span>
      <qk-icon
        type="qk-icon-arrow-down"
        :class="prefixCls + '-hader-arrow'"
      ></qk-icon>
    </div>

    <transition name="transition-option">
      <ul :class="prefixCls + '-dropdown-list'">
        <qk-option v-bind="options"></qk-option>
      </ul>
    </transition>
  </div>
</template>

<script>
import { oneOf } from "../../../src/utils"
import qkIcon from "../../icon"
import qkOption from "./option"
const prefixCls = "qk-select"
export default {
  name: "qkSelect",
  components: [qkIcon, qkOption],
  props: {
    value: {
      type: [String, Number, Array],
      default: "",
    },
    label: {
      type: [String, Number, Array],
      default: "",
    },
    disabled: { type: Boolean, default: false },
    size: {
      validator(v) {
        return oneOf(v, ["small", "large", "default"])
      },
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-${size}`]: !this.size,
        },
      ]
    },
    selectionCls() {
      return [`${prefixCls}-selection`]
    },
    selectVal() {
      return ""
    },
    options(){
      return {}
    }
  },
}
</script>

<style></style>
