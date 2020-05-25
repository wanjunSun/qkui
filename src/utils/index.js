export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @author: qk
 * @description: 寻找指定元素的父级元素
 * @param { context :当前元素,componentName: 需要寻找到的元素名称,componentNames:数组}
 * @return:返回父级元素
 * @Date: 2020-03-30 14:57:12
 */
export function findFComponent(context, componentName, componentNames) {
  if (typeof componentName === "string") {
    //判断名字是否是string
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }
  //寻找父级
  let parent = context.$parent
  //父级的名字
  let name = parent.$options.name
  //父级不为空 并且 name非空 数组包含父
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

/**
 * @author: qk
 * @description: 寻找所有子级元素
 * @param {context:当前元素,componentName:元素名称}
 * @return:返回子级
 * @Date: 2020-03-30 14:58:26
 */
export function findChilds(context, componentName) {
  //获取所有子
  const childrens = context.$children
  let children = null
  //子级长度不为0
  if (childrens.length) {
    for (const child of childrens) {
      //子级的名称
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findChilds(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

/**
 * @author: qk
 * @description: 寻找到所有同级元素
 * @param {context:当前元素,componentName:元素名称,containSelf: 包含自己}
 * @return:返回子级
 * @Date: 2020-03-30 14:58:26
 */
export function findWithComponent(context, componentName, containSelf = false) {
  //获取兄弟元素
  let res = context.$parent.$children.filter((item) => {
    return item.$options.name === componentName
  })
  //寻找自己的index 如果相同去重
  let index = res.findIndex((item) => item._uid === context._uid)
  if (!containSelf) res.splice(index, 1)
  return res
}

/**
 * @author: qk
 * @description:
 * @param {context:本身元素,componentName:需要找到的元素名称}
 * @return:返回寻找到的元素
 * @Date: 2020-04-18 13:39:44
 */

export function findDemoDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findDemoDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}
