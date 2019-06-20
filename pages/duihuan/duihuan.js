// pages/duihuan/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    disabled: false,
    loading: false,
    toastHidden: true,
    money:888888,
    money1:'',
    areavalue:'',
    value1:999,
    voteTitle:null,
    inputvalue1: '',//线下奖励金输入值
    inputvalue2: '',//兑换增值奖励金输入值
    inputvalue: ''//联动后折合增值金值
  },
  quzhi1: function (e) {
    this.data.money1=e.detail.value;
    console.log(e)
  },
  areazhi: function (e) {
    this.data.areavalue = e.detail.value;
    console.log(e)
  },

//线下兑换
  duihuan1: function (e) {
    var that=this
    var money1 = Number(that.data.money1)
    var areavalue = Number(that.data.areavalue)
//input输入兑换奖励金的逻辑判断
    if (money1 =='') {
      wx.showToast({
        title: '请输入奖励金',
        icon: 'none',
        duration: 2000,
      })
    } else if (money1<=0){
      wx.showToast({
        title: '输入正确奖励金1',
        icon: 'none',
        duration: 2000,
      })
    } else if (money1>that.data.value1) {
      wx.showToast({
        title: '输入正确奖励金2',
        icon: 'none',
        duration: 2000,
      })
    } else if (areavalue == '') {
      wx.showToast({
        title: '请填写附加信息',
        icon: 'none',
        duration: 2000,
      })
    }else{
      wx.showLoading({
        title: '',
      })
      wx.hideLoading()
      wx.showToast({
        title: '兑换成功',
        icon: '',
        image: '../images/yanzhengma.png',
        duration: 3000,
        success: function (e) {
          console.log('兑换成功')
        }
      })
    }
  },
  
  // 奖励金与增值金的联动
  liandong: function (e) {
    console.log(e)
    this.data.inputvalue2 = e.detail.value
    if (e.detail.value >= 0) {
      this.setData({
        inputvalue: e.detail.value
      })
    }
  },
  duihuan2: function (e) {
    var that=this
    var inputvalue = Number(that.data.inputvalue)
    var inputvalue2 = Number(that.data.inputvalue2)
    console.log(inputvalue2)
    console.log(that.data.money)

    if (inputvalue2 == '') {
      wx.showToast({
        title: '请输入奖励金',
        icon: 'none',
        duration: 2000,
      })
    } else if (inputvalue2 > that.data.money){
      wx.showToast({
        title: '超过余额',
        icon: 'none',
        duration: 2000,
      })
    } else if (inputvalue2 <= 0) {
      wx.showToast({
        title: '请输入正确奖励金',
        icon: 'none',
        duration: 2000,
      })
    }else{
      // this.setData({
      //   disabled: true,
      //   loading: true
      // })
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    }
  
     
     
    
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  toastBtn: function (e) {
    this.setData({
      toastHidden: false
    })
  },
  toastchange: function (e) {
    this.setData({
      toastHidden: true
    })
  },
  toastBtn3: function () {
    // wx.showToast({
    //   title:'成功显示',
    //   icon:'success',
    //   duration:2000
    // })
    // wx.showToast({
    //   title: '成功显示',
    //   icon: 'none',
    //   duration: 2000
    // })
    wx.showToast({
      title: '提现中',
      icon: 'loading',
      duration: 13000
    })

  },
  toastBtn4: function () {
    console.log('点击一次隐藏toast')
    wx.hideToast()
  },

  


  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      console.log('6666')
      this.setData({
        scrollLeft: 300
      })
    } else {
      console.log('77777')

      this.setData({
        scrollLeft: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // function f1() {
    // let n = 5;
    // if (true) {
    //   let n = 10;
    //   console.log(n);
    // }
    // console.log(n); // 5
    // console.log(new Date(2016, 11, 19).getTime())
    // // }
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        // console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  // footerTap: app.footerTap
})