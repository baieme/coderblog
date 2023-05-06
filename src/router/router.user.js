const Router = require('koa-router');
const {userContent} = require('../controller/user.controller.js');
const {vertifyError} = require('../middle-ware/user.middleware.js');
const {handlerPassword} = require('../utils/handler.password.js');
const {queryAvatar} = require('../controller/user.controller')
const router = new Router({prefix:'/user'});


//用户登录
router.post('/',vertifyError,handlerPassword,userContent);

//查询用户的头像
router.get('/:userId/avatar',queryAvatar)

module.exports = router;