<template>
  <div :class="classes">
    <div :class="selectionCls">
      <slot name="head">
        <input type="hidden" :name="name" :value="publicVaule" />
        <qk-head
          :values="values"
          :initial-label="initialLabel"
          :multiple="multiple"
          :filterable="filterable"
          :disabled="disabled"
          :clearable="canBeCleared"
          :placeholder="placeholder"
          :query-prop="query"
          @query-change="onQueryChange"
          @input-focus="isFocused = true"
          @input-blur="isFocused = false"
          @clear="onClear"
        >
        </qk-head>
      </slot>
    </div>

    <transition name="transition-option">
      <ul :class="prefixCls + '-dropdown-list'">
        <qk-option v-bind="options"></qk-option>
      </ul>
    </transition>
  </div>
</template>

<script>
/*eslint-disable*/
import { oneOf } from "../../../src/utils"
import qkOption from "./option"
import qkHead from "./select-head"
const prefixCls = "qk-select"
export default {
  name: "qkSelect",
  components: { qkOption, qkHead },
  data() {
    return {
      prefixCls,
      query: "",
      isFocused: false,
      initialLabel: this.label,
      unchangedQuery: true,
      values: this.getInitialValue(),
    }
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: "",
    },
    label: {
      type: [String, Number, Array],
      default: "",
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    disabled: { type: Boolean, default: false },
    size: {
      validator(v) {
        return oneOf(v, ["small", "large", "default"])
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    remoteMethod: {
      type: Function,
    },
    labelInValue: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-multiple`]: this.multiple,
          [`${prefixCls}-single`]: !this.multiple,
        },
      ]
    },
    selectionCls() {
      return [`${prefixCls}-selection`]
    },
    options() {
      return {
        value: this.values[0],
        label: this.label,
        disabled: false,
        selected: false,
        isFocused: false,
      }
    },
    //input
    canBeCleared() {
      const qualifiesForClear = !this.multiple && this.clearable
      return qualifiesForClear && this.reset
    },
    remote() {
      return typeof this.remoteMethod === "function"
    },
    publicVaule() {
      if (this.labelInValue) this.multiple ? this.values : this.values[0]
      else
        this.multiple
          ? this.values.map((option) => option.value)
          : (this.values[0] || {}).value
    },
  },
  methods: {
    reset() {
      this.unchangedQuery = true
      this.values = []
    },
    getInitialValue() {
      const { multiple, value } = this
      let intialValue = Array.isArray(value) ? value : [value]
      if (
        !multiple &&
        (typeof intialValue[0] === "undefault" ||
          String(intialValue[0]).trim() === "")
      )
        intialValue = []

      return intialValue.filter(Boolean)
    },
    onQueryChange(query) {
      if (query.length > 0 && query !== this.query) this.visible = true
      this.query = query
      this.unchangedQuery = this.visible
    },
    onClear() {
      this.$emit("chear")
      this.hideMenu()
      if (this.clearable) this.values = []
    },
  },
  watch: {
    value(v) {
      const { getInitialValue, getOptionData, publicValue } = this
      if (value === "") this.values = []
      else if (JSON.stringify(value) !== JSON.stringify(publicValue)) {
        this.$nextTick(
          () =>
            (this.values = getInitialValue()
              .map(getOptionData)
              .filter(Boolean))
        )
      }
    },
  },
  values(now, before) {
    const newValue = JSON.stringify(now)
    const oldValue = JSON.stringify(before)
    const showEmitInput = newValue !== oldValue
    if (showEmitInput) {
      const vModelValue = this.labelInValue
        ? this.multiple
          ? this.publicValue.map(({ value }) => value)
          : this.publicValue.value
        : this.publicValue
      this.$emit("input", vModelValue) // to update v-model
      this.$emit("change", this.publicValue)
      // this.dispatch('FormItem', 'on-form-change', this.publicValue);
    }
  },
}
</script>
