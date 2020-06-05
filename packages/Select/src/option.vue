<template>
  <li
    :class="classes"
    @click.stop="select"
    @mousedown.prevent
    @touchstart.prevent
  >
    <slot>{{ showLbel }}</slot>
  </li>
</template>

<script>
import Emitter from "../../../src/mixins/emitter"
import { findFComponent } from "../../../src/utils"
const prefixCls = "qk-select-option"
export default {
  name: "qkOption",
  props: {
    label: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
      required: true,
    },
    item: {
      type: Object,
      default: {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected,
        },
      ]
    },
    showLbel() {
      return this.label ? this.label : this.value
    },
  },
  methods: {
    select() {
      let obj = { label: this.label, value: this.value }
      if (Object.keys(this.item).length !== 0) obj["item"] = this.item

      this.$emit("select", obj)
    },
  },
  mounted() {
    // let select = findFComponent(this, "qkSelect")
    // if(select)
  },
}
</script>
