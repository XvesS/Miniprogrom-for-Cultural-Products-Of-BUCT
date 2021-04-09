// pages/shopcart/shopcart.js
Page({
  data: {
    wantToDeleteItem: '',
    isHaveAddress: false,
    isHaveCoupons: false,
    addressInfo: null,
    allPrice: 0,//总共需要支付的价格
    list:[],
    carts:[],
    cartShopList: [
      {
        shopImg: "../../images/cart.jpg",
        shopTitle: "大鹅周边",
        shopSelectInfo: "颜色分类:红色",
        shopPrice: "9.9",
        shopId: 1,
        shopCount:2,
      },
      {
        shopImg: "../../images/cart.jpg",
        shopTitle: "文具",
        shopSelectInfo: "颜色分类:卡黄色;尺码:均码 ",
        shopPrice: "19.9",
        shopId: 2,
        shopCount:1,
      },
      {
        shopImg: "../../images/cart.jpg",
        shopTitle: "服饰",
        shopSelectInfo: "颜色分类：灰色；尺码：均码",
        shopPrice: "29.9",
        shopId: 10,
        shopCount:5,
      },
      {
        shopImg: "../../images/cart.jpg",
        shopTitle: "日用品",
        shopSelectInfo: "颜色分类:红色;尺码:均码",
        shopPrice: "18.00",
        shopId: 6,
        shopCount:10,
      }
    ],
  },
     
  //商品数量减少
  itemCountSub: function (e) {
    var list = this.data.cartShopList;
    var id= e.currentTarget.dataset.id;
    for (var key in list){
    if(list[key].shopId ==id) {
      if(list[key].shopCount >1){
      list[key].shopCount=--list[key].shopCount;
      this.setData({
        cartShopList: list,
      });
    }}
    this.allShopPrice();
    }}
  ,

  //商品数量增加
  itemCountAdd: function (e) {
    var list = this.data.cartShopList;
    var id= e.currentTarget.dataset.id;
    for (var key in list){
    if(list[key].shopId ==id) {
      list[key].shopCount=++list[key].shopCount;
      this.setData({
        cartShopList: list,
      });
    }
    this.allShopPrice();
    }
  },


  /*
    计算总价格
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
//结算
onItemClick : function(e){
  var index = e.currentTarget.dataset.itemIndex;
  wx.navigateTo({
      url: '../../pages/charge/charge?id=' +e.currentTarget.dataset.itemIndex,
    })
},
//跳转商品页面
itemdetail:function(e){
  var index = e.currentTarget.dataset.itemIndex;
  wx.navigateTo({
    url: '../detail/detail?id='+e.currentTarget.dataset.itemIndex,
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
  //删除
  canclecollect: function (e) {
    /*wx.showModal({
      title: '删除商品',
      content: '是否要删除这件商品？',
      confirmText: '删除',
      cancelText: '取消',
      success: function(res) {
        if (res.confirm) {*/
          var carts= this.data.cartShopList;
          const index = e.currentTarget.dataset.index;
          carts.splice(index, 1); // 删除这个商品
          this.setData({
          cartShopList: carts
          });
          /*if (!cartShopList.length) { // 为空
          this.setData({
          hasList: false 
          });
          } else { // 不为空*/
          this.allShopPrice(); // 重新计算总价格
          //}
        }
       // }
     // })
    //}
    ,
    
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    getApp().globalData.otherAddressInfo = null;
  },
  



})
