// pages/editproduct/editproduct.js
var app=getApp();
var whichpic=0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showpop:false,
    isdisable:true,
    info:"修改",
    /****/
    productsData:'',
    typeData:{}
  },
clikthis(){
this.setData({
  showpop:true
})
},
tofix(){
  if(this.data.info == '修改')
    var info = "确定"
  else
    info = "修改"
  this.setData({
    isdisable:!this.data.isdisable,
    info
  })
},
onClose(){
  this.setData({
    showpop:false
  })
},
handleGUIge(e){
  var index = e.currentTarget.dataset.index;
  whichpic = index;
  var inputValue = e.detail.value;
  var mtext = 'productsData.products_specification['+index+'].type';
  var typeData = this.data.productsData.products_specification[index];
  this.setData({
    [mtext]:inputValue,
    typeData
  })
},
handleGUIgenum(e){
  var index = e.currentTarget.dataset.index;
  var inputValue = e.detail.value;
  var mtext = 'productsData.products_specification['+index+'].num';
  this.setData({
    [mtext]:inputValue
  })
},
iptfile(e){
  // console.log(e);
  var index = e.currentTarget.dataset.index;
  var inputValue = e.detail;
  var List=['products_name','products_describe','products_price','products_num','products_class']
  var mtext = 'productsData.'+List[index-1];
  if(index!=5){
    this.setData({
      [mtext]:inputValue
    })
  }else{
    var arr = inputValue.split(' ');//分割
    this.setData({
      [mtext]:arr
    })
  }
},
hitim(){
  const that=this;
  //加载本地图片
  wx.chooseImage({
    count:1,
    success (res){
      const tempFilePath = res.tempFilePaths;
      var mtext = 'productsData.products_specification['+whichpic+'].pic';
      that.setData({
        [mtext]:tempFilePath[0]
      })
      var typeData = that.data.productsData.products_specification[whichpic];
      that.setData({
        typeData
      })

    }
  })
},
addheadpic(){
  const that = this;
  wx.chooseImage({
    count:9,
    success (res){
      const tempFilePath = res.tempFilePaths;
      var mtext = 'productsData.products_pic';
      var arr=that.data.productsData.products_pic;
      for(var index in tempFilePath)
        arr.push(tempFilePath[index]);
      that.setData({
        [mtext]:arr
      })
    }
  })
},
delheadpic(e){
  // console.log(e);
  var index = e.currentTarget.dataset.index;
  var arr = this.data.productsData.products_pic;
  var mtext = 'productsData.products_pic';
  arr.splice(index,1);
  this.setData({
    [mtext]:arr
  })
},

genID(length){
  return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
},


loadtoDataBase(){
  const that = this;
  //更新数据库
  var newData = that.data.productsData;
  wx.cloud.callFunction({
    name:'update_productsinfo',
    data:{
      Pdata:newData,
      type:0
    }
  }).then(res=>{
    // console.log(res)
    wx.hideLoading()
  })
},

loadpicType(cloudpath){
  const that = this;
  var typeArr = that.data.productsData.products_specification;
  var len_t = typeArr.length;
  var scount=0;
  var sscount=0;
  for(var i=0;i<len_t;i++){
    if(typeArr[i].pic.indexOf('cloud')==-1){
        scount++;
        var point_t = typeArr[i].pic.lastIndexOf(".");
        var ext_t = typeArr[i].pic.substr(point_t+1);
        var path = cloudpath+that.genID(9)+'.'+ext_t
        wx.cloud.uploadFile({
          cloudPath:path,
          filePath:typeArr[i].pic
        }).then(res=>{
          var ktext = 'productsData.products_specification['+sscount+'].pic';
          sscount++;
          that.setData({
            [ktext]:res.fileID
          })
          if(sscount==scount){
            that.loadtoDataBase();
          }
        })
    }
  }
},
loadtoHeadpic(cloudpath){
    const that =this;
    var picArr=that.data.productsData.products_pic;
    var len = picArr.length;
    var headPic=[];
    var mtext = 'productsData.products_pic'
    var count=0;
    for(var i=0;i<len;i++){
      if(picArr[i].indexOf('cloud')==-1){
          count++;
          var point= picArr[i].lastIndexOf(".");
          var ext = picArr[i].substr(point+1);
          var npath = cloudpath+that.genID(10)+'.'+ext;
          wx.cloud.uploadFile({
            cloudPath:npath,
            filePath:picArr[i]
          }).then(res=>{
            headPic.push(res.fileID);
            if(headPic.length == count){
              that.setData({
                [mtext]:headPic
              })
              that.loadpicType(cloudpath);
            }
          }).catch(err=>{
            console.log(err);
          })
      }
    }
},
tosubmit(){
  //先处理两个图片问题
  //头部图片
  const that =this;
  wx.showLoading({
    title: '正在提交',
    mask:true
  })
   // var username = app.globalData.userID;
   var username = '100007';
   var time = new Date();
   var day=time.getFullYear()+''+(time.getMonth()+1)+''+time.getDate();
   var cloudpath = 'userPic/'+username+'/'+day+'/';
   that.loadtoHeadpic(cloudpath);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.productsData){
      var data = JSON.parse(options.productsData);
      var typeData = data.products_specification[0];
      this.setData({
        productsData:data,
        typeData
      })
  }
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