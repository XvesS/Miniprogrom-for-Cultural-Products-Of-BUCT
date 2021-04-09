// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var Pdata = event.Pdata;
  var type = event.type;
  if(!type){
    var id = Pdata._id;
    delete Pdata._id;
    return await db.collection('products_table')
    .doc(id)
    .set({
      data:Pdata
    })
  }else if(type == 1){
      return await db.collection('products_table')
      .add({
        data:Pdata
      })
  }
}