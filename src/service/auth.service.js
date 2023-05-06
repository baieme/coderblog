const connection = require('../app/database.js')
class Auth{
    async permission(name ,id,user_id){
        const statement = `select * from ${name} WHERE id = ? AND userId = ?;`;
        const [result] = await connection.execute(statement,[id,user_id]);
        return result.length !== 0;
    }
}

module.exports = new Auth();