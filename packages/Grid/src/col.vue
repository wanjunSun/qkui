<template>
  <div :class="classes" :style="styles"><slot></slot></div>
</template>

<script>
const prefixCls = "qk-col"
import { findFComponent } from "../../../src/utils"

export default {
  name: "qkCol",
  props: {
    span: [Number, String],
    className: String
  },
  data() {
    return {
      gutter: 0
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-span-${this.span}`]: this.span,
          [`${this.className}`]: this.className
        }
      ]
    },
    styles() {
      let style = {}
      if (this.gutter !== 0) {
        style = {
          paddingLeft: this.gutter / 2 + "px",
          paddingRight: this.gutter / 2 + "px"
        }
      }

      return style
    }
  },
  methods: {
    updateGutter() {
      let Row = findFComponent(this, "qkRow")
      if (Row) Row.updateGutter(Row.gutter)
    }
  },
  mounted() {
    this.updateGutter()
  },
  beforeDestroy() {
    this.updateGutter()
  }
}
</script>
