const Router = require('koa-router');
const {create,queryAll} = require('../controller/label.controller.js');
const {verifyTest} = require('../middle-ware/login.middleware')
const router = new Router({prefix:'/label'});

//新建一个标签
router.post('/',verifyTest,create);

//获得所有的标签
router.get('/',queryAll)

module.exports = router;