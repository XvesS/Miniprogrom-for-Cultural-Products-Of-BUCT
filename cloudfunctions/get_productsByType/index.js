// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var type = event.type;
  var num = event.num;
  if(type=="全部商品"){
    return await db.collection('products_table').orderBy('products_likes','desc').skip(num).get();
  }else{
    return await db.collection('products_table').where({
      products_class:_.in([type])
    }).orderBy('products_likes','desc').skip(num).get();
  }
}