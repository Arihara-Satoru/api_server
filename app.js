//创建服务器实例
const express = require("express");
const app = express();
const port = 3000;

// 初始化数据库
require("./db");

//配置中间件，解析请求体中的JSON数据
app.use(express.json());
//配置跨域中间件
app.use(require("cors")());
//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 响应数据的中间件
app.use((req, res, next) => {
  // status = 0 为成功，status = 1 为失败；默认设为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是错误对象还是字符串
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

//导入并使用路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);

// 定义错误级别中间件
const joi = require("joi");
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 未知错误
  res.cc(err);
});

//启动服务器
app.listen(port, () => {
  console.log(`服务器启动成功，请访问：http://localhost:${port}`);
});
