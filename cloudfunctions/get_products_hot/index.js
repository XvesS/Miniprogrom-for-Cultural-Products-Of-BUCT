// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  //获取最热单品前四
  return await db.collection("products_table")
  .orderBy('products_likes','desc')
  .limit(4)
  .get()
}