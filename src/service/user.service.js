const connection = require('../app/database.js')


class userService {
    // 进行用户的添加
    async userResponse(user){
        const {username,password} = user;
        const statement = `INSERT INTO USERS(name,password) VALUES (?,?);`
        //往数据库中插入信息
        const [result] = await connection.execute(statement,[username,password]);
        console.log(result);
        console.log(user);
        return '注册成功,开始登录';
    };
    // 判断用户是否登录
   async isLogin(ctx){
        // 
        const {username,password}  = ctx;
        const statement = `SELECT * FROM USERS WHERE name = ?;`;
        const [result] = await connection.execute(statement,[username]);
        return result;
    }

    //获得用户的头像
    async getAvatar(id){
        const statement = `select * from avatar where userId = ?;`;
        const [result] =await connection.execute(statement,[id]);
        return result;
    }

    async addAvatar(id,avatarUrl){
        const statement =  `update users set avatar = ? where id = ?;`;
        const [result] =await connection.execute(statement,[avatarUrl,id]);
        return result; 
    }
};




module.exports = new userService();