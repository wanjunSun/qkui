<template>
  <li
    :class="classes"
    @mouseenter="handelMouseenter"
    @mouseleave="handelMouseleave"
  >
    <div
      :class="[prefixCls + '-submenu-title']"
      ref="reference"
      @click.stop="handelClick"
      :style="titleStyle"
    >
      <slot name="title"></slot>
      <qk-icon
        type="qk-icon-arrow-right"
        :class="[prefixCls + '-submenu-title-icon']"
      ></qk-icon>
    </div>
  </li>
</template>

<script>
const prefixCls = "qk-menu"
import QkIcon from "../../icon"
export default {
  name: "qkSubmenu",
  components: [QkIcon],
}
</script>
