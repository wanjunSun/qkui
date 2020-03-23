<template>
  <button :type="type" :class="classes" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
import { contain } from "../../utils/share"
const defaultClass = "qk-btn"
export default {
  name: "QkButton",
  props: {
    type: {
      validator(value) {
        return contain(value, [
          "primary",
          "ghost",
          "dashed",
          "text",
          "info",
          "success",
          "warning",
          "error",
          "default"
        ])
      }
    }
  },
  computed: {
    classes() {
      return [
        `${defaultClass}`,
        {
          [`${defaultClass}-${this.type}`]: !!this.type
        }
      ]
    }
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event)
    }
  }
}
</script>
