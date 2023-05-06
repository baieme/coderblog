const {
  USER_PASSWORD_ERROR,
  USER_IS_NOT_REGISTER,
  PASSWORD_IS_NOT_CORRECT,
  UNAUTHORIZATION,
  UNPERMISSION,
} = require("../contancts/user-types.js");
const { isRegister } = require("../service/login.service.js");
const { newPassword } = require("../utils/handler.password");
const jwt = require("jsonwebtoken");
const { APP_SECRETKEY } = require("../app/config");
const { permission } = require("../service/auth.service");
async function vertifyLogin(ctx, next) {
  // 进行非空判断
  const { username, password } = ctx.request.body;

  if (!username || !password || !username.trim() || !password.trim()) {
    const error = new Error(USER_PASSWORD_ERROR);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断是否注册过

  const result = await isRegister(ctx.request.body);
  console.log(result);
  if (result.length == 0) {
    const error = new Error(USER_IS_NOT_REGISTER);
    return ctx.app.emit("error", error, ctx);
  }

  // 注册过,判断密码是否正确
  const user = result[0];

  const codePassword = await newPassword(ctx);

  if (user.password !== codePassword) {
    const error = new Error(PASSWORD_IS_NOT_CORRECT);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;
  await next();
}
//是否登录
async function verifyTest(ctx, next) {

  // if()
  const token = ctx.header.authorization?.replace("Bearer ", "");
  //    console.log(token)
  if (!token) {
    const err = new Error(UNAUTHORIZATION);
    return ctx.app.emit("error", err, ctx);
  }

  try {
    const obj = jwt.verify(token, APP_SECRETKEY);
    //    ctx.user = obj;
    //    console.log()
    ctx.body = obj;
    await next();
  } catch (error) {
    const err = new Error(UNAUTHORIZATION);
    return ctx.app.emit("error", err, ctx);
  }

  //    await next();
}

async function permissionTest(ctx, next) {
  //获得登录人的id   和当前评论的id
  const { id } = ctx.body;

  const [tokenName] = Object.keys(ctx.params);
  const tName = tokenName.replace('Id','');
  const userId =  ctx.params[tokenName] 
  console.log(userId,id,tokenName)
  //进行数据查询
  const result = await permission(tName,userId, id);
  if (result) {
    await next();
  } else {
    const error = new Error(UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
}

module.exports = {
  vertifyLogin,
  verifyTest,
  permissionTest,
};
