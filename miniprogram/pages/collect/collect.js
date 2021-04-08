// pages/collect/collect.js
Page({
  data: {
    curNav: "0",
    lists: [],
        orderList: [
          {
            shopImg: "../../images/cart.jpg",
            shopTitle: "大鹅周边",
            shopSelectInfo: "颜色分类:红色",
            shopPrice: "9.9",
            shopId: 1,
          },
          {
            shopImg: "../../images/cart.jpg",
            shopTitle: "文具",
            shopSelectInfo: "颜色分类:卡黄色;尺码:均码 ",
            shopPrice: "19.9",
            shopId: 2,
          },
          {
            shopImg: "../../images/cart.jpg",
            shopTitle: "服饰",
            shopSelectInfo: "颜色分类：灰色；尺码：均码",
            shopPrice: "29.9",
            shopId: 10,
          },
          {
            shopImg: "../../images/cart.jpg",
            shopTitle: "日用品",
            shopSelectInfo: "颜色分类:红色;尺码:均码",
            shopPrice: "18.00",
            shopId: 1,
          }
        ],
  },
  onItemClick:function(e){

   wx.navigateTo({
    // url: '../detail/detail?id="shopId"',
     url: '../detail/detail',
     success: (result) => {},
     fail: (res) => {},
     complete: (res) => {},
   })
  },
  switchTab: function(e) {
  },
  onLoad: function() {
    this.setData({
      curNav: 0,
    });
  },
  /*onShow: function() {
    var self = this;
    var self  = self,
        info  = order_detail.data;
    info.forEach(function(value){
      value.timer = common.formatTime(new Date(value.orderTime), "yyyy-MM-dd hh:mm");
    });
    self.setData({
      order: info
    });
  },*/
  getDetail: function(e) {

  },
  goPay: function() {

  },
  //取消收藏
  canclecollect:function(e){
    /*wx.showModal({
      content: '你确定取消收藏该商品',
      showCancel: true,
      success: (res) => {
        if(res.confirm == 0) {
          return;
        }
       else{*/
        var lists= this.data.orderList;
        const index = e.currentTarget.dataset.index;
        lists.splice(index, 1); // 删除这个商品
        this.setData({
          orderList: lists
        });
      }
     //  }
 // })
//}
})