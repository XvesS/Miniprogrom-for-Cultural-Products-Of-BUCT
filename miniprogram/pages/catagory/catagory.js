Page({
  data: {
      curpos:0,//固定
      moveParams: {
        scrollLeft: 0
      },//固定
      catagoryTopList:['全部商品','照片','明信片','服饰','文具','实用'],
      catagoryProducts:[],
      pagesNum:0,
  },

  getRect(ele) { 
  //获取点击元素的信息,ele为传入的id
    var that = this;
    //节点查询
    wx.createSelectorQuery().select(ele).boundingClientRect(function (rect) {
      //console.log(rect)
      let moveParams = that.data.moveParams;
      moveParams.subLeft = rect.left;
      moveParams.subHalfWidth = rect.width / 2;
      moveParams.screenHalfWidth=wx.getSystemInfoSync().windowWidth/2;
      that.moveTo();
    }).exec()
  },
  moveTo: function () {
    let subLeft = this.data.moveParams.subLeft;
    let screenHalfWidth = this.data.moveParams.screenHalfWidth;
    let subHalfWidth = this.data.moveParams.subHalfWidth;
    let scrollLeft = this.data.moveParams.scrollLeft;

    let distance = subLeft - screenHalfWidth + subHalfWidth;

    scrollLeft = scrollLeft + distance;

    this.setData({
      scrollLeft: scrollLeft
    })
  },
  scrollMove(e) {
    let moveParams = this.data.moveParams;
    moveParams.scrollLeft = e.detail.scrollLeft;
    this.setData({
      moveParams: moveParams
    })
  },
  //选择项目
  selectItem: function (e) {
    let ele = 'scroll-item-' + e.currentTarget.dataset.index;
    this.setData({
      curpos:e.currentTarget.dataset.index
    })
    this.getRect('#' + ele);//以上代码不要动

    this.setData({
      pagesNum:0,
      catagoryProducts:[]
    })
    wx.cloud.callFunction({
      name:"get_productsByType",
      data:{
        type:this.data.catagoryTopList[e.currentTarget.dataset.index],
        num:this.data.pagesNum*10
      }
    }).then(res=>{
      var data = res.result.data;
      this.setData({
        catagoryProducts:data
      })
    })
  },
  onLoad(){
    wx.cloud.callFunction({
      name:"get_productsByType",
      data:{
        type:this.data.catagoryTopList[0],
        num:this.data.pagesNum*10
      }
    }).then(res=>{
      var data = res.result.data;
      this.setData({
        catagoryProducts:data
      })
    })
  },
  onReachBottom: function () {
    var num = this.data.pagesNum+1;
    this.setData({
      pagesNum:num
    })
    wx.cloud.callFunction({
      name:'get_productsByType',
      num:num*10
    }).then(res=>{
      var data = res.result.data;
      var newList = this.data.catagoryProducts.concat(data);
      this.setData({
        catagoryProducts:newList
      })
    })
  },
  onReady(){
      
  },
})