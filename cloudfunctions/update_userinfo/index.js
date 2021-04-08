// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var userinfo = event.Userdata;
  var id = userinfo._id;
  delete userinfo._id;
  return await db.collection('user_table')
  .doc(id)
  .set({
    data:userinfo
  })
}