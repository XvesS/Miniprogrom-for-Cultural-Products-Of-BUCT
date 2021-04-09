// pages/manageShop/manageShop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    shopList:'',
    searchShop:''
  },
  pass(e){
    var index = e.currentTarget.dataset.index;
    var mtext = 'shopList['+index+'].shop_status';
    this.setData({
      [mtext]:true
    })
  },
  refuse(e){
    var index = e.currentTarget.dataset.index;
    //给申请人发送信息
  },
  getshopList(){
    const that = this;
    wx.cloud.callFunction({
      name:'get_shop',
      data:{
        para:1
      }
    }).then(res=>{
      var data = res.result.data;
        that.setData({
          shopList:data
        })
    })
  },
  onSearch(e){
    const that = this;
    var searchData = e.detail;
    wx.cloud.callFunction({
      name:'get_shop',
      data:{
        para:2,
        name:searchData
      }
    }).then(res=>{
      var data = res.result.data;
      if(!data.length){
        wx.showToast({
          title: '未查询到！',
          icon:'none'
        })
      }else{
      that.setData({
        searchShop:data
      })
      }
    })
  },
  todown(e){
    const that=this;
    var index = e.currentTarget.dataset.index;
    var status = this.data.searchShop[index].shop_status;
    if(status){
      wx.showModal({
        title:"确定下架？",
        success (res) {
          if (res.confirm) {
            var text = 'searchShop['+index+'].shop_status'
            that.setData({
              [text]:false
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '已下架',
        icon:'error'
      })
    }
  },
  toshop(e){
    var index = e.currentTarget.dataset.index;
    var from =e.currentTarget.dataset.from;
    if(from == 1) var data = this.data.shopList[index];
    else var data = this.data.searchShop[index];
    var str = JSON.stringify(data);
    //导航去其他页面(店铺详情)
    wx.navigateTo({
      url: 'url'+str,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getshopList();
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