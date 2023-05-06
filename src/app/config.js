const dotenv = require("dotenv");
dotenv.config();

const { APP_PORT,APP_SECRETKEY, APP_HOST, APP_BASEPORT, APP_DATABASE, APP_PASSWORD, APP_USER } =
  process.env;

module.exports = {
  APP_PORT,
  APP_HOST,
  APP_BASEPORT,
  APP_DATABASE,
  APP_PASSWORD,
  APP_USER,
  APP_SECRETKEY,
};
