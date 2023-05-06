const {
  USER_PASSWORD_ERROR,
  USER_ALREADY_REGISTER,
  USER_IS_NOT_REGISTER,
  PASSWORD_IS_NOT_CORRECT,
  UNAUTHORIZATION,
  UNPERMISSION
} = require("../contancts/user-types");
function handleUser(error, ctx) {
  switch (error.message) {
    case USER_PASSWORD_ERROR:
      ctx.status = 400;
      ctx.body = "用户名或者密码不能为空";
      break;
    case USER_ALREADY_REGISTER:
      ctx.status = 409;
      ctx.body = "该用户已经注册过了";
      break;
    case USER_IS_NOT_REGISTER:
      ctx.status = 400;
      ctx.body = "该用户未注册";
      break;
    case PASSWORD_IS_NOT_CORRECT:
      ctx.status = 400;
      ctx.body = "用户密码错误";
      break;
    case UNAUTHORIZATION:
      ctx.status = 401;
      ctx.body = '未授权';
      break;
    case UNPERMISSION:
      ctx.status = 401;
      ctx.body ='没有权限修改';
      break;
    default:
      ctx.status = 404;
      ctx.body = "not found";
  }
}

module.exports = {
  handleUser,
};
