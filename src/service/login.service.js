const connection = require('../app/database.js')
async function isRegister(ctx){
    const {password,username} = ctx;

    //进行数据库查询

    const statement = `SELECT * FROM USERS WHERE name = ? `;

   const [result] =  await connection.execute(statement,[username]);
   


   return result;

}

module.exports = {
    isRegister
}