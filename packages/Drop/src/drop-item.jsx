const perfixCls = "qk-dropdown-item"
import { findFComponent } from "../../../src/utils/index"
export default {
  name: "qkDropItem",
  props: {
    name: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    divided: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `${perfixCls}`,
        {
          [`${perfixCls}-disabled`]: this.disabled,
          [`${perfixCls}-selected`]: this.selected,
          [`${perfixCls}-divided`]: this.divided,
        },
      ]
    },
  },
  methods: {
    handelClick() {
      const $parent = findFComponent(this, "qkDrop")
      const hasChildren =
        this.$parent && this.$parent.$options.name === "qkDrop"
      if (this.disabled) {
        this.$nextTick(() => {
          $parent.currentVisible = true
        })
      } else if (hasChildren) {
        this.$parent.$emit("haschild-click")
      } else {
        if ($parent && $parent.$options.name === "qkDrop") {
          $parent.$emit("hover-click")
          $parent.currentVisible = false
        }
      }
      $parent.$emit("click", this.name)
    },
  },
  render() {
    return (
      <li class={this.classes} onClick={this.handelClick}>
        {this.$slots.default}
      </li>
    )
  },
}
