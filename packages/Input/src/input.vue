<template>
  <div>
    <div :class="classes">
      <template v-if="type !== 'textarea'">
        <div :class="[prefixCls + '-group-before']" v-if="before">
          <slot name="before"></slot>
        </div>
        <input
          :id="inputId"
          :class="inputClass"
          :type="type"
          :disabled="disabled"
          :value="currentValue"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :readonly="readonly"
          @keyup.enter="handleEnter"
          @blur="handelBlur"
          @focus="handelFocus"
          @input="handleInput"
          @change="handelChange"
          :maxlength="maxlegth"
        />
        <div :class="[prefixCls + '-group-append']" v-if="append">
          <slot name="append"></slot>
        </div>
        <span
          :class="[`${prefixCls}-icon`, `${prefixCls}-icon-clear`]"
          v-if="clearable && currentValue"
          @click="handelClear"
        >
        </span>
      </template>
      <template v-else>
        <textarea
          ref="textarea"
          :class="textareaClasses"
          :style="textareaStyles"
          :disabled="disabled"
          :maxlength="maxlegth"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :rows="rows"
          @keyup.enter="handleEnter"
          @blur="handelBlur"
          @focus="handelFocus"
          @input="handleInput"
          @change="handelChange"
        >
        </textarea>
      </template>
    </div>
    <span v-if="isWorldLimit" :class="[`${prefixCls}-count`]">
      {{ textlength }}/{{ maxlegth }}
    </span>
  </div>
</template>

<script>
const prefixCls = "qk-input"
import { oneOf } from "../../../src/utils"
import calcTextareaHeight from "./calcTextareaClasses"
export default {
  name: "qkInput",
  data() {
    return {
      before: false,
      append: false,
      prefixCls,
      currentValue: this.value,
      textareaStyles: {}
    }
  },
  props: {
    type: {
      validator(v) {
        return oneOf(v, ["text", "password", "email", "url", "textarea"])
      }
    },
    value: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: Number,
    placeholder: String,
    size: {
      validator(v) {
        return oneOf(v, ["small", "large"])
      }
    },
    inputId: String,
    clearable: Boolean,
    maxlegth: { type: [Number, String] },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      validator(value) {
        return oneOf(value, ["on", "off"])
      },
      default: "off"
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-group`]: this.before || this.append,
          [`${prefixCls}-group-with-before`]: this.before,
          [`${prefixCls}-group-with-append`]: this.append,
          [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
          [`${prefixCls}-clear`]: this.clearable
        }
      ]
    },
    inputClass() {
      return [`${prefixCls}`, { [`${prefixCls}-disabled`]: this.disabled }]
    },
    textareaClasses() {
      return [`${prefixCls}`, { [`${prefixCls}-disabled`]: this.disabled }]
    },
    textlength() {
      return this.value.length
    },
    isWorldLimit() {
      return (
        this.showWordLimit &&
        this.maxlegth &&
        (this.type === "text" || this.type === "textarea")
      )
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(val)
    }
  },
  methods: {
    handleEnter(e) {
      this.$emit("enter", e)
    },
    handleInput(e) {
      this.$emit("input", e.target.value)
    },
    handelBlur(e) {
      this.$emit("blur", e)
    },
    handelFocus(e) {
      this.$emit("focus", e)
    },
    handelChange(e) {
      this.$emit("input-change", e)
    },
    handelClear(e) {
      this.setCurrentValue("")
      this.$emit("clear", e)
    },
    setCurrentValue(value) {
      if (value === this.currentValue) return
      this.$nextTick(() => {
        this.resizeTextarea()
      })
      this.currentValue = value
    },
    calcClearIcon() {
      const elList = [].slice.call(
        this.$el.querySelectorAll(`.${prefixCls}-icon-clear`) || []
      ) //找到icon
      if (!elList.length) return
      let el
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i]
          break
        }
      }
      const elAppend = this.$el.querySelector(`.${prefixCls}-group-append`) //找到右侧
      if (!el) return
      if (this.append) {
        el.style.right = `${elAppend.offsetWidth}px`
      } else el.removeAttribute("style")
    },
    resizeTextarea() {
      const autosize = this.autosize
      if (!autosize || this.type === "textarea") {
        return false
      }
      alert()
      const { minRow, maxRow } = autosize
      this.textareaStyles = calcTextareaHeight(
        this.$refs.textarea,
        minRow,
        maxRow
      )
    }
  },
  mounted() {
    if (this.type !== "textarea") {
      this.before = this.$slots.before !== undefined
      this.append = this.$slots.append !== undefined
    } else {
      this.before = false
      this.append = false
    }
    this.resizeTextarea()
  },
  updated() {
    this.$nextTick(this.calcClearIcon())
  }
}
</script>
