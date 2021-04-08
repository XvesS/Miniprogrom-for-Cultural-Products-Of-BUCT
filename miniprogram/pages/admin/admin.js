// pages/admin/admin.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    admindata:'',
    deleteAdmian:[],
  },
  onClose(e){
    const userID = app.globalData.userID;
    const SurperM=app.globalData.SurperM;
    const that = this;
    if(userID&&SurperM.includes(userID)){
        wx.showModal({
          title: '确定删除此管理员？',
          success (res) {
            if (res.confirm) {
              that.confirmDel(e);
            } 
          }
        })
    }else{
      wx.showToast({
        title: '您没有权限删除！',
        icon:'error',
        duration: 2000
      })
    }
  },
//确定删除
  confirmDel(e){
    var index = e.currentTarget.dataset.index;
    var oldlist = this.data.admindata;
    var del = this.data.deleteAdmian;
    del.push(oldlist[index].user_id);//加入删除的openid
    oldlist.splice(index,1);//删除一个元素
    //重新渲染页面
    this.setData({
      admindata:oldlist,
      deleteAdmian:del
    })
  },

  getAdmin(){
      wx.cloud.callFunction({
        name:'get_admin'
      }).then(res=>{
        var data = res.result.data;
        this.setData({
          admindata:data
        })
      })
  },
  delAdmin(){
    wx.cloud.callFunction({
      name:'del_admin',
      data:{
        delarr:this.data.deleteAdmian
      }
    })
  },
  onClickButton(){
    wx.navigateTo({
      url:'../Addadmin/Addadmin'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdmin()
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
    this.delAdmin()
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