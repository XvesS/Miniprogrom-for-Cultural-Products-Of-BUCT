// pages/shopcart/shopcart.js
Page({
  data: {
    isHaveAddress: false,
    isHaveCoupons: false,
    addressInfo: null,
    allPrice: 0,//总共需要支付的价格
    cartShopList: [
      {
        shopImg: "../../images/cart.jpg",
        shopTitle: "大鹅周边",
        shopSelectInfo: "套餐类型:官方标配;颜色分类:",
        shopPrice: "9.9",
        shopCount: 1,
      },
      {
        shopImg: "../../images/cart.jpg",
        shopTitle: "文具",
        shopSelectInfo: "颜色分类:卡黄色;尺码:均码 ",
        shopPrice: "9.9",
        shopCount: 2,
      },
      {
        shopImg: "../../images/cart.jpg",
        shopTitle: "服饰",
        shopSelectInfo: "颜色分类：灰色；尺码：均码",
        shopPrice: "29.9",
        shopCount: 10,
      },
      {
        shopImg: "../../images/cart.jpg",
        shopTitle: "日用品",
        shopSelectInfo: "颜色分类:红色;尺码:均码",
        shopPrice: "18.00",
        shopCount: 1,
      }
    ],
    cartshoplist1:[

    ]

  },

  //勾选购物车商品
  xuanze:function(e){



  },
  

  //商品数量减少
  itemCountSub: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.cartShopList;
    if (list[index].shopCount > 0) {
      list[index].shopCount = --list[index].shopCount;
      this.setData({
        cartShopList: list,
      });
    }
    //计算总价格
    this.allShopPrice();

  },

  //商品数量增加
  itemCountAdd: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.cartShopList;
    list[index].shopCount = ++list[index].shopCount;

    this.setData({
      cartShopList: list,
    });
    //计算总价格
    this.allShopPrice();
  },


  /**
   * 计算总价格
   */
  allShopPrice: function () {
    var shopList = this.data.cartShopList;
    var shopPrice = 0.0;
    for (var key in shopList) {
      shopPrice += shopList[key].shopPrice * shopList[key].shopCount;
    }
    this.setData({
      allPrice: shopPrice,
    });
  },

onItemClick : function(e){
  var index = e.currentTarget.dataset.itemIndex;
  wx.navigateTo({
      url: '../../pages/charge/charge?id=' +e.currentTarget.dataset.itemIndex,
    })
},

goToPay : function(){
  wx.requestPayment({
    timeStamp: 'String1',
    nonceStr: 'String2',
    package: 'String3',
    signType: 'MD5',
    paySign: 'String4',
    success: function(res){
      // success
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
},


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var otherAddressInfo = getApp().globalData.otherAddressInfo;
    if (otherAddressInfo == null) {
      var addressList = wx.getStorageSync('address');
      for (var key in addressList) {
        if (addressList[key].isDefult) {
          this.setData({
            addressInfo: addressList[key],
            isHaveAddress: true,
          });
        }
      }
      if (this.data.addressInfo == null && addressList.length > 0) {
        this.setData({
          addressInfo: addressList[0],
          isHaveAddress: true,
        });
      }
    } else {
      this.setData({
        addressInfo: otherAddressInfo,
        isHaveAddress: true,
      });
    }
    //计算总价格
    this.allShopPrice();
  },
 
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    getApp().globalData.otherAddressInfo = null;
  },
  



})