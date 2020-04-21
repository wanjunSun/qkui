<template>
  <div :class="classes" :name="name"><slot></slot></div>
</template>

<script>
const perfixCls = "qk-radio-group"
import emitter from "../../../src/mixins/emitter"
import { oneOf, findDemoDownward } from "../../../src/utils"
let i = 0
const now = Date.now()
const uuid = () => `qkRadio_${now}_${i++}`
export default {
  name: "qkRadioGroup",
  mixins: [emitter],
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    name: {
      type: String,
      default: uuid,
    },
    type: {
      validator(v) {
        return oneOf(v, ["button"])
      },
    },
    vertical: Boolean,
  },
  data() {
    return {
      currentValue: this.value,
      childrens: [],
    }
  },
  computed: {
    classes() {
      return [
        `${perfixCls}`,
        {
          [`${perfixCls}-vertical`]: this.vertical,
          [`${perfixCls}-${this.type}`]: this.type,
        },
      ]
    },
  },
  methods: {
    updateValue() {
      this.childrens = findDemoDownward(this, "qkRadio")
      if (this.childrens) {
        this.childrens.forEach((child) => {
          child.currentValue = this.currentValue === child.label
          child.group = true
        })
      }
    },
    change(data) {
      this.currentValue = data.value
      this.updateValue()
      this.$emit("input", data.value)
      this.$emit("change", data.value)
    },
  },
  mounted() {
    this.updateValue()
  },
  watch: {
    value() {
      if (this.currentValue !== this.value) {
        this.currentValue = this.value
        this.updateValue()
      }
    },
  },
}
</script>

<style></style>
