// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  var para=event.parameter;
  var id=event.pro_id;
 if(para==1){//index
  return await  db.collection("rec_table")
 .aggregate()
 .match({
     rec_class:'新品'
 })
    .lookup({
        from:"products_table",
        localField:'products_id',
        foreignField:'_id',
        as:"result",
    }).replaceRoot({
        newRoot: $.mergeObjects([ $.arrayElemAt(['$result', 0]), '$$ROOT' ])
      })
      .project({
        result: 0
      })
    .end()
 }
 else if(para==2){//detial
  return await db.collection("comment")
  .aggregate()
  .match({
    pro_id:id
  })
  .lookup({
    from:"products_table",
    localField:'pro_id',
    foreignField:'_id',
    as:"result",
    }).replaceRoot({
        newRoot: $.mergeObjects([ $.arrayElemAt(['$result', 0]), '$$ROOT' ])
      })
      .project({
        result: 0
      })
    .end()
 }
}