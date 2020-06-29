<template>
  <div>
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
  </div>
</template>
