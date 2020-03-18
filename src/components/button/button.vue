<template>
  <button :type="{ type }" :class="classes" @click="handleClick"></button>
</template>

<script>
import { contain } from "../../utils/share"
const defaultClass = "qk-button"
export default {
  name: "button",
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
