// pages/addmanager/addmanager.js
Page({
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

  },
  //用户名
  user_name_input_focus:function(input){
    var content = input.detail.value;
    if(content.length == 11){
      this.setData({
        pass_focus:true
      })
    }
    this.setData({
      user_name:input.detail.value,
    })
  },
//密码
  pass_word_input_focus:function(input){
    if( input.detail.value.length >= 4){
      wx.hideKeyboard()
    }
    this.setData({
      user_pass:input.detail.value,
    })
  },
//

})