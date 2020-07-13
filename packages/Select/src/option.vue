<template>
  <li
    :class="classes"
    @click.stop="select"
    @mousedown.prevent
    @touchstart.prevent
  >
    <slot>{{ showLabel }}</slot>
  </li>
</template>

<script>
import Emitter from "../../../src/mixins/emitter"
// import { findFComponent } from "../../../src/utils"
const prefixCls = "qk-select-option"
export default {
  name: "qkOption",
  componentName: "select-item",
  mixins: [Emitter],
  props: {
    label: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
      required: true,
    },
 /*    item: {
      type: Object,
      default: {},
    }, */
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    isFocused: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sarchLabel: "",
      autoComlete: false,
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected && !this.autoComlete,
          [`${prefixCls}-focus`]: this.isFocused,
        },
      ]
    },
    showLabel() {
      return this.label ? this.label : this.value
    },
    optionLabel() {
      return (this.$el && this.$el.textContent) || this.label
    },
  },
  methods: {
    select() {
      if (this.disabled) return false
      // let obj = { label: this.label, value: this.value }
      // if (Object.keys(this.item).length !== 0) obj["item"] = this.item
      this.dispatch("qkSelect", "select-selected", {
        value: this.value,
        label: this.optionLabel,
      })
      this.$emit("select-selected", {
        value: this.value,
        label: this.optionLabel,
      })
    },
  },
  mounted() {
    // const Select = findComponentUpward(this, "qkSelect")
    // if (Select) this.autoComplete = Select.autoComplete
  },
}
</script>
