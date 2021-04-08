// pages/productlist/productlist.js
var order_detail = {
  "data": [
    {
      "buyNums": 1,
      "orderList": [
        {
          "buyNum": 2,
          "goodsImg": "../../images/cart.jpg",
          "goodsName": "列表商品",
          "goodsStandardDes": "颜色：红色  尺码：s",
          "sellPrice": 25,
          "shopId": 1,
        }
      ],
      "orderNum": "abc2511483687801946",
      "orderStatusStr": "待付款",
      "orderTime": 1483687801000,
      "totalPrice":50
    },
    {
      "buyNums": 1,
      "orderList": [
        {
          "buyNum": 1,
          "goodsImg": "../../images/cart.jpg",
          "goodsName": "列表商品",
          "goodsStandardDes": "颜色：红色  尺码：s",
          "sellPrice": 19.9,
          "shopId": 1,
        }
      ],
      "orderNum": "abc2511483616883663",
      "orderStatusStr": "已完成",
      "orderTime": 1483616883000,
      "totalPrice": 19.9,
    }
  ],
}

Page({
  data: {
    curNav: "0",
    list: ["待付款","待发货","待收货","已完成"]
  },
  switchTab: function(e) {
  },
  onLoad: function() {
    this.setData({
      curNav: 0,
    });
  },
  onShow: function() {
    var self = this;
    var self  = self,
        info  = order_detail.data;
    info.forEach(function(value){
      value.timer = common.formatTime(new Date(value.orderTime), "yyyy-MM-dd hh:mm");
    });
    self.setData({
      order: info
    });
  },
  getDetail: function(e) {

  },
  goPay: function() {

  },
})