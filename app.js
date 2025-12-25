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

// 导入配置文件
const config = require("./config");

// 导入 Swagger 相关模块
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger 配置
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Server 接口文档",
      version: "1.0.0",
      description: "基于 Express 的 API Server 接口文档",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // 指定包含 Swagger 注释的文件路径
  apis: ["./router/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 解析 token 的中间件
const { expressjwt: jwt } = require("express-jwt");

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);

//导入并使用路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);
app.use("/my", require("./router/userinfo"));
app.use("/my/article", require("./router/artcate"));

// 定义错误级别中间件
const joi = require("joi");
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 身份认证失败后的错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  // 未知错误
  res.cc(err);
});

//启动服务器
app.listen(port, () => {
  console.log(`服务器启动成功，请访问：http://localhost:${port}`);
});
