const Router = require('koa-router');
const {loginContent} = require('../controller/login.controller.js')
const {vertifyLogin,verifyTest} = require('../middle-ware/login.middleware.js')
const router = new Router({prefix:'/login'});



router.post('/',vertifyLogin,loginContent);
router.post('/test',verifyTest)
module.exports = router;