// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  var para = event.para;
  if(para==1){
    return await db.collection('draft_table')
    .where({
      draft_status:false
    })
    .get()
  }else if(para==2){
    var name = event.name;
    return await db.collection('draft_table')
    .where({
      draft_name:name
    })
    .get()
  }
}