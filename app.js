//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        this.globalData.code = res.code;
        var appid = this.globalData.appid//appid需自己提供，此处的appid我随机编写
        var secret = this.globalData.secret//secret需自己提供，此处的secret我随机编写
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;//登录凭证
        // console.log(code,'code')
        // console.log(appid, 'appid')
        // console.log(secret, 'secret')

        if (code) {
          //发送请求
          wx.request({
            url: 'https://yx.lingdie.com/app/getjscode/' + appid + '/' + secret + '/' + res.code,

            method: 'POST',
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (data) {
              wx.setStorageSync('session_key', data.data.session_key);
              var session_key = data.data.session_key
              var unionid = wx.getStorageSync('unionid')
              var telephone = wx.getStorageSync('telephone')
              console.log(unionid, 'unionid')
              console.log(telephone, 'telephone')
              if (unionid == '') {
                console.log(unionid,'unionid为空')
                // wx.getUserInfo({
                //   success: function (res) {
                //     console.log(res, 'getuserinfo1')
                //   }
                // })
              } else {
                console.log('有unioid')
                // wx.setStorage({
                //   openid: data.data.openid,
                //   unionid: unionid,
                //   key: 'suiji'
                // });

              }

            }
          })

        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        this.globalData.code = res.code;
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    code:'',
    appid: 'wx91dcdb20f1c8d9e7',
    secret: 'd7911f0c7be7b8b0ec1f70236aa15072',
    token:'rkplnp1552879213'
  },
  // ajax封装
  ajaxData: function (url, data, method, callBack) {
    var that = this;
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        //console.log(res);
        // setTimeout(function () {
        //   wx.hideLoading()
        // }, 500)
        callBack(res);
      },
      fail: function (res) {
        console.log(4)
        wx.showToast({
          title: '网络开了小差~',
        })
      },
      complete: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 200)
      }
    })
  },
})