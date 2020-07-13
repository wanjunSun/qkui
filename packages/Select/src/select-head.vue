<template>
  <div @click="onHearderClick">
    <span :class="headDisplayClasses" v-show="headDisplayValue">{{
      headDisplayValue
    }}</span>

    <input
      type="text"
      v-if="filterable"
      v-model="query"
      :disabled="disabled"
      :class="[prefixCls + '-input']"
      :placeholder="showPlaceholder ? localePlaceholder : ''"
      :style="inputStyle"
      autocomplete="off"
      spellcheck="false"
      @focus="onInputFocus"
      @blur="onInputBlur"
      ref="input"
    />
    <qk-icon
      type="qk-icon-close"
      :class="prefixCls + ' -arrow'"
      v-if="resetSelect"
      @click.native.stop="onClear"
    ></qk-icon>
    <qk-icon
      type="qk-icon-arrow-down"
      v-if="!resetSelect && !remote && !disabled"
      :class="prefixCls + ' -arrow'"
    ></qk-icon>
  </div>
</template>

<script>
/*eslint-disable*/
const prefixCls = "qk-select"

import qkIcon from "../../icon"
import Emitter from "../../../src/mixins/emitter"
export default {
  name: "qkSelectHead",
  components: { qkIcon },
  mixins: [Emitter],
  props: {
    values: {
      type: Array,
      default: () => [],
    },
    initialLabel: {
      type: String,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: [Function, Boolean],
      default: false,
    },
    placeholder: {
      type: String,
    },
    queryProp: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      prefixCls,
      remoteInitialLabel: this.initialLabel,
      query: "",
      inputLength: 20,
    }
  },
  computed: {
    headDisplayClasses() {
      const { filterable, multiple, showPlaceholder } = this
      return [
        {
          [prefixCls + "-placeholder"]: showPlaceholder && !filterable,
          [prefixCls + "-selected-value"]:
            !showPlaceholder && !filterable && !multiple,
        },
      ]
    },
    headDisplayValue() {
      if ((this.multiple && this.value.length > 0) || this.filterable) return ""
      return `${this.selectedSingle}`
    },
    selectedSingle() {
      const selected = this.values[0]
      return selected ? selected.label : this.remoteInitialLabel || ""
    },
    resetSelect() {
      return !this.showPlaceholder && this.clearable
    },
    showPlaceholder() {
      let status = false
      if (!this.multiple) {
        const value = this.values[0]
        if (typeof value === "undefined" || String(value).trim() === "")
          status = !this.remoteInitialLabel
      } else {
        if (!this.value.length > 0) status = true
      }
      return status
    },
    inputStyle() {
      let style = {}

      if (this.multiple) {
        if (this.showPlaceholder) {
          style.width = "100%"
        } else {
          style.width = `${this.inputLength}px`
        }
      }

      return style
    },
    localePlaceholder() {
      if (this.placeholder === undefined) return "请选择"
      else return this.placeholder
    },
  },
  methods: {
    onInputFocus() {
      this.$emit(e.type === "focus" ? "input-focus" : "input-blur")
    },
    onHearderClick(e) {
      if (this.filterable && e.target === this.$el) this.$refs.input.focus()
    },
    onClear() {
      this.$emit("clear")
    },
    watch: {
      values([value]) {
        if (!this.filterable) return
        if (this.multiple) {
          this.query = ""
          return
        }
        if (typeof value === "undefault" || value === "" || value === null)
          this.query = null
        else this.query = value.label
      },
      query(val) {
        this.$emit("query-change", val)
      },
      queryProp(query) {
        if (query !== this.query) this.query = query
      },
    },
  },
}
</script>
