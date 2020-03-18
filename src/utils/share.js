/**
 * @author: qk
 * @description: 包含某个值
 * @param {type} 值，数组
 * @return:
 * @Date: 2020-03-17 19:30:49
 */
export function contain(v, d) {
  for (let i = 0; i < d.length; i++) {
    if (v === d[i]) return true
  }
  return false
}
