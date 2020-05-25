import prompt from "../promptMaxin"

const prefixCls = "qk-notice"
const iconPrefixCls = "qk-icon"
const prefixCode = "qk_notice_code"

let top = 24
let defaultDuration = 3
let noticeInstance
let name = 1

const iconTypes = {
  info: "prompt",
  success: "success",
  warning: "warning",
  error: "reeor",
}

function getNoticeInstance() {
  noticeInstance =
    noticeInstance ||
    prompt.newInstance({
      prefixCls,
      styles: {
        top: `${top}px`,
        right: 0,
      },
    })
  return noticeInstance
}

function notice(type, options) {
  const title = options.title || ""
  const desc = options.desc || ""
  const noticeKey = options.name || `${prefixCode}${name}`
  const onClose = options.onClose || function() {}
  const render = options.render
  const duration =
    options.duration == 0 ? 0 : options.duration || defaultDuration
  name++
  let instance = getNoticeInstance()
  let content, withIcon

  const with_des =
    options.render && !title
      ? ""
      : desc || options.render
      ? `${prefixCls}-with-desc`
      : ""
  if (type == "normal") {
    withIcon = false
    content = `
    <div class="${prefixCls}-custom-content ${prefixCls}-with-normal ${with_des}">
      <div class="${prefixCls}-title">${title}</div>
      <div class="${prefixCls}-desc">${desc}</div>
    </div>
   `
  } else {
    const iconType = iconTypes[type]
    withIcon = true
    content = `
        <div class="${prefixCls}-custom-content ${prefixCls}-with-icon ${prefixCls}-with-${type} ${with_des}">
            <span class="${prefixCls}-icon ${prefixCls}-icon-${type}">
                <i class="${iconPrefixCls} ${iconPrefixCls}-${iconType}"></i>
            </span>
            <div class="${prefixCls}-title">${title}</div>
            <div class="${prefixCls}-desc">${desc}</div>
        </div>
    `
  }
  instance.notice({
    name: noticeKey.toString(),
    duration,
    styles: {},
    transitionName: "move-notice",
    content,
    withIcon,
    render,
    hasTitle: !!title,
    onClose,
    closable: true,
    type: "notice",
  })
}

export default {
  name: "qkNotice",
  open(option) {
    return notice("normal", option)
  },
  info(option) {
    return notice("info", option)
  },
  success(option) {
    return notice("success", option)
  },
  warning(option) {
    return notice("warning", option)
  },
  error(option) {
    return notice("error", option)
  },
  config(option) {
    if (option.top) top = option.top
    if (option.duration || option.duration == 0)
      defaultDuration = option.duration
  },
  close(n) {
    if (n) {
      name = n.toString()
      if (noticeInstance) noticeInstance.remove(n)
    } else return false
  },
  destroy() {
    let instance = getNoticeInstance()
    noticeInstance = null
    instance.destroy("qk-notice")
  },
}
