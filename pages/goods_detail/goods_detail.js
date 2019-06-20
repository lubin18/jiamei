// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'【自体脂肪丰苹果肌】',
    num:1,
    kucun:5,
    hide:true,
    hideup:false,
    hidedown: true,
    currentTab:2

  },
  dianji:function(e){
    this.setData({
      hidedown: !(this.data.hidedown),
      hideup: !(this.data.hideup),
      hide: !(this.data.hide)
    })
  },
  jian: function (e) {
    console.log("刚刚您点击了减1");
    var num = this.data.num;
    // 总数量-1  
    if (num >1) {
      this.data.num--;
    }
    // 将数值与状态写回  
    this.setData({
      num: this.data.num
    });
  },
  jia: function (e) {
    console.log("刚刚您点击了加1");
    var num = this.data.num;
    // 总数量+1  
    if (num < this.data.kucun) {
      this.data.num++;
    }
    // 将数值与状态写回  
    this.setData({
      num: this.data.num
    });
  },
  clickTab:function(e){
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  swiperTab:function(e){
    this.setData({
      currentTab: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //动态修改页面标题
    wx.setNavigationBarTitle({
      title: this.data.title
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