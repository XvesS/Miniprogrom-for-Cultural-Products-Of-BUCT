Page({
  data: {
    curpos:0,//固定
      moveParams: {
        scrollLeft: 0
      },//固定
      array: [{
        message: '我要投稿',
      }, {
        message: '投稿记录'
      }],
      contribution:[
        {
          Id:'001',
          Img:'../../images/cart.jpg',
          Title:'1大鹅',
          Jianshu:'1北化大鹅',
          Time:'2020-03-20',
          Result:'待审核',
        },
        {
          Id:'002',
          Img:'../../images/cart.jpg',
          Title:'2大鹅',
          Jianshu:'2北化大鹅',
          Time:'2020-03-23',
          Result:'审核通过（待生产）'
        },
        {
          Id:'003',
          Img:'../../images/cart.jpg',
          Title:'3大鹅',
          Jianshu:'3北化大鹅',
          Time:'2020-03-18',
          Result:'审核通过（已发售）'
        },
      ]
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
    },
  
    onReady(){
        
    },
    canclecontri:function(e){
          var lists= this.data.contribution;
          const index = e.currentTarget.dataset.index;
          lists.splice(index, 1); // 删除这个商品
          this.setData({
            contribution: lists
          });
        },
        onItemClick:function(e){

          wx.navigateTo({
           // url: '../detail/detail?id="shopId"',
            url: '../contri/contri',
            success: (result) => {},
            fail: (res) => {},
            complete: (res) => {},
          })
         },
    
  })
