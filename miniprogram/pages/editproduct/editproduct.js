// pages/editproduct/editproduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showpop:false,
    isdisable:true,
    info:"修改"
  },
clikthis(){
this.setData({
  showpop:true
})
},
tofix(){
  if(this.data.info == '修改')
    var info = "确定"
  else
    info = "修改"
  this.setData({
    isdisable:!this.data.isdisable,
    info
  })
},
onClose(){
  this.setData({
    showpop:false
  })
  console.log('h');
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