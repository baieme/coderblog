const Router = require('koa-router');
const {verifyTest,permissionTest} = require('../middle-ware/login.middleware');
const {create,replay,update,remove,query} = require('../controller/comment.controller')
const router = new Router({prefix:'/comment'});

// 添加评论
router.post('/',verifyTest,create);

// 回复评论
router.post('/:commentId/replay',verifyTest,replay)

//修改评论
router.patch('/:commentId',verifyTest,permissionTest,update)

//删除评论
router.delete('/:commentId',verifyTest,permissionTest,remove)

//查询评论
router.get('/',query)
module.exports = router;