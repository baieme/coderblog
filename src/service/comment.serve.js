const connection = require('../app/database.js');
class CommentService{
    //创建评论
    async createComment(id,content,momentId){
        const statement = `INSERT INTO comment(momentId,content,userId) VALUES(?,?,?);`;
        const [result] = await connection.execute(statement,[momentId,content,id]);
        return result;
    }
    //回复评论
    async replayComment(content,commentId,id,momentId){
        const statement = `INSERT INTO comment(content,userId,momentId,commentId) VALUES(?,?,?,?);`;
        const [result] = await connection.execute(statement,[content,id,momentId,commentId]);
        return result;
    }

    //修改评论
    async updateComment(id,content){
        const statement = `update comment set content = ? where id = ?;`;
        const [result] = await connection.execute(statement,[content,id]);
        return result;
    }
    //删除评论
    async removeComment(id){
        const statement = 'delete from comment where id = ?;';
        const [result] =await connection.execute(statement,[id]);
        return result;
    }

    //查询评论
    async queryComment(id){
        const statement = `select * from comment where momentId = ?;`;
        const [result] = await connection.execute(statement,[id])
        return result;
    }
}

module.exports = new CommentService();