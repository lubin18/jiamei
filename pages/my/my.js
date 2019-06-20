// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    style:'../images/jinka.png',
    list1:[]
  },
  /**
   * 头像和昵称
   */
  onGotUserInfo: function (e) {
    console.log(e)
    // console.log("nickname=" + e.detail.userInfo.nickName);
    // console.log(e)
  },
  /**
   * 二维码弹出于消失
   */
  show:function(){
    console.log(66666)
    this.setData({ flag:false})
  },
  hide: function () {
    this.setData({ flag: true })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c21e336c96cca79a56f847f/example/mock',//这个地址好像只能https的
      method: "GET",
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res);
        // console.log(res.data)
        // console.log(res.data.data.projects)
        // console.log(res.data.data.projects2)
        var date1 = res.data.data.projects;
        var date2 = res.data.data.projects2;
        var date3 = res.data.data.projects3;
        var date4 = res.data.data.projects4;
        // var date5 = res.data.data.projects8;
        that.setData({
          list1: date1,
          list2: date2,
          list3: date3,
          list4: date4,
          // cards: date5,
        })
      },
      fail: function () {
        console.log("接口调用失败");
      }
    })
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