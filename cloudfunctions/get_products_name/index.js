// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  const value = event.value
  //查询商品名为{{value}}或类别为{{value}}的记录
  return await db.collection('products_table').where(
    _.and([
      _.or({
        products_name:value
      }),
      _.or({
        products_class:value
      })
    ])
  ).get()
}