var app = getApp()
Page({
  data: {
    currentTab: 0  //tab四个标题的索引
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    console.log('滑动')    
    console.log(e)
    that.setData({
      currentTab: e.detail.current//设置标题索引
    });

  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    console.log('点击')   
    console.log(e)
    if (this.data.currentTab == e.target.dataset.current) {
      console.log('相等')
      return false;
    } else {
      console.log(this.data.currentTab)//0  1 1 2 上一个停留标题的索引
      console.log(e.target.dataset.current)//1  0 2 3 标题的索引
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})