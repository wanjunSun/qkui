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
        :value="formatVal"
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

function addNumb(n1, n2) {
  let s1, s2, m
  try {
    s1 = n1.toString().split(".")[1].length
  } catch (error) {
    s1 = 0
  }
  try {
    s2 = n2.toString().split(".")[1].length
  } catch (error) {
    s2 = 0
  }
  m = Math.pow(10, Math.max(s1, s2))
  return (Math.round(n1 * m) + Math.round(n2 * m)) / m
}

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
    max: Number,
    min: Number,
    step: {
      type: Number,
      default: 1,
    },
    precision: {
      type: Number,
    },

    formatter: {
      type: Function,
    },
  },
  data() {
    return {
      focused: false,
      upDisabled: false,
      downDisabled: false,
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
    precisionValue() {
      if (!this.precision) return this.currentValue
      return this.precision
        ? this.currentValue.toFixed(this.precision)
        : this.currentValue
    },
    formatVal() {
      if (this.formatter && this.precisionValue !== null)
        return this.formatter(this.precisionValue)
      else return this.precisionValue
    },
  },
  methods: {
    handelChange(e) {
      let val = e.target.value.trim()
      if (e.type == "input" && val.match(/^-?\.?$|\.$/)) return
      const { min, max } = this
      const isEmptyString = val.length === 0
      val = Number(val)
      if (isEmptyString) {
        this.setvalue(null)
        return
      }
      if (e.type == "change") {
        if (val === this.currentValue && val > min && val < max) return
      }

      if (!isNaN(val) && !isEmptyString) {
        this.currentValue = val
        if (e.type == "input" && val < min) return
        if (val > max) {
          this.setValue(max)
        } else if (val < min) {
          this.setValue(min)
        } else {
          this.setValue(val)
        }
      } else {
        e.target.value = this.currentValue
      }
    },
    up(e) {
      const v = e.target.value
      if (this.upDisabled && isNaN(v)) return false
      this.changeNumber("up", e)
    },
    down(e) {
      const v = e.target.value
      if (this.downDisabled && isNaN(v)) return false
      this.changeNumber("down", e)
    },
    changeNumber(t, e) {
      if (this.disabled && this.readonly) return false
      const v = Number(e.target.value)
      let cv = this.currentValue
      const step = this.step
      if (isNaN(cv)) return false

      if (!isNaN(v)) {
        if (t === "up") {
          if (addNumb(v, step) <= this.max) cv = v
          else return false
        } else if (t === "down") {
          if (addNumb(v, -step) >= this.min) cv = v
          else return false
        }
      }
      if (t === "up") {
        cv = addNumb(cv, step)
      } else if (t === "down") {
        cv = addNumb(cv, -step)
      }
      this.setValue(cv)
    },
    preventDefault(e) {
      e.preventDefault()
    },
    keydown(e) {
      if (e.keyCode === 40) {
        e.preventDefault()
        this.down(e)
      } else if (e.keyCode === 38) {
        e.preventDefault()
      }
    },
    setValue(val) {
      if (val && !isNaN(this.precision))
        val = Number(Number(val).toFixed(this.precision))
      this.$nextTick(() => {
        this.currentValue = val
        this.$emit("input", val)
        this.$emit("change", val)
      })
    },
    changeVal(val) {
      val = Number(val)
      if (!isNaN(val)) {
        const step = this.step
        this.upDisabled = val + step > this.max
        this.downDisabled = val + step < this.min
      } else {
        this.upDisabled = true
        this.downDisabled = true
      }
    },
  },
  mounted() {
    this.changeVal(this.currentValue)
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.changeVal(val)
    },
    min() {
      this.changeVal(this.currentValue)
    },
    max() {
      this.changeVal(this.currentValue)
    },
  },
}
</script>

<style></style>
