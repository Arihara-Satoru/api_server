//创建服务器实例
const express = require("express");
const app = express();
const port = 3000;

//配置中间件，解析请求体中的JSON数据
app.use(express.json());
//配置跨域中间件
app.use(require("cors")());
//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

//导入并使用路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);

//启动服务器
app.listen(port, () => {
  console.log(`服务器启动成功，请访问：http://localhost:${port}`);
});
