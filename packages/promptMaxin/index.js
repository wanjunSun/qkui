import PromptComp from "./src/promptComp.vue"
import Vue from "vue"

PromptComp.newInstance = (prop) => {
  const _props = prop || {}
  const Instance = new Vue({
    render(h) {
      return h(PromptComp, {
        props: _props,
      })
    },
  })
  //手动挂载
  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const prompt = Instance.$children[0]

  return {
    notice(promptEl) {
      //渲染时出现多个需要一个数组来进行封装
      prompt.add(promptEl)
    },
    remove(name) {
      prompt.close(name)
    },
    component: prompt,
    destroy(element) {
      prompt.closeAll()
      setTimeout(function() {
        document.body.removeChild(document.getElementsByClassName(element)[0])
      }, 500)
    },
  }
}

export default PromptComp
