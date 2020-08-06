import Vue from "vue"
const isServer = Vue.prototype.$isServer

export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(el, event, handler) {
      if (el && event && handler) {
        el.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(el, event, handler) {
      if (el && event && handler) {
        el.attachEvent("on" + event, handler)
      }
    }
  }
})()

export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(el, event, handler) {
      if (el && event) el.removeEventListener(event, handler, false)
    }
  } else {
    return function(el, event, handler) {
      if (el && event) el.detachEvent("on" + event, handler)
    }
  }
})()
