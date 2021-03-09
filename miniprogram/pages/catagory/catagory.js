Page({
  data: {
      category: [
          {name:'产品',id:'guowei'},
          {name:'手账',id:'shucai'},
          {name:'小物',id:'chaohuo'},
          {name:'照片',id:'dianxin'},
          {name:'手办',id:'cucha'},
          {name:'绘画',id:'danfan'},
          {name:'精选',id:'danfan'}
      ],//后期修改具体分类
      detail:[],
      curIndex: 0,
      isScroll: false,
      toView: 'guowei'
  },
  onReady(){
      var self = this;
      // wx.request({
      //     url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      //     success(res){
      //         self.setData({
      //             detail : res.data
      //         })
      //     }
      // });
      
  },
  switchTab(e){
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function(){
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    },0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    },1)   
  }
})