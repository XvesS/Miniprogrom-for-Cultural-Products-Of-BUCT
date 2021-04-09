// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  //const userID = cloud.getWXContext().OPENID;
  //shop使用该函数
  var userID = '100009';
  var para = event.paramter;
  if(para == 1){
      return await db.collection('shop_table')
      .aggregate()
      .match({
        user_id:userID
      })
      .lookup({
        from: 'products_table',
        localField: '_id',
        foreignField: 'shop_id',
        as: 'goodsList',
      }).project({
        _id:0,
        goodsList:1
      })
      .end()
  }
}