// pages/shop/shops.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showclass:false,
    result:'',
    fileList:'',
    /******先别动*****/
    productsData:''
  },
  onChange(event){
    this.setData({
      result:event.detail
    })
  },
  onclickplus(){
    var name = 'guige'+(this.data.numGUIge.length+1);
    var newlist = this.data.numGUIge.concat(name);
    this.setData({
      numGUIge:newlist
    })
  },
  onchoose(){
      this.setData({
        showclass:true
      })
  },
  onClose(){
    this.setData({
      showclass:false
    })
  },
toproDetail(e){//跳转到其他页面
  // console.log(e)
  var index = e.currentTarget.dataset.index;
  var isedit = e.currentTarget.dataset.isedit;
  var data = this.data.productsData[index];
  var str=JSON.stringify(data);
  console.log(data)
  if(isedit){//商品编辑界面
    wx.redirectTo({
      url:'../editproduct/editproduct?productsData='+str,
    })
  }else{//商品展示页面
    wx.navigateTo({
      url: '../detail/detail?productsData=' + str,
    })
  }
},
getproDucts(){
  wx.cloud.callFunction({
    name:'get_products',
    data:{
      paramter:1
    }
  }).then(res=>{
    var data = res.result.list[0].goodsList;
    this.setData({
      productsData:data
    })
  })
},
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getproDucts()
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