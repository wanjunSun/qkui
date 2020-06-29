<template>
  <div>
    <qk-alert type="warning" showIcon
      >在使用左侧、顶部的位置时，确保宽度、高度足够展示drop</qk-alert
    >
      <h1>hover方式</h1>
      <qk-drop>
        下拉菜单 (默认)<qk-icon class="qk-icon-arrow-down"></qk-icon>
        <qk-drop-menu slot="list">
          <qk-drop-item name="1">驴打滚</qk-drop-item>
          <qk-drop-item>炸酱面</qk-drop-item>
          <qk-drop-item disabled>豆汁儿</qk-drop-item>
          <qk-drop-item>冰糖葫芦</qk-drop-item>
          <qk-drop-item divided>北京烤鸭</qk-drop-item>
        </qk-drop-menu>
      </qk-drop>
      <qk-drop placement="left">
        下拉菜单 (左侧)<qk-icon class="qk-icon-arrow-down"></qk-icon>
        <qk-drop-menu slot="list">
          <qk-drop-item name="1">驴打滚</qk-drop-item>
          <qk-drop-item>炸酱面</qk-drop-item>
        </qk-drop-menu>
      </qk-drop>
      <qk-drop placement="right">
        下拉菜单 (右侧)<qk-icon class="qk-icon-arrow-down"></qk-icon>
        <qk-drop-menu slot="list">
          <qk-drop-item name="1">驴打滚</qk-drop-item>
          <qk-drop-item>炸酱面</qk-drop-item>
        </qk-drop-menu>
      </qk-drop>
      <qk-drop placement="top">
        下拉菜单 (顶部)<qk-icon class="qk-icon-arrow-down"></qk-icon>
        <qk-drop-menu slot="list">
          <qk-drop-item name="1">驴打滚</qk-drop-item>
          <qk-drop-item>炸酱面</qk-drop-item>
        </qk-drop-menu>
      </qk-drop>
    
    <h1>click方式</h1>
     <qk-drop trigger="click">
        下拉菜单 (默认)<qk-icon class="qk-icon-arrow-down"></qk-icon>
        <qk-drop-menu slot="list">
          <qk-drop-item name="1">驴打滚</qk-drop-item>
          <qk-drop-item>炸酱面</qk-drop-item>
          <qk-drop-item disabled>豆汁儿</qk-drop-item>
          <qk-drop-item>冰糖葫芦</qk-drop-item>
          <qk-drop-item divided>北京烤鸭</qk-drop-item>
        </qk-drop-menu>
      </qk-drop>
  </div>
</template>

<script>
export default {
  methods: {
    hoverClick(n) {
      console.log("n :>> ", n)
    },
  },
}
</script>

<style></style>
