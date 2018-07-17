var express = require('express');
var router = express.Router();
const md5 = require("blueimp-md5");
const {UserModel} = require("../db/models");
const filter = {password: 0 ,_v : 0}


//注册路由
router.post('/register',function (req,res) {
  //获取请求参数
  const {username,password,type} = req.body;
  UserModel.findOne({username},function (err,user) {
    if(user){
      res.send({
        code:1,
        msg:"用户已存在"
      })
    }else{
      new UserModel({username,password:md5(password),type}).save(function (err,user) {

          res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7}) // 持久化cookie, 浏览器会保存在本地文件

          res.send({code: 0, data: {_id: user._id, username, type}})  // 返回的数据中不要携带pwd

      })
    }
  })
})

//登陆路由
router.post("/login",function (req,res) {
  //获取请求参数
  const {username,password} = req.body;
  //查找user
  UserModel.findOne({username,password:md5(password)},filter,function (err,user) {
    if(!user){
      res.send({
        code:1,
        msg:"用户名或密码错误"
      })
    }else{
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
      //如果user有值, 返回user
      res.send({code: 0, data: user}) // user中没有pwd
    }
  })
})
module.exports = router;
