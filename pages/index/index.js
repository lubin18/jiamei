//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    appid: app.globalData.appid,
    secret: app.globalData.secret,
    token: app.globalData.token,
    openid: '', 
    isHide: true, 
    hasUserInfo: false,
    hasphone: false,
    canIUsep: wx.canIUse('button.open-type.getPhoneNumber'),
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    telephone:'',
    paomatext:'目前微信商城在测试阶段，如有需要请咨询客服！！',
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    size: 28,
    orientation: 'left',//滚动方向
    interval: 10, // 时间间隔

    banner:{
      urlimg: [],
      indicatorDots: false,
      autoplay: true,
      interval: 4000,
      duration: 500,
      circular: true
    } ,
    zuo:'',
    you: '',
    chang: '',
    goods_cat:[],
    winHeight:'',
    currentTab:0,
    goods_list:[],
    // page:0,
    isdata: true,
    page: 1,	//商品页码
    noMoretip: false,    //false为有更多数据，true为数据加载完毕

  },
  onShow:function(){
    // 页面显示 
      // wx.hideTabBar();
    
    var that = this;
     var unionId = wx.getStorageSync('unionid');
    if (unionId != '') {
      that.setData({
        isHide:false
      })
    } else {console.log('8888') }
    //首页数据接口调用
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=index',
      method: 'GET',
      data:{
        token:'rkplnp1552879213'
      },
      success:function(e){
        console.log(e)
        console.log(e.data.data.zuo_img[0].img)
        that.setData({
          urlimg: e.data.data.lunbo_img,
          zuo: e.data.data.zuo_img[0].img,
          you: e.data.data.you_img[0].img,
          chang: e.data.data.chang_img[0].img,
          goods_cat: e.data.data.goods_cat,
          // data_id:
        })
      }
    })
    that.getGoodList();
    // wx.request({
    //   url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=catgoods',
    //   method: 'GET',
    //   data: {
    //     token: 'rkplnp1552879213',
    //     page:1
    //   },
    //   success: function (e) {
    //     console.log(e)
    //     that.setData({
    //       goods_list: e.data.data,
    //     })
    //   }
    // })

    var length = that.data.paomatext.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth*0.92*0.8;// 屏幕宽度
    that.setData({
      length: length,
      windowWidth: windowWidth,
    });
    that.runMarquee();// 水平一行字滚动完了再按照原来的方向滚动
  },

  runMarquee: function () {
    var that = this;
    var interval = setInterval(function () {
      if (-that.data.marqueeDistance < that.data.length) {
        that.setData({
          marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        that.setData({
          marqueeDistance: that.data.windowWidth
        });
        that.runMarquee();
      }
    }, that.data.interval);
  },
// 禁止滑动
  stopTouchMove:function(){
    return false
  },
  // table选项卡点击筛选
  swichNav:function(e){
    var that = this;
    console.log(e)
    var cur = e.target.dataset.current;
    var id = e.target.dataset.id;
    console.log(this.data.currentTab,666)
    console.log(id, 'id')
     wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=catgoods',
      method: 'GET',
      data: {
        token: 'rkplnp1552879213',
        catid:id,
        page:1
      },
      success: function (e) {
        console.log(e,666)
        console.log(e.data.data)
        that.setData({
          goods_list: e.data.data,
        })
      }
    })


    if (this.data.currentTab==cur){
      return false;
    }else{
      // wx.showLoading({
      //   title: '加载中',
      // })
      this.setData({
        currentTab:cur,
        data_id:id
      })
      // setTimeout(function () {
      //   wx.hideLoading()
      // }, 2000)
    }

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 页面初次加载，请求第一页数据
    //this.getGoodList(); //请求列表

    var that = this//不要漏了这句，很重要
    //  高度自适应
    wx.getSystemInfo({
      success: function (res){
        // console.log(res,'122')
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        })
      }
    })
    
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('自行检查')
          wx.getUserInfo({
            success: function (res) {
              wx.showTabBar();
              that.setData({
                isHide: false
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      //用户按了允许授权按钮
      console.log('点击授权手机号')
      var opid = wx.getStorageSync('openid')
      var session_key = wx.getStorageSync('session_key')
      wx.request({
        url: 'https://yx.lingdie.com/app/WechatUserInfo',//后台地址
        method: 'POST',
        data: {
          code: app.globalData.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          session_key: session_key
        },
        success: function (ret) {
          console.log(ret, '利用getuserinfo获取phone')
          console.log(ret.data.purePhoneNumber, 'phone初次点击获取')
          that.setData({
            telephone: ret.data.purePhoneNumber,
            // xs1: 2,
            // disabled:true,
            hasphone: true
          })
          wx.setStorageSync('telephone', (ret.data.purePhoneNumber));
          // app.globalData.gmobi = ret.data.purePhoneNumber;
          // console.log(app.globalData.gmobi,'shoujihao')
        },
        fail: function (ret) {
          console.log('获取手机信息失败')
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo){
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo,'666');
      var session_key = wx.getStorageSync('session_key')
      wx.request({
        url: 'https://yx.lingdie.com/app/WechatUserInfo',//后台地址

        method: 'POST',
        data: {
          code: app.globalData.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          session_key: session_key
        },
        success: function (ret) {
          console.log(ret, '利用getuserinfo获取unionid')
          console.log(ret.data.unionId, 'unionid初次点击获取')
          var unionId = ret.data.unionId;
          wx.setStorageSync('unionid', unionId)
          
        },
        fail: function (ret) {
          console.log('获取用户信息失败')
        }
      })
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      // wx.showTabBar();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  

  getGoodList: function () {
    wx.showLoading({
      title: '加载中',
    })
    var page = this.data.page; //获取页码
    var that = this;
    // 发起请求，获取列表列表
    console.log(page,'page')
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=catgoods',
      method: 'GET',
      data: {
        token: 'rkplnp1552879213',
        page: page
      },
      success: function (e) {
        console.log(e,'e')
        if (e.data.pages>8){

        }
        that.setData({
          goods_list: e.data.data,
          })
        // if (e.data.ec == 200) {
        //   console.log(e.data.ec, 'ec')

        //   var allArr = [];
        //   var initArr = that.data.goodList ? that.data.goodList : [];  //获取已加载的商品
        //   var newArr = e.data.data.goods;	
        // console.log(newArr,'arrary')
        // 			//获取新加载的商品
        //   var lastPageLength = newArr.length;  			//新获取的商品数量
        //   if (page <= 0) {									//如果是第一页
        //     allArr = e.data.data.goods;
        //   } else {
        //     allArr = initArr.concat(newArr);		//如果不是第一页，连接已加载与新加载商品
        //   }
          // if (lastPageLength < 10) {           //如果新加载的一页课程数量小于10，则没有下一页
          //   that.setData({
          //     noMoretip: true,
          //   });
          // }
          // that.setData({
          //   goodList: allArr,
          // })
        // } else {
        //   console.log('shibai')
        //   // wx.showToast({
        //   //   // title: e.data.em, 	 //错误信息
        //   //   icon: 'none',
        //   //   duration: '2000'
        //   // })
        // }

      },
      fail: function () {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    var page = this.data.page;  //获取现在页码
    if (!this.data.noMoretip) {
      page++
      this.setData({			//页码加一，调用函数，获取下一页内容
        page: page
      })
      this.getGoodList();
    }
  }
})
