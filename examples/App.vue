<template>
  <div id="app">
    <h1>按钮</h1>
    <qk-button @click="openNotice">默认</qk-button>
    <qk-button disabled type="primary">禁用</qk-button>
    <qk-button type="primary">primary</qk-button>
    <qk-button type="success">成功</qk-button>
    <qk-button type="warning">警告</qk-button>
    <qk-button type="info">信息</qk-button>
    <qk-button type="error">失败</qk-button>
    <qk-button type="text">link</qk-button>
    <qk-button type="primary" size="small">小</qk-button>
    <qk-button type="primary" size="large">大</qk-button>
    <qk-button size="large" shape="circle">圆角</qk-button>
    <qk-button long>长</qk-button>
    <qk-button-group shape="circle" size="large" vertically>
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
    <div style="width:455px">
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
    <h1>input</h1>
    <div style="margin-bottom:30px">
      <qk-input type="text"> </qk-input>
      密码
      <qk-input type="password"></qk-input>
      <qk-input type="text" placeholder="请输入">
        <template slot="append">\(^o^)/</template>
      </qk-input>
      <qk-input type="text">
        <template slot="before">\(^o^)/</template>
      </qk-input>
      <qk-input type="text" show-word-limit maxlegth="210" v-model="input1">
        <template slot="before">\(^o^)/</template>
        <template slot="append">1</template>
      </qk-input>

      <qk-input type="text" size="small"> </qk-input>
      <qk-input
        type="text"
        size="large"
        show-word-limit
        maxlegth="210"
        v-model="input1"
      >
      </qk-input>
      <qk-input
        type="textarea"
        :autosize="{ minRow: 4, maxRow: 8 }"
        placeholder="说说你的想法吧..."
      >
      </qk-input>

      <h1>radio | group</h1>

      <qk-radio label="2" v-model="radio1" size="small">小按钮</qk-radio>
      <qk-radio label="2" v-model="radio1">默认按钮</qk-radio>
      <qk-radio label="2" v-model="radio1" size="large">大按钮</qk-radio>
      <qk-radio label="2" v-model="radio1" disabled border>带边框</qk-radio>
      <qk-radio-group v-model="radio" vertical>
        <qk-radio label="1">按钮组1</qk-radio>
        <qk-radio label="2">按钮组2</qk-radio>
      </qk-radio-group>
      <qk-radio-group v-model="radio" type="button">
        <qk-radio label="1">按钮组1</qk-radio>
        <qk-radio label="2">按钮组2</qk-radio>
        <qk-radio label="3">按钮组3</qk-radio>
      </qk-radio-group>
      <!-- <qk-radio label="2" v-model="radio">cs1</qk-radio> -->

      <h1>checkbox | group</h1>
      <qk-checkbox v-model="checkbox1">常规</qk-checkbox>
      <qk-checkbox v-model="checkbox1" size="large">大</qk-checkbox>
      <qk-checkbox v-model="checkbox1" size="small" disabled>小</qk-checkbox>
      <h3>group</h3>
      <qk-checkbox-group v-model="checkbox2">
        <qk-checkbox label="香蕉">香蕉</qk-checkbox>
        <qk-checkbox label="苹果">苹果</qk-checkbox>
      </qk-checkbox-group>
      {{ checkbox2 }}

      <h1>number</h1>
      <qk-number v-model="numbers"></qk-number>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input1: "",
      radio: "",
      radio1: "",
      checkbox1: "",
      checkbox2: [],
      numbers: 0,
    }
  },
  mounted() {},
  methods: {
    testChange(vale) {
      console.log("object :", vale)
    },
    openNotice() {
      this.$qkNotice.error({
        title: "测试",
        desc: "无滴滴滴",
        duration: 0,
      })
    },
  },
}
</script>
<style></style>
