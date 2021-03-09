Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
 
  search(value){
      return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
          name:"get_products_name",
          data:{
            value,
          }
        }).then(res=>{
          var data = res.result.data;
          data.forEach(elemt=>{
            elemt.text = elemt.products_name;
          })
          resolve(data)
        })
      })
  },
  selectResult(e){
    var data = e.detail.item;
    //路由去其他页面
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
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