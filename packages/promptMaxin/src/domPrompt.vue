<template>
  <transition :name="transitionName">
    <div :class="classes" :style="styles">
      <template>
        <div :class="contentClasses" ref="content" v-html="content"></div>
        <div :class="contentWithIcon">
          <render-cell :render="render"></render-cell>
        </div>
        <a :class="[baseClass + '-colse']" @click="close" v-if="closable">
          <i class="qk-icon qk-icon-close"></i>
        </a>
      </template>
    </div>
  </transition>
</template>

<script>
import RenderCell from "./render"
export default {
  components: [RenderCell],
  props: {
    perfixCls: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 2,
    },
    content: {
      type: String,
      default: "",
    },
    withIcon: Boolean,
    render: Function,
    hasTitle: Boolean,
    styles: {
      type: Object,
      default: function() {
        return {
          right: "50%",
        }
      },
    },
    closable: {
      type: Boolean,
      default: false,
    },
    className: String,
    name: {
      type: String,
      required: true,
    },
    onClose: {
      type: Function,
    },
    transitionName: {
      type: String,
    },
  },
  data() {
    return { thDesc: false }
  },
  computed: {
    baseClass() {
      return `${this.perfixCls}-notice`
    },
    renderFunc() {
      return this.render || function() {}
    },
    classes() {
      return [
        this.classes,
        {
          [`${this.classes}`]: !!this.className,
          [`${this.classes}-closable`]: this.closable,
          [`${this.classes}-with-desc`]: this.withDesc,
        },
      ]
    },
    contentClasses() {
      return [
        `${this.baseClass}-content`,
        this.render !== undefined
          ? `${this.baseClass}-content-with-render`
          : "",
      ]
    },
    contentWithIcon() {
      return [
        this.withIcon ? `${this.perfixCls}-content-with-icon` : "",
        !this.hasTitle && this.withIcon
          ? `${this.perfixCls}-content-with-render-notitle`
          : "",
      ]
    },
  },
  methods: {
    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },
    close() {
      this.clearCloseTimer()
      this.onClose()
      this.$parent.close(this.name)
    },
    handelEnter(el) {
      if (this.type == "message") el.style.height = el.scrollHeight + "px"
    },
    handelLeave(el) {
      if (this.type == "message") {
        if (document.getElementsByClassName("qk-message-notice").length !== 1) {
          el.style.height = 0
          el.style.paddingTop = 0
          el.style.paddingBottom = 0
        }
      }
    },
  },
  mounted() {
    this.clearCloseTimer()
    if (this.duration !== 0) {
      this.closeTimer = setTimeout(() => {
        this.close()
      }, this.duration * 1000)
    }

    if (this.perfixCls === "qk-notive") {
      let desc = this.$refs.content.querySelectorAll(
        `.${this.prefixCls}-desc`
      )[0]
      this.withDesc = this.render ? true : desc ? desc.innerHTML !== "" : false
    }
  },
  beforeDestroy() {
    this.clearCloseTimer()
  },
}
</script>
