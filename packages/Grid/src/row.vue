<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = "qk-row"
import { findChilds, findWithComponent } from "../../../src/utils"
export default {
  name: "qkRow",
  props: {
    gutter: {
      type: Number,
      default: 0
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    styles() {
      let gutter = {}
      if (this.gutter !== 0) {
        gutter = {
          marginLeft: this.gutter / -2 + "px",
          marginRight: this.gutter / -2 + "px"
        }
      }
      return gutter
    }
  },
  methods: {
    updateGutter(val) {
      const Col = findChilds(this, "qkCol")
      const Cols = findWithComponent(Col, "qkCol", false)
      if (Cols.length) {
        Cols.forEach(child => {
          if (val !== 0) {
            child.gutter = val
          }
        })
      }
    }
  },
  watch: {
    gutter(val) {
      this.updateGutter(val)
    }
  }
}
</script>

<style></style>
