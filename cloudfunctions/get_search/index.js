// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var name = event.name;
  var table = event.table;
  var searchitem = event.searchitem;//根据情况
    return await db.collection(table)
    .where({
      user_name:name
    }).get()
}