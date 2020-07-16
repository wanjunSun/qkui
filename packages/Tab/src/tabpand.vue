<template>
  <div :class="classes" v-show="show"><slot></slot></div>
</template>

<script>
const perfixCls = "qk-tab-tabpane"
export default {
  name: "qkTabPan",
  props: {
    name: String,
    label: {
      type: [String, Function],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      perfixCls,
      show: true,
      currentName: this.name,
    }
  },
  computed: {
    classes() {
      return [`${perfixCls}`]
    },
  },
  methods: {
    updateNav() {
      this.$parent.updateNav()
    },
  },
  watch: {
    name(v) {
      this.currentName = v
      this.updateNav()
    },
    label() {
      this.updateNav()
    },
    icon() {
      this.updateNav()
    },
    disabled() {
      this.updateNav()
    },
  },
  mounted() {
    this.updateNav()
  },
  destroyed() {
    this.updateNav()
  },
}
</script>

<style></style>
