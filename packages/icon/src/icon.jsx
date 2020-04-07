export default {
  name: "qkIcon",
  props: {
    type: String,
    color: String,
    size: [Number, String],
  },
  computed: {
    styles() {
      return {
        color: this.color,
        fontSize: this.size + "px",
        verticalAlign: "middle",
      }
    },
  },
  render() {
    return <i class={`qk-icon ${this.type}`} style={this.styles}></i>
  },
}
