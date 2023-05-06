const Router = require('koa-router');
const {verifyTest} = require('../middle-ware/login.middleware');
const {avatarHandler,pictureHandler,pictureResize} = require('../middle-ware/file.middleware');
const {addAvatar,addPicture} = require('../controller/file.controller');

const router = new Router({prefix:'/upload'});

//上传头像
router.post('/avatar',verifyTest,avatarHandler,addAvatar);

//上传图片
router.post('/picture',verifyTest,pictureHandler,pictureResize,addPicture);



module.exports = router;