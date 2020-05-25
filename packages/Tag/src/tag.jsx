const perfCls = "qk-tag"
import { oneOf } from "../../../src/utils"
export default {
  name: "qkTag",
  props: {
    color: String,
    size: {
      validator(value) {
        return oneOf(value, ["small", "default"])
      },
    },
    type: {
      validator(value) {
        return oneOf(value, ["success", "error", "warning"])
      },
    },
    closable: Boolean,
  },
  computed: {
    classes() {
      return [
        `${perfCls}`,
        {
          [`${perfCls}-${this.size}`]: !!this.size,
          [`${perfCls}-${this.type}`]: !!this.type,
        },
      ]
    },
  },
  methods: {
    handleClose(event) {
      event.stopPropagation()
      this.$emit("close", event)
    },
    handleClick(event) {
      this.$emit("click", event)
    },
  },
  render() {
    return (
      <div
        class={this.classes}
        onClick={this.handleClick}
        style={{ backgroundColor: this.color }}
      >
        {this.$slots.default}
        {this.closable && (
          <i class="qk-icon qk-icon-close" onClick={this.handleClose}></i>
        )}
      </div>
    )
  },
}
