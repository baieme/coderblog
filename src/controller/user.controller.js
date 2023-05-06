const {userResponse,getAvatar} = require('../service/user.service.js');
const fs = require('fs')
class userController {
    async userContent(ctx,next){
        // const {}
        // 获得传入的参数

        // 对参数进行非空判断
      

        // 传入 数据库
        const result = await userResponse(ctx.request.body)
        //响应返回
        ctx.status = 200;
        ctx.body = result;
    }
    //查询用户的头像
    async queryAvatar(ctx,next){
        const {userId} = ctx.params;
        console.log(userId);
        //查询数据库
        const result = await getAvatar(userId);
        const filename = result[0].filename;
        console.log(filename);
        ctx.response.set('content-type',result[0].mimetype);
        ctx.body = fs.createReadStream('./upload/avatar/'+filename);
        
        // ctx.body = {
        //     message:'查询头像成功',
        //     code:200,
        //     result
        // }
    }
}

module.exports = new userController();