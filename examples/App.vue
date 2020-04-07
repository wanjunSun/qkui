<template>
  <div id="app">
    <h1>按钮</h1>
    <qk-button>默认</qk-button>
    <qk-button disabled type="primary">禁用</qk-button>
    <qk-button type="primary">primary</qk-button>
    <qk-button type="success">成功</qk-button>
    <qk-button type="warning">警告</qk-button>
    <qk-button type="error">失败</qk-button>
    <qk-button type="text">link</qk-button>
    <qk-button type="primary" size="small">小</qk-button>
    <qk-button type="primary" size="large">大</qk-button>
    <qk-button size="large" shape="circle">圆角</qk-button>
    <qk-button long>长</qk-button>
    <qk-button-group shape="circle" size="large">
      <qk-button type="success">成功</qk-button><qk-button>默认</qk-button
      ><qk-button type="warning">警告</qk-button><qk-button>默认</qk-button>
      <qk-button type="error">失败</qk-button>
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
    <h1>tag</h1>
    <qk-tag>默认</qk-tag>
    <qk-tag size="small">小</qk-tag>
    <qk-tag closable>关闭</qk-tag>
    <qk-tag type="success">成功</qk-tag>
    <qk-tag type="warning">警报</qk-tag>
    <qk-tag type="error">失败</qk-tag>
    <h1>alert</h1>
    <qk-alert type="success">这是成功提醒</qk-alert>
    <qk-alert type="error">这是错误提醒</qk-alert>
    <qk-alert type="warning">这是警告提醒</qk-alert>
    <qk-alert type="info">这是消息提醒</qk-alert>

    <qk-alert type="success" closable>有关闭</qk-alert>
    <qk-alert type="success" showIcon>有icon</qk-alert>
    <qk-alert type="error" showIcon>有icon</qk-alert>
    <qk-alert type="warning" showIcon>有icon</qk-alert>
    <qk-alert type="info" showIcon>有icon</qk-alert>

  </div>
</template>

<style></style>
