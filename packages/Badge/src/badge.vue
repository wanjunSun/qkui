<template>
  <div :class="classes">
    <slot></slot>
    <sup
      v-text="content"
      :class="classesSup"
      :style="{ backgroundColor: this.color }"
    ></sup>
  </div>
</template>

<script>
const perflxCls = "qk-badge"
export default {
  name: "qkBadge",
  props: {
    value: [String, Number],
    color: {
      type: String,
      default: "#ed5a65",
    },
    isDot: {
      type: Boolean,
      default: false,
    },
    max: Number,
  },
  computed: {
    classes() {
      return [`${perflxCls}`]
    },
    classesSup() {
      return [
        `${perflxCls}-sup`,
        {
          [`${perflxCls}-sup-dot`]: this.isDot,
        },
      ]
    },
    content() {
      if (this.isDot) return
      const value = this.value
      const max = this.max
      if (typeof value === "number" && typeof max === "number")
        return max < value ? `${max}+` : value

      return value
    },
  },
}
</script>
