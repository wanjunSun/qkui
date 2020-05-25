import prompt from "../promptMaxin"

const prefixCls = "qk-message"
const iconPrefixCls = "qk-icon"
const prefixCode = "qk_message_code"

const propDefault = {
  top: 24,
  duration: 1.5,
}

let messageInstance,
  name = 1

const iconTypes = {
  info: "prompt",
  success: "success",
  warning: "warning",
  error: "reeor",
  loading: "Loading",
}

function getMessageInstance() {
  messageInstance =
    messageInstance ||
    prompt.newInstance({
      prefixCls,
      styles: {
        top: `${top}px`,
        right: 0,
      },
    })
  return messageInstance
}

function notice(
  content = "",
  duration = propDefault.duration,
  type,
  onClose = () => {},
  closable = false,
  render = () => {}
) {
  const iconType = iconTypes[type]
  const loadCls = type === "loading" ? "qk-load-loop" : ""
  let instance = getMessageInstance()
  instance.notice({
    name: `${prefixCode}${name}`,
    duration,
    styles: {},
    transitionName: "move-up",
    content: `
    <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
      <i class="${iconPrefixCls} ${iconPrefixCls}-${iconType} ${loadCls}"></i>
      <span>${content}</span>
    </div>`,
    render,
    onClose,
    closable,
    type: "message",
  })

  return () => {
    let traget = name++
    return function() {
      instance.remove(`${prefixCode}${traget}`)
    }
  }
}

export default {
  name: "qkMessage",
  info(opt) {
    return this.message("info", opt)
  },
  success(opt) {
    return this.message("success", opt)
  },
  error(opt) {
    return this.message("error", opt)
  },
  warning(opt) {
    return this.message("warning", opt)
  },
  loading(opt) {
    return this.message("loading", opt)
  },
  message(type, options) {
    if (typeof options === "string") {
      options = {
        content: options,
      }
    }
    return notice(
      options.content,
      options.duration,
      type,
      options.onClose,
      options.closable,
      options.render
    )
  },

  config(options) {
    if (options.top || options.top === 0) {
      propDefault.top = options.top
    }
    if (options.duration || options.duration === 0) {
      propDefault.duration = options.duration
    }
  },
  destroy() {
    let instance = getMessageInstance()
    messageInstance = null
    instance.destroy("qk-message")
  },
}
