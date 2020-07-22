import qkIcon from "../../icon/src/icon"
import { oneOf } from "../../../src/utils"
const perflxCls = "qk-avatar"
export default {
  name: "qkAvatar",
  components: { qkIcon },
  props: {
    icon: {
      type: String,
    },
    className: String,
    src: String,
    shape: {
      type: String,
      validator(v) {
        return oneOf(v, ["circle", "square"])
      },
      default: "circle",
    },
    size: {
      type: String,
      validator(v) {
        return oneOf(v, ["small", "large", "default"])
      },
      default: "default",
    },
  },
  data() {
    return {
      scale: 0.9,
      fontWidth: 0,
    }
  },
  methods: {
    renderIcon() {
      return <qk-icon type={this.icon}></qk-icon>
    },
    renderSrc() {
      return <img src={this.src} />
    },
    renderBody() {
      const { src, icon } = this
      if (src) return this.renderSrc()
      else if (icon) return this.renderIcon()

      return (
        <span style={this.calcStyle} ref="font">
          {this.$slots.default}
        </span>
      )
    },
    setScale() {
      if (this.$refs.font) {
        this.fontWidth = this.$refs.font.offsetWidth
        const avatarWidth = this.$el.getBoundingClientRect().width
        if (avatarWidth - 8 < this.fontWidth)
          this.scale = (avatarWidth - 8) / this.fontWidth
        else this.scale = 0.9
      }
    },
  },
  computed: {
    classes() {
      return [
        `${perflxCls}`,
        {
          [`${this.className}`]: !!this.className,
          [`${perflxCls}-${this.shape}`]: !!this.shape,
          [`${perflxCls}-${this.size}`]: !!this.size,
        },
      ]
    },
    calcStyle() {
      let style = {}
      const { src, icon } = this
      if (!src && !icon) {
        style = {
          position: "absolute",
          display: "inline-block",
          transform: `scale(${this.scale})`,
          left: `calc(50% - ${Math.round(this.fontWidth / 2)}px)`,
        }
      }
      return style
    },
  },
  render() {
    return <span class={this.classes}>{this.renderBody()}</span>
  },
  mounted() {
    this.setScale()
  },
  updated() {
    this.setScale()
  },
}
