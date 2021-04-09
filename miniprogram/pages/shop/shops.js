// pages/shop/shops.js
var promise=0;
var whichType=0;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showclass:false,
    result:'',
    fileList:'',
    active:0,
    /******先别动*****/
    productsData:'',
    newProduct:{},
    showpop:false,
    typepic:''
  },
  genID(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
  },
  handleGUIge(e){
    var index = e.currentTarget.dataset.index;
    whichType = index;
    var inputValue = e.detail.value;
    var mtext = 'newProduct.products_specification['+index+'].type';
    this.setData({
      [mtext]:inputValue
    })
  },
  focus(e){
    var index = e.currentTarget.dataset.index;
    whichType = index;
    const that = this;
    if(whichType<promise){
      this.setData({
        typepic:that.data.newProduct.products_specification[whichType].pic
      })
    }
  },
  handleGUIgenum(e){
    var index = e.currentTarget.dataset.index;
    var inputValue = e.detail.value;
    var mtext = 'newProduct.products_specification['+index+'].num';
    this.setData({
      [mtext]:inputValue
    })
  },
  hitim(){
    const that=this;
    //加载本地图片
    wx.chooseImage({
      count:1,
      success (res){
        const tempFilePath = res.tempFilePaths;
        var mtext = 'newProduct.products_specification['+whichType+'].pic';
        that.setData({
          [mtext]:tempFilePath[0],
          typepic:tempFilePath[0]
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
        var mtext = 'newProduct.products_pic';
        var arr=that.data.newProduct.products_pic;
        if(!arr) arr = [];
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
    var arr = this.data.newProduct.products_pic;
    var mtext = 'newProduct.products_pic';
    arr.splice(index,1);
    this.setData({
      [mtext]:arr
    })
  },
  loadtoDataBase(){
    const that = this;
    //更新数据库
    var newData = that.data.newProduct;
    var shopID = app.globalData.shopID;
    newData.products_status = true;
    newData.products_is_recomd = false;
    newData.products_uptime = Date.now();
    newData.shop_id = shopID;
    wx.cloud.callFunction({
      name:'update_productsinfo',
      data:{
        Pdata:newData,
        type:1
      }
    }).then(res=>{
      // console.log(res)
      wx.hideLoading();
      that.data.active = 0;
    })
  },
  loadpicType(cloudpath){
    const that = this;
    var typeArr = that.data.newProduct.products_specification;
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
            var ktext = 'newProduct.products_specification['+sscount+'].pic';
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
    var picArr=that.data.newProduct.products_pic;
    var len = picArr.length;
    var headPic=[];
    var mtext = 'newProduct.products_pic'
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
  submit(){
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
  addtypeNum(){
    var newType={
      num:0,
      type:'',
      pic:''
    };
    var List = this.data.newProduct.products_specification;
    if(!List) List = [];
    List.push(newType);
    var mtext = 'newProduct.products_specification';
    this.setData({
      [mtext]:List
    })
    promise++;
  },
  clspop(){
    this.setData({
      showpop:false
    })
  },
  openpop(){
    this.setData({
      showpop:true
    })
  },
  onChange(event){
    var classList = event.detail;
    var mtext = 'newProduct.products_class';
    this.setData({
      result:classList,
      [mtext]:classList
    })
  },
  iptfile(e){
    var index = e.currentTarget.dataset.index;
    var inputValue = e.detail;
    var List=['products_name','products_describe','products_price','products_num']
    var mtext = 'newProduct.'+List[index-1];
    this.setData({
      [mtext]:inputValue
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
  console.log(e)
  var index = e.currentTarget.dataset.index;
  var isedit = e.currentTarget.dataset.isedit;
  var data = this.data.productsData[index];
  var str=JSON.stringify(data);
  if(isedit){//商品编辑界面
    wx.redirectTo({
      url:'../editproduct/editproduct?productsData='+str,
    })
  }else{//商品展示页面
    wx.navigateTo({
      url: '../detail/detail?data=' + str,
    })
  }
},
handleLongPress(e){
  var index = e.currentTarget.dataset.index;
  const that = this;
  wx.showModal({
    title: '确定下架此商品?',
    success (res) {
      if (res.confirm) {
          wx.showLoading({
            title: '上传中..',
            mask:true
          })
        var mtext = 'productsData['+index+'].products_status';
        that.setData({
          [mtext]:false
        })
        var data = that.data.productsData[index];
        that.uptoDataBase(data);
      } else if (res.cancel) {}
    }
  })
},
upShop(e){
  var index = e.currentTarget.dataset.index;
  const that = this;
  wx.showModal({
    title: '确定上架此商品?',
    success (res) {
      if (res.confirm) {
        wx.showLoading({
          title: '上传中..',
          mask:true
        })
        var mtext = 'productsData['+index+'].products_status';
        that.setData({
          [mtext]:true
        })
        var data = that.data.productsData[index];
        that.uptoDataBase(data);
      } else if (res.cancel) {}
    }
  })
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

uptoDataBase(data){
  wx.cloud.callFunction({
    name:'update_productsinfo',
    data:{
      Pdata:data
    }
  }).then(res=>{
    wx.hideLoading();
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