Page({
  data: {
    dataobj:"",
    hot:""
  },
  onLoad: function (options) {
    
    wx.cloud.callFunction({
      name:"get_products_new"
    }).then(res=>{
      this.setData({
       dataobj:res.result.list
      })
    })
    wx.cloud.callFunction({
      name:"get_products_hot"
    }).then(res=>{
      this.setData({
        hot:res.result.data
      })
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