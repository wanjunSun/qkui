import Vue from "vue"
const isServer = Vue.prototype.$isServer
const Popper = isServer
  ? function() {}
  : require("popper.js/dist/umd/popper.js") // eslint-disable-line
import { getStyle } from "../../../src/utils"
export default {
  name: "qkDropDown",
  props: {
    placement: {
      type: String,
      default: "bottom-start",
    },
    classes: String,
  },
  data() {
    return {
      popper: null,
      width: "",
      popperStatus: false,
    }
  },
  computed: {
    styles() {
      let style = {}
      if (this.width) style.width = `${this.width}px`
      return style
    },
  },
  methods: {
    update() {
      if (isServer) return
      if (this.popper) {
        this.$nextTick(() => {
          this.popper.update()
          this.popperStatus = true
        })
      } else {
        // console.log('this.placement :>> ', this.placement);
        this.$nextTick(() => {
          this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
            placement: this.placement,
            // positionFixed: true,//false: 使用position:absoluted来进行定位 true：使用position:fiexed来进行定位
            modifiers: {
              computeStyle: {
                gpuAcceleration: false,
              },
              preventOverflow: {
                boundariesElement: "window",
              },
            },
            onCreate: () => {
              this.resetTransformOrigin()
              this.$nextTick(this.popper.update())
            },
            onUpadte: () => {
              this.resetTransformOrigin()
            },
          })
        })
      }
      if (this.$parent.$options.name === "qkSelect")
        this.width = parseInt(getStyle(this.$parent.$el, "width"))
    },
    destroy() {
      if (!this.popper) return
      setTimeout(() => {
        if (this.popper && !this.popperStatus) {
          this.popper.destroy()
          this.popper = null
        }
        this.popperStatus = false
      }, 300)
    },
    resetTransformOrigin() {
      if (!this.popper) return
      let x_placement = this.popper.popper.getAttribute("x-placement")
      let [placementStart, placementEnd] = x_placement.split("-")
      const leftOrRight = x_placement === "left" || x_placement === "right"
      if (!leftOrRight) {
        this.popper.popper.style.transformOrigin =
          placementStart === "bottom" ||
          (placementStart !== "top" && placementEnd === "start")
            ? "center top"
            : "center bottom"
      }
    },
  },
  created() {
    this.$on("update-popper", this.update)
    this.$on("destroy-popper", this.destroy)
  },
  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy()
    }
  },
  render() {
    return (
      <div class={["qk-select-dropdown", this.classes]} style={this.styles}>
        {this.$slots.default}
      </div>
    )
  },
}
