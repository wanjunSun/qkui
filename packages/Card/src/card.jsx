const prefixCls = "qk-card"
import { oneOf } from "../../../src/utils"
export default {
  name: "qkCard",
  props: {
    width: {
      type: [String, Number],
      default: 360,
    },
    shadow: {
      type: String,
      validator(v) {
        return oneOf(v, ["hover", "alawys", "default"])
      },
      default: "default",
    },
    styles: Object,
    hasAngle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.shadow}`]: !!this.shadow,
        },
      ]
    },
    bodyStyle() {
      let width =
        typeof this.width === "string" ? this.width : `${this.width}px`
      return {
        ...this.styles,
        width: width,
        borderRadius: this.hasAngle ? 0 : "",
      }
    },
  },
  render() {
    return (
      <div class={this.classes} style={this.bodyStyle}>
        <div class={`${prefixCls}-heard`} v-show={this.$slots.head}>
          {this.$slots.head}
        </div>
        <div class={`${prefixCls}-body`}>{this.$slots.default}</div>
      </div>
    )
  },
}
