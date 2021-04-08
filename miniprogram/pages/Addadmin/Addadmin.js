// pages/Addadmin/Addadmin.js
var app = getApp();
Page({
  data: {
    searchData:''
  },
onCancel(){
  this.setData({
    searchData:''
  })
},
changeUserStatus:function(Userdata,item){
  console.log(Userdata);
    wx.showLoading({
      title: '正在添加',
      mask:true
    })
    Userdata.user_status=item;
    wx.cloud.callFunction({
      name:'update_userinfo',
      data:{
        Userdata:Userdata
      }
    }).then(res=>{
      wx.hideLoading();
    })
  },

clickthis(e){
  var index = e.currentTarget.dataset.index;
  var userdata = this.data.searchData[index];
  if(userdata.user_status!='普通会员'){
    wx.showToast({
      title: '已是'+userdata.user_status,
      duration:2000,
      icon:'error'
    })
  }else{
    const userID = app.globalData.userID;
    const SurperM=app.globalData.SurperM;
    const that =this;
    var mtext = 'searchData['+index+'].user_status';
    if(SurperM.includes(userID)){
          wx.showActionSheet({
            itemList: ['管理员', '超级管理员'],
            success (res) {
              var List=['管理员', '超级管理员']
              var item = List[res.tapIndex]
              console.log(item)
              that.changeUserStatus(userdata,item);//添加
              that.setData({
                [mtext]:item
              })
            },
          })
      }else{
        wx.showModal({
          title: '确定添加？',
            success (res) {
              if (res.confirm) {
                changeUserStatus(userdata,'管理员');
                that.setData({
                  [mtext]:'管理员'
                })
              } 
            }
        })
      }

  }
},

onSearch(e){
  var sData = e.detail;
  this.getinfo(sData);
},
getinfo(name){
  wx.cloud.callFunction({
    name:'get_search',
    data:{
      table:'user_table',
      name:name,
      searchitem:'user_name'
    }
  }).then(res=>{
    var rData = res.result.data;
    this.setData({
      searchData:rData
    })
  })
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