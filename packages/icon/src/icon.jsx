export default {
  name: "qkIcon",
  props: {
    type: String,
    color: String,
    size: Number,
  },
  computed: {
    styles() {
      return {
        color: this.color,
        fontSize: this.size + "px"
      }
    }
  },
  render() {
    return <i class={`qk-icon ${this.type}`} style={this.styles}></i>
  }
}
