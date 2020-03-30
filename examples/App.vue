<template>
  <div id="app">
    <h1>按钮</h1>
    <qk-button>默认</qk-button>
    <qk-button disabled type="primary">禁用</qk-button>
    <qk-button type="primary">primary</qk-button>
    <qk-button type="success">成功</qk-button>
    <qk-button type="warning">警告</qk-button>
    <qk-button type="error">危险</qk-button>
    <qk-button type="text">link</qk-button>
    <qk-button type="primary" size="small">小</qk-button>
    <qk-button type="primary" size="large">大</qk-button>
    <qk-button size="large" shape="circle">圆角</qk-button>
    <qk-button long>长</qk-button>
    <qk-button-group shape="circle" size="large">
      <qk-button type="success">成功</qk-button><qk-button>成功</qk-button
      ><qk-button type="warning">成功</qk-button><qk-button>成功</qk-button>
      <qk-button type="error">成功</qk-button>
    </qk-button-group>
    <h1>栅格</h1>
    <qk-row>
      <qk-col :span="12">
        <div style="background-color:#B5FFC0">12</div>
      </qk-col>
      <qk-col :span="12">
        <div style="background-color:#99CFE8">12</div>
      </qk-col>
    </qk-row>
    <h1>gutter使用</h1>
    <qk-row :gutter="8" style="margin-top:10px;">
      <qk-col :span="8">
        <div style="background-color:#B5FFC0;">8</div>
      </qk-col>
      <qk-col :span="8">
        <div style="background-color:#99CFE8">8</div>
      </qk-col>
      <qk-col :span="8">
        <div style="background-color:#B5FFC0">8</div>
      </qk-col>
    </qk-row>
  </div>
</template>

<style></style>
