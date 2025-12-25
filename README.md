# API Server - 后端接口项目

这是一个基于 **Node.js** 和 **Express** 框架开发的后端 API 服务项目。项目集成了用户认证、数据验证、数据库持久化以及 Swagger 接口文档，适用于学习和作为中小型项目的后端基础。

本项目对应的前端是 [Vue3 大事件管理后台](https://github.com/Arihara-Satoru/vue3-big-event-admin)。

## 🚀 技术栈

- **后端框架**: [Express](https://expressjs.com/) (v5.x)
- **数据库**: [SQLite](https://www.sqlite.org/) (通过 `better-sqlite3` 驱动)
- **身份认证**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [express-jwt](https://github.com/auth0/express-jwt)
- **数据验证**: [Joi](https://joi.dev/) & [@escook/express-joi](https://github.com/escook/express-joi)
- **接口文档**: [Swagger](https://swagger.io/) (`swagger-jsdoc` & `swagger-ui-express`)
- **密码加密**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **跨域处理**: [CORS](https://github.com/expressjs/cors)

## 📂 项目结构

```text
api_server/
├── router/             # 路由模块，定义接口路径
├── router_handler/     # 路由处理函数，编写业务逻辑
├── schema/             # 数据验证模块，定义请求参数规则
├── db.js               # 数据库连接与初始化
├── config.js           # 全局配置文件（如 JWT 密钥）
├── app.js              # 项目入口文件，配置中间件和路由
├── package.json        # 项目依赖与脚本配置
└── database.db         # SQLite 数据库文件（自动生成）
```

## 🛠️ 核心功能

1.  **用户管理**：
    - 注册与登录（密码采用 bcryptjs 加密存储）。
    - 基于 JWT 的身份认证机制。
2.  **个人中心**：
    - 获取用户基本信息。
    - 更新用户信息（昵称、邮箱）。
    - 重置密码。
    - 更换头像（支持 Base64 格式）。
3.  **文章分类管理**：
    - 文章分类的增、删、改、查。
    - 分类名称与别名的唯一性校验。
4.  **自动化文档**：
    - 集成 Swagger，自动生成交互式 API 文档。

## 🏁 快速开始

### 1. 安装依赖

在项目根目录下运行：

```bash
npm install
```

### 2. 启动项目

使用 nodemon 启动开发服务器：

```bash
npm run dev
```

服务器默认运行在 `http://localhost:3000`。

### 3. 查看 API 文档

启动项目后，在浏览器访问：
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 🔒 安全说明

- 项目使用了 `express-jwt` 中间件对 `/my` 开头的接口进行保护。
- 访问受保护接口时，需在请求头中携带 `Authorization: Bearer <token>`。
- 密码在存储前会经过 10 轮的 salt 加密。

## 📝 许可证

本项目遵循 [ISC](LICENSE) 许可证。
