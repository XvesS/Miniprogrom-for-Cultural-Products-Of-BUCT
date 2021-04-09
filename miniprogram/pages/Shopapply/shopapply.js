// pages/Shopapply/shopapply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopapply:[
      {shopId:'001',
        shopName:'一号',
        shopNumber:12300001230,
        shopTip:'大鹅周边',
        shopImg:'../../images/cart.jpg',
        applyTime:'2021/03/22'
      },
      {shopId:'002',
      shopName:'二号',
      shopNumber:12300001231,
      shopTip:'文具',
      shopImg:'../../images/cart.jpg',
      applyTime:'2021/03/31'
      },
    ]

  },
  button1:function(){
    wx.pageScrollTo({
      scrollTop: 0
    });
  },
  button2:function(){
    wx.pageScrollTo({
    scrollTop:200
    })
  },
  register:function(){

  },
  canclecontri:function(e){
    var lists= this.data.shopapply;
    const index = e.currentTarget.dataset.index;
    lists.splice(index, 1); // 删除这个商品
    this.setData({
      shopapply: lists
    });
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