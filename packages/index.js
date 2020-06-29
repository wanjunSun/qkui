import QKButton from "./Button"
import QKRow from "./Grid"
import QKTag from "./Tag"
import QKIcon from "./icon"
import QKAlert from "./Alert"
import QKInput from "./Input"
import QKRadio from "./Radio"
import QKCheckbox from "./Checkbox"
import QKNumber from "./Number"
import QKNotice from "./Notice"
import QKMessage from "./Massage"
import QKDrop from "./Drop"
import "../src/style/index.less"
// 所有组件列表
const components = [
  QKButton,
  QKButton.Group,
  QKRow,
  QKRow.QKCol,
  QKTag,
  QKIcon,
  QKAlert,
  QKInput,
  QKRadio,
  QKRadio.Group,
  QKCheckbox,
  QKCheckbox.Group,
  QKNumber,
  QKNotice,
  QKMessage,
  QKDrop,
  QKDrop.item,
  QKDrop.menu,
]
// 定义 install 方法，接收 Vue 作为参数
const install = function(Vue) {
  // 判断是否安装，安装过就不继续往下执行
  // if (install.installed) return
  // install.installed = true
  /*   Object.keys(components).forEach(key => {
    Vue.use(key, components[key])
  }) */
  // 遍历注册所有组件
  components.map((component) => Vue.component(component.name, component))
  // 下面这个写法也可以
  // components.map(component => Vue.use(component))

  Vue.prototype.$qkNotice = QKNotice
  Vue.prototype.$qkMessage = QKMessage
}

// 检测到 Vue 才执行，毕竟我们是基于 Vue 的
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components,
}
