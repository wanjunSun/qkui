<template>
  <div :class="classes" :style="this.styles" @click="back">
    <slot>
      <div :class="innerClasses">
        <qkIcon type="qk-icon-top"></qkIcon>
      </div>
    </slot>
  </div>
</template>

<script>
const prefixCls = "qk-back-top"
import { scrollTop } from "../../../src/utils/index"
import { on, off } from "../../../src/utils/dom"
import qkIcon from "../../icon"
export default {
  name:"qkBackTop",
  components: { qkIcon },
  props: {
    height: {
      type: Number,
      default: 400,
    },
    bottom: {
      type: Number,
      default: 30,
    },
    right: {
      type: Number,
      default: 30,
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      backTop: false,
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show`]: this.backTop,
        },
      ]
    },
    styles() {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`,
      }
    },
    innerClasses() {
      return `${prefixCls}-inner`
    },
  },
  mounted() {
    on(window, "scroll", this.handleScroll)
    on(window, "resize", this.handleScroll)
  },
  beforeDestroy() {
    off(window, "scroll", this.handleScroll)
    off(window, "resize", this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.backTop = window.pageYOffset >= this.height
    },
    back() {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop

      scrollTop(window, sTop, 0, this.duration)
      this.$emit("click")
    },
  },
}
</script>
