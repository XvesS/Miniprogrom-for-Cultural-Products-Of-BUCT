// pages/charge/charge.js
Page({
  data: {
    loading: true,
    loading: true,
    allPrice:'',
    ordernumber:'001',
    ordertime:'20210403',
    items: [
      {name: 'wechat', value: '微信', checked: 'true'},
      {name: 'pay', value: '支付宝'},
    ],
    list:[
      {
      wechat:"../../images/wechat.jpg",
      pay:"../../images/pay.jpg",
      },
    ]

  },
  
  onLoad: function (options) {
      this.setData({
        id: options.id,
        allPrice: options.allPrice,
      })
    },
    radioChange: function(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
  /*onLoad({ subOrderSn }) {
    request({ path: `/clientOrderDetail/${subOrderSn}` }).then(({ data }) => {
      let address = { hasData: false };
      address = data.consignee ? {
        hasData: true,
        consignee: data.consignee,
        mobile: data.mobile,
        detail_address: data.detail_address,
        arrowShow: 'display-none'
      } : { hasData: false };
      this.setData({
        address,
        goods: data.goods,
        order: data
      });
    });
  },*/
  cancleOrder() {
   wx.navigateBack({
     delta: 1,
   })
  },
  payOrder() {
                wx.navigateTo({
                  url: '../result/result'
                })
        } ,
navigateToAddress(){
                wx.navigateTo({
                  url: '../changeadress/changeadress',
                })
}
});