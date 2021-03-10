// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
        return await db.collection('rec_table')
        .aggregate()
        .match({
          rec_class:'精品'
        }).lookup({
          from:'products_table',
          localField:'products_id',
          foreignField:'_id',
          as:"result"
        }).replaceRoot({
          newRoot:{
            result:'$result'
          }
        })
        .end()
}