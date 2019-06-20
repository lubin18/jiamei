// pages/yangzhiguan/yangzhiguan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentab:0,
    bottom:110,
    show:true,
    aniStyle:""
  },
  swichNav:function(e){
    var cur = e.target.dataset.current;
    this.setData({
      currentab:cur
    })
  },
  onPageScroll(e) {
    console.log(e.scrollTop)
    if (e.scrollTop>=20){   
      this.setData({
        aniStyle: 'slidedown',
        show:false,
       
      })
    }else{
      this.setData({
        show: true,
        aniStyle:'slideup'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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