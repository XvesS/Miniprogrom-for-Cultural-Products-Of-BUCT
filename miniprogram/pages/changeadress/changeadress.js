// pages/changeadress/changeadress.js
Page({
  data: {
    loading: true,
    lists:[],
    addressesList:[
      {
        name:'1',
        trueName:"小王",
        mobPhone:'12300003211',
        address:'北京市昌平区',
        value:'小王',
        checked: 'true'
      },
      {
        name:'2',
        trueName:"小li",
        mobPhone:'12300333211',
        address:'北京市昌平区',
        value:'小li'
      }
    ],
    defaultId: 0,
    tipsData: {
      title: ''
    }
  },
  setDefaultStyle(list, id) {
    list.forEach((itm) => {
      if (itm) {
        itm.items.is_default = +itm.address_id === id;
        itm.items.iconType = itm.items.is_default ? 'success' : 'circle';
        itm.items.iconColor = itm.items.iconType === 'success' ? '#FF2D4B' : '';
      }
    });
  },
  goEdit(event) {
    const id = event.target.dataset.addressId;
    wx.navigateTo({
      url: '../adress-add/adress-add'
    });
  },
  del(event){
    var lists= this.data.addressesList;
    const index = e.currentTarget.dataset.index;
    lists.splice(index, 1); 
    this.setData({
      addressesList: lists
    });
  },
    
  
})
