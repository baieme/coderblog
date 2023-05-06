const crypto = require('crypto');

// 处理密码的中间件
async function handlerPassword(ctx,next){
    let md5 = crypto.createHash('md5');
    const newPassword = md5.update(ctx.request.body.password).digest('hex');
    ctx.request.body.password = newPassword
    await next();
}
//处理秘密的函数
async function newPassword(ctx){
    let md5 = crypto.createHash('md5');
    const newPassword = md5.update(ctx.request.body.password).digest('hex');
    return newPassword;
}



module.exports = {
    handlerPassword,
    newPassword
}


