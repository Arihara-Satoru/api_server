//导入express
const express = require("express");
//创建路由实例
const router = express.Router();

//导入用户路由处理函数对应的模块
const userHandler = require("../router_handler/user");

// 1. 导入验证表单数据的中间件
const expressJoi = require("@escook/express-joi");
// 2. 导入需要验证规则对象
const { reg_login_schema } = require("../schema/user");

//注册新用户
router.post("/reguser", expressJoi(reg_login_schema), userHandler.regUser);

//登录
router.post("/login", expressJoi(reg_login_schema), userHandler.login);

//导出路由
module.exports = router;
