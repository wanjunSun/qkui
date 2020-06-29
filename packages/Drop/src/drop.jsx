const prefixCls = "qk-dropdown"
import Drop from "./drop-down.jsx"
import clickout from "../../../src/directives/clickoutside"
import transferDom from "../../../src/directives/transfer-dom"
import { oneOf, findFComponent } from "../../../src/utils"
export default {
  name: "qkDrop",
  components: { Drop },
  directives: { clickout, transferDom },
  props: {
    trigger: {
      validator(v) {
        return oneOf(v, ["hover", "click"])
      },
      default: "hover",
    },
    placement: {
      validator(v) {
        return oneOf(v, [
          "top",
          "top-start",
          "top-end",
          "left",
          "left-start",
          "left-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "right",
          "right-start",
          "right-end",
        ])
      },
      default: "bottom",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    transfer: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    transition() {
      return ["bottom", "bottom-start", "bottom-end"].indexOf(this.placement) >
        -1
        ? "slide-up"
        : "fade"
    },
    dropdownCls() {
      return { [prefixCls + "-transfer"]: this.transfer }
    },
  },
  data() {
    return {
      prefixCls: prefixCls,
      currentVisible: this.visible,
    }
  },
  watch: {
    visible(v) {
      this.currentVisible = v
    },
    currentVisible(v) {
      if (v) this.$refs.drop.update()
      else this.$refs.drop.destroy()
      this.$emit("visible-change", v)
    },
  },
  methods: {
    handelClick() {
      if (this.trigger !== "click") return false
      this.currentVisible = !this.currentVisible
    },
    handelMouseEnter() {
      if (this.trigger !== "hover") return false
      if (this.timeOut) clearTimeout(this.timeOut)
      this.timeOut = setTimeout(() => {
        this.currentVisible = true
      }, 250)
    },
    handelMouseLeave() {
      if (this.trigger !== "hover") return false
      if (this.timeOut) clearTimeout(this.timeOut)
      this.timeOut = setTimeout(() => {
        this.currentVisible = false
      }, 150)
    },
    onClickOut(e) {
      this.handelClose()
      if (this.currentVisible) this.$emit("clickoutside", e)
    },
    handelClose() {
      if (this.trigger !== "hover") return false
      this.currentVisible = false
    },
    hasParent() {
      const $parent = findFComponent(this, "qkDrop")
      if ($parent) return $parent
      else return false
    },
    renderTransition() {
      return (
        <transition name="transition-drop">
          <Drop
            class={this.dropdownCls}
            v-show={this.currentVisible}
            placement={this.placement}
            ref="drop"
            onnativeMouseEnter={this.handelMouseEnter}
            onnativeMouseLeave={this.handelMouseLeave}
            data-transfer={this.transfer}
            v-transfer-dom
          >
            {this.$slots.list}
          </Drop>
        </transition>
      )
    },
  },
  mouted() {
    const $parent = this.hasParent()
    this.$on("click", (key) => {
      if ($parent) $parent.$emit("click", key)
    })
    this.$on("hove-click", () => {
      if ($parent) {
        $parent.$emit("hover-click")
      } else {
        this.$nextTick(() => {
          if (this.trigger === "oustom") return false
          this.currentVisible = false
        })
      }
    })
    this.$on("haschild-click", () => {
      this.$nextTick(() => {
        this.currentVisible = true
      })
      const $parent = this.hasParent()
      if ($parent) $parent.$emit("haschild-click")
    })
  },
  render() {
    return (
      <div
        class={prefixCls}
        v-clickout={this.onClickOut}
        onmouseenter={this.handelMouseEnter}
        onmouseleave={this.handelMouseLeave}
      >
        <div
          class={[prefixCls + "-rel"]}
          ref="reference"
          onClick={this.handelClick}
        >
          {this.$slots.default}
        </div>
        {this.renderTransition()}
      </div>
    )
  },
}
