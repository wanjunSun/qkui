<template>
  <div :class="classes" :style="styles">
    <dom-prompt
      v-for="item in notices"
      :key="item.name"
      :prefix-cls="prefixCls"
      :style="item.styles"
      :type="item.type"
      :content="item.content"
      :duration="item.duration"
      :render="item.render"
      :has-title="item.hasTitle"
      :withIcon="item.withIcon"
      :closable="item.closable"
      :name="item.name"
      :transition-name="item.transitionName"
      :on-close="item.onClose"
    >
    </dom-prompt>
  </div>
</template>

<script>
import DomPrompt from "./domPrompt"
const perfixCls = "qk-notification"
let seed = 0
const now = Date.now()
function Uuid() {
  return `qkNotification_${now}_${seed}`
}
export default {
  components: { DomPrompt },
  props: {
    perfixCls: {
      type: String,
      default: perfixCls,
    },
    styles: {
      type: Object,
      default: function() {
        return {
          top: "65px",
          left: "50%",
        }
      },
    },
    content: String,
    className: String,
  },
  data() {
    return {
      notices: [],
    }
  },
  computed: {
    classes() {
      return [
        `${this.perfixCls}`,
        {
          [`${this.className}`]: !!this.className,
        },
      ]
    },
  },
  methods: {
    add(notice) {
      const name = notice.name || Uuid()
      let integration = Object.assign(
        {
          styles: {
            right: "50%",
          },
          content: "",
          duration: 1.5,
          closable: false,
          name,
        },
        notice
      )
      this.notices.push(integration)
    },
    close(name) {
      const notice = this.notices
      for (let i = 0; i < notice.length; i++) {
        if (notice[i].name === name) {
          this.notices.splice(i, 1)
          break
        }
      }
    },
    closeAll() {
      this.notices = []
    },
  },
}
</script>
