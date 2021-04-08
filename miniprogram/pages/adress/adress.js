// pages/adress/adress.js
var request = require('../../utils/https.js')
var uri_save_address = 'address/api/saveAddress' //确认订单

Page({
  data:{
    arrayCity:[],
    arrayDistrict:[],
    index: 0,
    indexC: 0,
    indexD: 0,
    name:'',
    phoneNum:'',
    zipCode:'',
    detailAddress:'',
    pId:'',
    cId:'',
    dId:'',
    pName:'',
    cName:'',
    dName:'',
    addressInfo:{},
  },
  //省
  bindProvinceChange: function(e) {
    this.setData({
      index: e.detail.value,
      arrayCity: this.data.array[e.detail.value].childern,
      pId: this.data.array[e.detail.value].areaId,
      pName: this.data.array[e.detail.value].areaName,
    })
  },
  //市
  bindCityChange: function(e) {
    this.setData({
      indexC: e.detail.value,
      arrayDistrict: this.data.arrayCity[e.detail.value].childern,
      cId: this.data.arrayCity[e.detail.value].areaId,
      cName: this.data.arrayCity[e.detail.value].areaName,
    })
  },
  //区
  bindDistrictChange: function(e) {
    this.setData({
      indexD: e.detail.value,
      dId: this.data.arrayDistrict[e.detail.value].areaId,
      dName: this.data.arrayDistrict[e.detail.value].areaName,
    })
  },
  //收货人赋值
  bindNameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //手机号赋值
  bindPhoneInput: function(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  //邮政编码赋值
  bindZipCodeInput: function(e) {
    this.setData({
      zipCode: e.detail.value
    })
  },
  //详细地址赋值
  bindAddressInput: function(e) {
    this.setData({
      detailAddress: e.detail.value
    })
  },
  //保存
  addAddress:function(){
    var that = this;
    if(that.data.name.length == 0){
        wx.showToast({
            title: '收货人不能为空',
            icon: 'loading',
            mask: true
        })
    }else if(that.data.phoneNum.length == 0){
        wx.showToast({
            title: '手机号不能为空',
            icon: 'loading',
            mask: true
        })
    }else if(that.data.zipCode.length == 0){
        wx.showToast({
            title: '邮编不能为空',
            icon: 'loading',
            mask: true
        })
    }else if(that.data.pId.length == 0){
        wx.showToast({
            title: '请选所在省份',
            icon: 'loading',
            mask: true
        })
    }else if(that.data.cId.length == 0){
        wx.showToast({
            title: '请选择所在市',
            icon: 'loading',
            mask: true
        })
    }else if(that.data.dId.length == 0){
        wx.showToast({
            title: '请选择所在区县',
            icon: 'loading',
            mask: true
        })
    }else if(that.data.detailAddress.length == 0){
        wx.showToast({
            title: '详细地址不能为空为空',
            icon: 'loading',
            mask: true
        })
    }else{
        request.req(uri_save_address, {
            trueName: that.data.name,
            mobPhone: that.data.phoneNum,
            zipCode: that.data.zipCode,
            provinceId: that.data.pId,
            cityId: that.data.cId,
            areaId: that.data.dId,
            areaInfo:that.data.pName+','+ that.data.cName+','+ that.data.dName,
            address: that.data.detailAddress,
        }, (err, res) => {
            var result = res.data;
            if (result.result == 1) { //地址保存成功
            wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
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
            } else {
                wx.showToast({
                    title: '保存失败',
                    icon: 'loading',
                    duration: 1500
                })
            }
        })
    }
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    this.setData({
        addressInfo : options,
        name: options.trueName,
        phoneNum: options.mobPhone,
        zipCode:options.zipCode,
        detailAddress:options.address,
    });
}
})
