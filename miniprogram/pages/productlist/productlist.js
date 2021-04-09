// pages/productlist/productlist.js
Page({
    data: {
        moveParams: {
          scrollLeft: 0
        },//固定
        cateItems: [
    {
      cate_id:1,
      abbba:'待付款',
      children:[
        {
          buyNum: 2,
          goodsImg: "../../images/cart.jpg",
          goodsName: "列表商品",
          goodsStandardDes: "颜色：红色  尺码：s",
          sellPrice: 25,
          shopId: 1,
          orderNum: "abc2511483687801946",
          orderTime: "1483687801000",
          totalPrice:50
    },
    {
          buyNum: 1,
          goodsImg: '../../images/cart.jpg',
          goodsName: '列表商品',
          goodsStandardDes:" 颜色：红色  尺码：s",
          sellPrice: 19.9,
          shopId: 1,
          orderNum: "abc2511483616883663",
          orderTime: "1483616883000",
          totalPrice: "19.9",
    }
      ],


    },
    {
      cate_id:1,
      abbba:'待发货',
      children:[
        {
          buyNum: 2,
          goodsImg: "../../images/cart.jpg",
          goodsName: "列表商品1",
          goodsStandardDes: "颜色：红色  尺码：s",
          sellPrice: 25,
          shopId: 1,
          orderNum: "abc2511483687801946",
          orderTime: "1483687801000",
          totalPrice:50
    },
    {
          buyNum: 1,
          goodsImg: '../../images/cart.jpg',
          goodsName: '列表商品2',
          goodsStandardDes:" 颜色：红色  尺码：s",
          sellPrice: 19.9,
          shopId: 1,
          orderNum: "abc2511483616883663",
          orderTime: "1483616883000",
          totalPrice: "19.9",
    }
      ],


    },
    {
      cate_id:1,
      abbba:'待收货',
      children:[
        {
          buyNum: 2,
          goodsImg: "../../images/cart.jpg",
          goodsName: "列表商品3",
          goodsStandardDes: "颜色：红色  尺码：s",
          sellPrice: 25,
          shopId: 1,
          orderNum: "abc2511483687801946",
          orderTime: "1483687801000",
          totalPrice:50
    },
    {
          buyNum: 1,
          goodsImg: '../../images/cart.jpg',
          goodsName: '列表商品4',
          goodsStandardDes:" 颜色：红色  尺码：s",
          sellPrice: 19.9,
          shopId: 1,
          orderNum: "abc2511483616883663",
          orderTime: "1483616883000",
          totalPrice: "19.9",
    }
      ],


    },
    {
      cate_id:1,
      abbba:'已完成',
      children:[
        {
          buyNum: 2,
          goodsImg: "../../images/cart.jpg",
          goodsName: "列表商品5",
          goodsStandardDes: "颜色：红色  尺码：s",
          sellPrice: 25,
          shopId: 1,
          orderNum: "abc2511483687801946",
          orderTime: "1483687801000",
          totalPrice:50
    },
    {
          buyNum: 1,
          goodsImg: '../../images/cart.jpg',
          goodsName: '列表商品6',
          goodsStandardDes:" 颜色：红色  尺码：s",
          sellPrice: 19.9,
          shopId: 1,
          orderNum: "abc2511483616883663",
          orderTime: "1483616883000",
          totalPrice: "19.9",
    }
      ],


    }
    
    
 
 ]
}

 ,
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


switchRightTab:function(e){
let id = e.target.dataset.cate_id,index=e.target.dataset.index;
this.setData({
  curNav:id,
  curIndex:index
})
},
})
