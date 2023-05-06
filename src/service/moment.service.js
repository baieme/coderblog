const connection = require("../app/database.js");
const commonSql = `SELECT 
m.id id, m.content content,
JSON_OBJECT('id',u.id,'name',u.name) user
FROM moment m LEFT JOIN users u ON m.userId = u.id`;
class Moment {
  async createMoment(content, id) {
    const statement = `INSERT INTO moment (content,userId) VALUES(?,?);`;
    const [result] = await connection.execute(statement, [content, id]);
    console.log(result);
    return result;
  }
  // 查询单个动态
  async getMoment(id) {

    // ？？？？？？？？？？？？？？
    const statement = `SELECT 
    m.id id, m.content content,JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar) user,(SELECT  IF(COUNT(c.id),JSON_ARRAYAGG(
                      JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.commentId,'user',JSON_OBJECT('id',us.id,'name',us.name,'avatar',us.avatar))
                     ),NULL) FROM comment c LEFT JOIN users us ON c.userId = us.id WHERE c.momentId = m.id)  allComment,
										 IF(COUNT(l.id) != 0,JSON_ARRAYAGG(
											JSON_OBJECT('id',l.id,'name',l.name)
											),NULL) label,
                      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8080/moment/images/',picture.filename) ) from picture WHERE picture.momentId = m.id) pic
     FROM moment m LEFT JOIN users u ON m.userId = u.id
										 LEFT JOIN label_moment lm ON lm.momentId = m.id
										 LEFT JOIN label l ON l.id = lm.labelId
                     WHERE m.id = ? group by m.id;`;
        console.log(7777,'1',statement)
        console.log(id)
    const [result] = await connection.execute(statement,[id]);
    
    return result;
  }
  //查询多个动态
  async getMomentList(page, size) {
    const statement = `SELECT 
        m.id id, m.content content,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        (SELECT COUNT(*) FROM comment c WHERE c.momentId = m.id  ) commentCount,
        (SELECT COUNT(*) FROM label_moment lm WHERE lm.momentId = m.id) lableCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8080/images/',picture.filename) ) from picture WHERE picture.momentId = m.id) pic
        FROM moment m LEFT JOIN users u ON m.userId = u.id limit ?,?;`;
    const [result] = await connection.execute(statement, [page, size]);
    return result;
  }
  //进行修改操作
  async updateMoment(content, id) {
    const statement = `UPDATE moment SET content=? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, id]);
    return result;
  }
  //进行删除操作
  async removeMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  // 给动态添加标签
  async addLabel(labelId,momentId){
    const statement =  `insert into label_moment(labelId,momentId) values (?,?);`;
    const [result] = await connection.execute(statement,[labelId,momentId]);
    return result;
  }

  //查看动态图片
  async queryPictureMessage(path){

    const statement = `select * from picture where filename = ?;`;
    const [result] = await connection.execute(statement,[path]);
    return result;
  }
}
module.exports = new Moment();
