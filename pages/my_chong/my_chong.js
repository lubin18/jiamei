// pages/chongzhi/index.js
var num = 0;
Page({
  data: {
    cards: [],
    zhi:'',
    // selects: ['选择1', '选择2', '选择3', '选择4'],
    // yanse:'green',
    // clickId: -1,
    // buttons: [
    //   { id: 1, name: '银色' },
    //    { id: 2, name: '白色' },
    //     { id: 3, name: '黑色' }
    //   ],
    msg: '',
  },
  /**
   * 页面的初始数据
   */
 
  // checkButtonTap: function (e) {
  //   console.log(e)
  //   let id = e.currentTarget.dataset.id
  //   console.log(id)
  //   for (let i = 0; i < this.data.buttons.length; i++) {
  //     console.log(this.data.buttons[i])
  //     if (this.data.buttons[i].id == id) {
  //       if (this.data.buttons[i].checked == true){
  //         console.log('识别已经有颜色了让其去色')
  //         this.data.buttons[i].checked = false;
  //       } else {
  //         console.log('识别没有颜色让其着色')
  //         this.data.buttons[i].checked = true;
  //       }
  //     }
  //   }
  //   this.setData({
  //     buttons: this.data.buttons,
  //     msg: "id:" + id
  //   })

  // },
  formSubmit: function (e) {
    console.log(e)
  },
  jiner:function(e){
    console.log(e.detail.value)
    this.setData({
      zhi:Number(e.detail.value)
    })
  },
  goumai: function (e) {
    // console.log(e)
    console.log(e._relatedInfo.anchorRelatedText)

  },
  onLoad: function (e) {
    // this.data.buttons[0].checked = true;
    // this.setData({
    //   buttons: this.data.buttons,
    // })


    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c21e336c96cca79a56f847f/example/mock',
      method: "GET",
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res)
        var date1 = res.data.data.projects8;
        that.setData({
          cards: date1,
        })
      },
      fail: function () {
        console.log("接口调用失败");
      },

    })
  },
  
})