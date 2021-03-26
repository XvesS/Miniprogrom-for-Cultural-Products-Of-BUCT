// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
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