const Router = require('koa-router');

const router = new Router({prefix:'/moment'});

const {verifyTest,permissionTest} = require('../middle-ware/login.middleware')

const {createMoment,getMomentById, getMomentAll,update,remove,add,queryPicture} = require('../controller/moment.controller.js')
const {verifyLabelIsExist} = require('../middle-ware/label.middleware');
//插入评论
router.post('/',verifyTest,createMoment);

//查询评论(单个)
router.get('/:momentId',getMomentById);

//查询评论(多个)
router.get('/',getMomentAll);

//修改评论 
// 逻辑1：验证是否登录了  逻辑2：是否有权限进行修改  逻辑3：进行修改

router.patch('/:momentId',verifyTest,permissionTest,update)


// 删除评论
router.delete('/:momentId',verifyTest,permissionTest,remove)

// 给动态添加标签
router.post('/:momentId/label',verifyTest,permissionTest,verifyLabelIsExist,add)


//查看动态图片
router.get('/images/:picPath',queryPicture);
module.exports = router;