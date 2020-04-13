<template>
  <transition name="qk-alert-fade">
    <div :class="classes" v-if="!closed">
      <span v-if="showIcon">
        <qk-icon :type="iconType" size="22"></qk-icon>
      </span>
      <span :class="slotClass"><slot></slot></span>
      <span :class="closeClasses" v-if="closable" @click="handelClick">
        <qk-icon type="qk-icon-close"></qk-icon>
      </span>
    </div>
  </transition>
</template>

<script>
const perfCls = "qk-alert"
import { oneOf } from "../../../src/utils"
import QkIcon from "../../icon"
export default {
  name: "qkAlert",
  components: { QkIcon },
  props: {
    type: {
      vaildator(v) {
        return oneOf(v, ["success", "error", "warning", "info"])
      },
      default: "success",
    },
    closable: {
      default: false,
      type: Boolean,
    },
    showIcon: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      closed: false,
    }
  },
  computed: {
    classes() {
      return [`${perfCls}`, { [`${perfCls}-${this.type}`]: !!this.type }]
    },
    closeClasses() {
      return `${perfCls}-close`
    },
    iconType() {
      let type = ""
      if ("success" === this.type) {
        type = "qk-icon-success"
      } else if ("error" === this.type) {
        type = "qk-icon-reeor"
      } else if ("warning" === this.type) {
        type = "qk-icon-warning"
      } else if ("info" === this.type) {
        type = "qk-icon-prompt"
      }
      return type
    },
    slotClass() {
      let cls = ""
      if (this.showIcon) {
        cls = ` ${perfCls}-slot`
      }
      return cls
    },
  },
  methods: {
    handelClick(e) {
      this.closed = true
      this.$emit("close", e)
    },
  },
}
</script>
