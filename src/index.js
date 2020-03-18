import QkButton from "./components/button"
const components = { QkButton }
const api = { ...components }

const install = (Vue, opt = {}) => {
  if (install.installed) return
  Object.keys(api).forEach(key => {
    Vue.component(key, api[key])
  })
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

const qkui = { ...components, install }
export default qkui
