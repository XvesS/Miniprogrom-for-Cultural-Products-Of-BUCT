// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    products_data:'',
    typedata:''
  },
  onClose(){
    this.setData({
      show:false,
    })
  },
  onclick(){
    this.setData({
      show:true
    })
  },
  ontap(e){
    var index = e.currentTarget.dataset.index;
    var typedata =  this.data.products_data.products_specification[index];
    this.setData({
      typedata
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data=JSON.parse(options.data);
    var typedata ={};
    typedata.pic = data.products_pic[0];
    this.setData({
      products_data:data,
      typedata
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