export default {
  name: "qkAffix",
  props: {
    topoffset: [Number, String],
    bottomoffset: [Number, String],
  },
  computed: {
    styles() {
      let style = {
        top: this.topoffset + "px",
        bottom: this.bottomoffset + "px",
      }
      return style
    },
  },
  methods: {
    isClick() {
      this.$emit("click")
    },
  },
  render() {
    return (
      <span class="qk-affix" style={this.styles} onClick={this.isClick}>
        {this.$slots.default ? this.$slots.default : ""}
      </span>
    )
  },
}
