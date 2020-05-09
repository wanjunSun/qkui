<template>
  <div :class="warpClasses">
    <div :class="handlerClasses">
      <a :class="upClasses" @click="up" @mousedown="preventDefault">
        <span :class="innerUpClasses" @click="preventDefault"></span>
      </a>
      <a :class="downClasses" @click="down" @mousedown="preventDefault">
        <span :class="innerDownClasses" @click="preventDefault"></span>
      </a>
    </div>
    <div :class="inputWarpClasses">
      <input
        type="number"
        :name="name"
        :class="inputClasses"
        :disabled="disabled"
        autoComplete="off"
        spellCheck="false"
        @input="handelChange"
        @change="handelChange"
        @focus="focused = true"
        @blur="focused = false"
        :readonly="readonly"
        :placeholder="placeholder"
        @keydown.stop="keydown"
      />
    </div>
  </div>
</template>

<script>
const perfixCls = "qk-number"
const iconCls = "qk-icon"
export default {
  name: "qkNumber",
  props: {
    value: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    name: String,
    placeholder: String,
  },
  data() {
    return {
      focused: false,
      upDisabled: false,
      currentValue: this.value,
    }
  },
  computed: {
    warpClasses() {
      return [
        `${perfixCls}`,
        {
          [`${perfixCls}-disabled`]: this.disabled,
          [`${perfixCls}-focused`]: this.focused,
        },
      ]
    },
    handlerClasses() {
      return `${perfixCls}-handler-warp`
    },
    inputWarpClasses() {
      return [`${perfixCls}-input-warp`]
    },
    inputClasses() {
      return [`${perfixCls}-input`]
    },
    upClasses() {
      return [
        `${perfixCls}-handler`,
        `${perfixCls}-handler-up`,
        {
          [`${perfixCls}-handler-up-disabled`]: this.upDisabled,
        },
      ]
    },
    innerUpClasses() {
      return `${perfixCls}-handler-up-inner ${iconCls} ${iconCls}-add-select`
    },
    downClasses() {
      return [
        `${perfixCls}-handler`,
        `${perfixCls}-handler-down`,
        {
          [`${perfixCls}-handler-down-disabled`]: this.downDisabled,
        },
      ]
    },
    innerDownClasses() {
      return `${perfixCls}-handler-down-inner ${iconCls} ${iconCls}-sami-select`
    },
  },
  methods: {
    handelChange(e) {
      this.$emit("input", e)
      this.$emit("change", e)
    },
    up(e) {
      const v = e.target.value
      if (this.upDisabled && isNaN(v)) return false
      this.changeNumber("up", e)
    },
    down(e) {
      const v = e.target.value
      if (this.upDisabled && isNaN(v)) return false
      this.changeNumber("down", e)
    },
    changeNumber(t, e) {
      if (this.disabled && this.readonly) return false
      const v = Number(e.target.value)
      const cv = this.currentValue
      if (isNaN(cv)) return false

      console.log("v :>> ", v, t)
    },
    preventDefault() {},
    keydown(e) {
      if (e.keyCode === 40) {
        e.preventDefault()
        this.down(e)
      } else if (e.keyCode === 38) {
        e.preventDefault()
        this.up(e)
      }
    },
  },
}
</script>

<style></style>
