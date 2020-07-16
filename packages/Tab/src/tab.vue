<template>
  <div :class="classes">
    <div :class="[`${prefixCls}-bar`]">
      <!-- nav -->
      <div ref="nav" :class="[`${prefixCls}-nav`]">
        <div :class="barClasses" :style="barStyle"></div>
        <div
          v-for="(item, index) in tabList"
          :key="index"
          :class="tabCls(item)"
          @click="handelChange(index)"
        >
          <qk-icon v-if="item.icon !== ''" :type="item.icon"></qk-icon>
          <Render
            v-if="item.labelType === 'function'"
            :render="item.label"
          ></Render>
          <template v-else>{{ item.label }}</template>
          <qk-icon
            type="qk-icon-close"
            v-if="showClose(item)"
            @click.native.stop="handleRemove(index)"
          ></qk-icon>
        </div>
      </div>
    </div>
    <div :class="contentClasses" :style="contentStyles" ref="panes">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const prefixCls = "qk-tab"
import qkIcon from "../../icon"
import Render from "../../promptMaxin/src/render"
import Emitter from "../../../src/mixins/emitter"
import { oneOf } from "../../../src/utils"
const focusFirst = (element, root) => {
  try {
    element.focus()
  } catch (err) {} // eslint-disable-line no-empty

  if (document.activeElement == element && element !== root) return true

  const candidates = element.children
  for (let candidate of candidates) {
    if (focusFirst(candidate, root)) return true
  }
  return false
}

export default {
  name: "qkTab",
  components: { qkIcon, Render },
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
    },
    closable: {
      type: Boolean,
      default: false,
    },
    size: {
      validator(v) {
        return oneOf(v, ["small", "default"])
      },
      default: "default",
    },
  },
  data() {
    return {
      prefixCls,
      tabList: [],
      activeKey: this.value,
      focusedKey: this.value,
      barWidth: 0,
      barOffset: 0,
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-small`]: this.size === "small",
        },
      ]
    },
    contentClasses() {
      return [`${prefixCls}-content`]
    },
    barClasses() {
      return [`${prefixCls}-link-bar`]
    },
    contentStyles() {
      const x = this.getTabIndex(this.activeKey)
      const p = x === 0 ? "0%" : `-${x}00%`
      let style = {}
      if (x > 1) {
        style = {
          transform: `translateX(${p}) translateZ(0px)`,
        }
      }
      return style
    },
    barStyle() {
      let style = {
        visibility: "visible",
        width: `${this.barWidth}px`,
        left: `${this.barOffset}px`,
        bottom: 0,
      }
      return style
    },
  },
  methods: {
    getTab() {
      return this.$children.filter((item) => item.$options.name === "qkTabPan")
    },
    updateNav() {
      this.tabList = []
      this.getTab().forEach((pane, index) => {
        this.tabList.push({
          labelType: typeof pane.label,
          label: pane.label,
          name: pane.currentName || index,
          closable: pane.closable,
          disabled: pane.disabled,
          icon: pane.icon || "",
        })
        if (!pane.currentName) pane.currentName = index
        if (index == 0)
          if (!this.activeKey) this.activeKey = pane.currentName || index
      })
      this.updateStatus()
      this.updateBar()
    },
    updateStatus() {
      const tabs = this.getTab()
      tabs.forEach((tab) => (tab.show = tab.currentName == this.activeKey))
    },
    updateBar() {
      this.$nextTick(() => {
        const index = this.getTabIndex(this.activeKey)
        if (!this.$refs.nav) return
        const prevTabs = this.$refs.nav.querySelectorAll(
          `.${this.prefixCls}-tab`
        )
        const tab = prevTabs[index]
        this.barWidth = tab ? parseFloat(tab.offsetWidth) : 0

        if (index > 0) {
          let offset = 0
          // const gutter = this.size === "small" ? 0 : 0 + gutter
          for (let i = 0; i < index; i++) {
            console.log("offset :>> ", prevTabs[i].offsetWidth)
            offset += parseFloat(prevTabs[i].offsetWidth)
          }
          this.barOffset = offset
        } else {
          this.barOffset = 0
        }
      })
    },
    /* updateNavScroll(){
        const navWidth = this.$refs.nav.offsetWidth;
        const containerWidth = this.$refs.navScroll.offsetWidth;
        const currentOffset = this.getCurrentScrollOffset();
        if (containerWidth < navWidth) {
            this.scrollable = true;
            if (navWidth - currentOffset < containerWidth) {
                this.setOffset(navWidth - containerWidth);
            }
        } else {
            this.scrollable = false;
            if (currentOffset > 0) {
                this.setOffset(0);
            }
        }
    }, */
    handelChange(index) {
      const nav = this.tabList[index]
      if (nav.disabled) return
      this.activeKey = nav.name
      this.$emit("input", nav.name)
      this.$emit("click", nav.name)
    },
    getTabIndex(name) {
      return this.tabList.findIndex((e) => e.name == name)
    },
    handleRemove(index) {
      console.log("index :>> ", index)
    },
    tabCls(item) {
      return [
        `${prefixCls}-tab`,
        {
          [`${prefixCls}-tab-disabled`]: item.disabled,
          [`${prefixCls}-tab-active`]: item.name == this.activeKey,
          [`${prefixCls}-tab-focused`]: item.name == this.focusedKey,
        },
      ]
    },
    showClose(item) {
      if (item.closable !== null) return item.closable
      else return this.closable
    },
    updateVisibility(index) {
      [...this.$refs.panes.children].forEach((el, i) => {
        if (index === i) {
          [...el.children]
            .filter((child) => {
              child.classList.contains(`${prefixCls}-tabpane`)
            })
            .forEach((child) => (child.style.visibility = "visible"))
          setTimeout(() => focusFirst(el, el), 300)
        } else {
          setTimeout(() => {
            [...el.children]
              .filter((child) =>
                child.classList.contains(`${prefixCls}-tabpane`)
              )
              .forEach((child) => (child.style.visibility = "hidden"))
          }, 300)
        }
      })
    },
  },
  mounted() {
    this.updateVisibility(this.getTabIndex(this.activeKey))
  },
  watch: {
    value(v) {
      this.activeKey = v
      this.focusedKey = v
    },
    activeKey(v) {
      this.focusedKey = v
      this.updateBar()
      this.updateStatus()
    },
  },
}
</script>

<style></style>
