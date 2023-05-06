const Koa = require('koa');
const router = require('../router/router.user.js');
const AuthRouter = require('../router/router.login.js');
const {newRouter} = require('../router/index.js');
const {handleUser} = require('./error.handle.js');
const BodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(BodyParser());
newRouter(app);
// app.use(router.routes());
// app.use(AuthRouter.routes());
// app.use(AuthRouter.allowedMethods())
// // 判断某种请求方式有没有，如果没有则显示不允许
// app.use(router.allowedMethods());

app.on('error',handleUser);

module.exports = app;