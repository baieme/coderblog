const connection = require('../app/database')
class FileService {
    //上传图像信息到数据库
   async add(userId,filename,mimetype,size){
    console.log(userId,filename,mimetype,size)
    const statement = `insert into avatar(userId,filename,mimetype,size) values(?,?,?,?);`;
    const [result] = await connection.execute(statement,[userId,filename,mimetype,size]);
    return result
   }
   //上传图片信息到数据库
   async createPicture(userId,filename,mimetype,size,momentId){
    const statement = `insert into picture(userId,filename,mimetype,size,momentId) values(?,?,?,?,?);`;
    const [result] = await connection.execute(statement,[userId,filename,mimetype,size,momentId]);
    return result;
   }
}
module.exports = new FileService();