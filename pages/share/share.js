// pages/share/share.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'',
    appid: app.globalData.appid,
    secret: app.globalData.secret,
  },
  accessTokenFn: function (e) {
    var that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=appid&secret=secret',
      data: {

      },
      success: function (res) {
        var access_token = res.data.access_token;

        // 获取二维码
        wx.request({
          url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + access_token,
          method: 'POST',
          responseType: 'arraybuffer',//这个是转化成base64需要加的
          data: {
            scene: 'a',//你的参数
            page: 'pages/index/index',
            width: '200',
          },
          success: function (res) {
            console.log(res)

            //这个是转化成base64（因为微信官方返回给我们的会被解析成乱码）
            that.setData({ imgUrl: wx.arrayBufferToBase64(res.data) })
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '请稍后重试',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {

                }
              }
            })
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '请稍后重试',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {

            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取access_token
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})