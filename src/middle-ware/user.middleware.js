const {USER_PASSWORD_ERROR,USER_ALREADY_REGISTER} = require('../contancts/user-types');
const {isLogin} = require('../service/user.service.js')
async function vertifyError(ctx,next){
    // 进行 非空的判断
    const {password,username} = ctx.request.body;
    console.log(password,username,'password')
    if(!password.trim() || !username.trim()){
        const error = new Error(USER_PASSWORD_ERROR);
        return ctx.app.emit('error',error,ctx);
    }

    //进行是否注册过判断
    const result = await isLogin(ctx.request.body);
    console.log(result)
    if(result.length !== 0){
        const error = new Error(USER_ALREADY_REGISTER);
        return ctx.app.emit('error',error,ctx);
    }
    console.log(result,)
    await next();
}

module.exports = {
    vertifyError
}