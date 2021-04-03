// pages/goodlist/goodlist.js
var request = require('../../utils/https.js')
var uri = 'goods/api/goodslist' //商品列表的的uri
var app = getApp();
var id = '';
var navlist = [
    { id: " ", title: "综合", icon: "" },
    { id: "salenum", title: "销量", icon: "" },
    { id: "goodsStorePrice", title: "价格", icon: "../../images/pop_select_pray.png" },
    { id: "shaixuan", title: "筛选", icon: "../../images/list_sx.png" },
];
Page({

  /**
   * 页面的初始数据
   */
  data: {

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