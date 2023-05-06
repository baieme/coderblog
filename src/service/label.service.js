const connection = require('../app/database')
class LabelService{
    //创建标签
    async createLabel(name){
        const statement =  `insert into label(name) values(?);`;
        const [result] =await connection.execute(statement,[name])
        return result
    }

    //检测是否有标签 
    async labelIsExist(name){
        const statement = `select * from label where name = ?;`;
        const [result] = await connection.execute(statement,[name]);
        return result[0]
    }

    //获得所有的标签
    async labelList(offset,size){
        const statement = `select * from label limit ?,?;`;
        const [result] = await connection.execute(statement,[offset,size]);
        return result;
    }
}
module.exports = new LabelService();