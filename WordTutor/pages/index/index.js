//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    scrollHeight: ''
  },
  onLoad: function () {
      var that = this
      // 获取设备高度
      wx.getSystemInfo({
          success: function (res) {
              that.setData({
                  scrollHeight: res.windowHeight - 90
              });
          }
      });
  }
})
