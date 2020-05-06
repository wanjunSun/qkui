<template>
  <div :class="classes"><slot></slot></div>
</template>

<script>
const perfixCls = "qk-checkbox-group"
import emitter from "../../../src/mixins/emitter"
import { oneOf, findDemoDownward } from "../../../src/utils"

export default {
  name: "qkCheckboxGroup",
  mixins: [emitter],
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
    },
    size: {
      validator(v) {
        return oneOf(v, "small", "large")
      },
    },
  },
  data() {
    return {
      currentValue: this.value,
      children: [],
    }
  },
  computed: {
    classes() {
      return [
        `${perfixCls}`,
        {
          [`qk-checkbox-${this.size}`]: !!this.size,
        },
      ]
    },
  },
  methods: {
    updateModal(update) {
      this.children = findDemoDownward(this, "qkCheckbox")
      if (this.children) {
        const { value } = this
        this.children.forEach((child) => {
          child.model = this.value
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0
            child.group = true
          }
        })
      }
    },
    change(data) {
      this.currentValue = data
      this.$emit("input", data)
      this.$emit("change", data)
    },
  },
  watch: {
    value() {
      this.updateModal(true)
    },
  },
}
</script>
