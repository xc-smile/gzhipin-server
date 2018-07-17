//引入mongoose
const mongoose = require("mongoose");
//连接制定数据库
mongoose.connect("mongodb://localhost:27017/usersData")
const connect = mongoose.connection;

connect.on("connected",function () {
  console.log("数据库连接成功");
});

const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/laoban
  header: {type: String}, // 头像名称
  post: {type: String}, // 职位
  info: {type: String}, // 个人或职位简介
  company: {type: String}, // 公司名称
  salary: {type: String} // 工资
});
const UserModel = mongoose.model("user",userSchema);

module.exports = {UserModel};