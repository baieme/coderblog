const jwt = require('jsonwebtoken');
// const SECRETKEY = 'ABC123'
const {APP_SECRETKEY} = require('../app/config')
class loginController {
    async loginContent(ctx,next){
        
        //传入数据库
        const {name ,id } = ctx.user;
        const token = jwt.sign({id,name},APP_SECRETKEY,{
            expiresIn:60 * 60 * 24
        })
        
        ctx.status = 200;
        ctx.body = {
            name,
            id,
            token
        };
        
        // ctx.json
        // ctx
    }
}
module.exports = new loginController();