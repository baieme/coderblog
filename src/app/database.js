const mysql = require('mysql2');
const {APP_HOST, APP_BASEPORT, APP_DATABASE, APP_PASSWORD, APP_USER } = require('./config.js')
console.log(APP_HOST, APP_BASEPORT, APP_DATABASE, APP_PASSWORD, APP_USER)
//创建连接池
const connection = mysql.createPool({
    host:APP_HOST,
    port:APP_BASEPORT,
    database:APP_DATABASE,
    password:APP_PASSWORD,
    user:APP_USER
});

connection.getConnection((err,con)=>{
    console.log(err);
    con.connect((e)=>{
        console.log(e,'数据库连接成功')
    })
});



module.exports = connection.promise();