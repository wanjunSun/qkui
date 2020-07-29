const preflxCls = "qk-switch"
import { oneOf } from "../../../src/utils"
import Emitter from "../../../src/mixins/emitter"
export default {
  name: "qkSwitch",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      validator(v) {
        return oneOf(v, ["small", "large", "default"])
      },
    },
    successColor: String,
    errorColor: String,
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  computed: {
    wrapClasses() {
      return [
        `${preflxCls}`,
        {
          [`${preflxCls}-checked`]: this.currentValue === this.trueValue,
          [`${preflxCls}-${this.size}`]: !!this.size,
          [`${preflxCls}-disable`]: this.disabled,
        },
      ]
    },
    innerClasses() {
      return [`${preflxCls}-inner`]
    },
    warpStyles() {
      let style = {}
      if (this.successColor && this.currentValue === this.trueValue)
        style = { backgroundColor: this.successColor }
      else style = { backgroundColor: this.errorColor }
      return style
    },
  },
  methods: {
    toggle(event) {
      event.preventDefault()
      if (this.disabled) return false
      const checked =
        this.currentValue === this.trueValue ? this.falseValue : this.trueValue
      this.currentValue = checked
      this.$emit("input", checked)
      this.$emit("change", checked)
    },
  },
  watch: {
    value(v) {
      if (v !== this.trueValue && v !== this.falseValue) throw "值有误"
      this.currentValue = v
    },
  },
  render() {
    return (
      <span
        tabIndex="0"
        class={this.wrapClasses}
        style={this.warpStyles}
        onClick={(e) => {
          this.toggle(e)
        }}
        onKeyDownSpace={(e) => {
          this.toggle(e)
        }}
      >
        <input type="hidden" name={this.name} value={this.currentValue}></input>
        <span class={this.innerClasses}>
          {this.$slots.open && this.currentValue === this.trueValue
            ? this.$slots.open
            : ""}
          {this.$slots.close && this.currentValue === this.falseValue
            ? this.$slots.close
            : ""}
        </span>
      </span>
    )
  },
}
