<template>
  <ul :class="classes" :style="styles">
    <slot></slot>
  </ul>
</template>

<script>
import {
  oneOf,
  findDemoDownward,
  findComponentsUpward,
} from "../../../src/utils"
import Emitter from "../../../src/mixins/emitter"
const prefixCls = "qk-menu"

export default {
  name: "qkMenu",
  mixins: [Emitter],
  props: {
    //横向竖向
    mode: {
      validator(value) {
        return oneOf(value, ["horizontal", "vertical"])
      },
      default: "vertical",
    },
    //主题
    theme: {
      validator(value) {
        return oneOf(value, ["light", "dark", "primary"])
      },
      default: "light",
    },
    //选择名称
    activeName: {
      type: [String, Number],
    },
    openNames: {
      type: Array,
      default() {
        return []
      },
    },
    //手风琴模式
    accordion: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: 240,
    },
  },
  data() {
    return {
      currentActiveName: this.activeName,
      openedNames: [],
    }
  },
  computed: {
    classes() {
      let theme = this.theme
      if (this.mode === "vertical" && this.theme === "primary") theme = "light"
      return [
        `${prefixCls}`,
        `${prefixCls}-${theme}`,
        {
          [`${prefixCls}-${this.mode}`]: this.mode,
        },
      ]
    },
    styles() {
      let style = {}

      if (this.mode === "vertical") style.width = this.width
      return style
    },
  },
  methods: {
    updateActiveName() {
      if (this.currentActiveName === undefined) this.currentActiveName = -1
      this.broadcast("qkSubmenu", "update-active-name", false)
      this.broadcast(
        "qkMenuItem",
        "update-active-name",
        false,
        this.currentActiveName
      )
    },
    updateOpenKeys(name) {
      let names = [...this.openNames]
      const index = names.indexOf(name)
      if (index >= 0) {
        names.splice(index, 1)
      } else {
        if (this.accordion) {
          let currentSubment = null
          names = []
          findDemoDownward(this, "qkSubmenu").forEach((item) => {
            if (item.name === name) currentSubment = item
          })
          findComponentsUpward(currentSubment, "qkSubmenu").forEach((item) => {
            names.push(item.name)
          })
        }
      }
      this.openedNames = names
      this.updateOpend()
      this.$emit("on-open-change", this.openedNames)
    },
    updateOpend() {
      const items = findDemoDownward(this, "qkSubmenu")
      if (item.length)
        item.forEach((item) => {
          if (this.openNames.indexOf(item.name) > -1) item.opend = true
          else item.opend = false
        })
    },
  },
  mounted() {
    this.updateActiveName()
    this.openedNames = [...this.openNames]
    this.updateOpend()
    this.$on("menu-item-select", (name) => {
      this.currentActiveName = name
      this.$emit("select", name)
    })
  },
  watch: {
    openNames(n) {
      this.openedNames = n
    },
    activeName(v) {
      this.currentActiveName = v
    },
    currentActiveName() {
      this.updateActiveName()
    },
  },
}
</script>
