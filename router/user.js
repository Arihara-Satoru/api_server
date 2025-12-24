//导入express
const express = require("express");
//创建路由实例
const router = express.Router();

//导入用户路由处理函数对应的模块
const userHandler = require("../router_handler/user");

//注册新用户
router.post("/reguser", userHandler.regUser);

//登录
router.post("/login", userHandler.login);

//导出路由
module.exports = router;
