//导入express
const express = require("express");
//创建路由实例
const router = express.Router();

const userinfo_handler = require("../router_handler/userinfo");

// 导入验证数据的中间件
const expressJoi = require("@escook/express-joi");
// 导入需要的验证规则对象
const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require("../schema/user");

/**
 * @swagger
 * /my/userinfo:
 *   get:
 *     summary: 获取用户基本信息
 *     tags: [用户信息]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取成功
 *       401:
 *         description: 身份认证失败
 */
//获取用户基本信息路由
router.get("/userinfo", userinfo_handler.getUserInfo);

/**
 * @swagger
 * /my/userinfo:
 *   post:
 *     summary: 更新用户基本信息
 *     tags: [用户信息]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nickname
 *               - email
 *             properties:
 *               id:
 *                 type: integer
 *                 description: 用户 ID
 *               nickname:
 *                 type: string
 *                 description: 昵称
 *               email:
 *                 type: string
 *                 description: 邮箱
 *     responses:
 *       200:
 *         description: 更新成功
 */
//更新用户基本信息路由
router.post(
  "/userinfo",
  expressJoi(update_userinfo_schema),
  userinfo_handler.updateUserInfo
);

/**
 * @swagger
 * /my/updatepwd:
 *   post:
 *     summary: 更新用户密码
 *     tags: [用户信息]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - oldPwd
 *               - newPwd
 *             properties:
 *               oldPwd:
 *                 type: string
 *                 description: 旧密码
 *               newPwd:
 *                 type: string
 *                 description: 新密码
 *     responses:
 *       200:
 *         description: 更新成功
 */
//更新用户密码路由
router.post(
  "/updatepwd",
  expressJoi(update_password_schema),
  userinfo_handler.updatePassword
);

/**
 * @swagger
 * /my/update/avatar:
 *   post:
 *     summary: 更新用户头像
 *     tags: [用户信息]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 description: 头像 Base64 字符串
 *     responses:
 *       200:
 *         description: 更新成功
 */
//更新用户头像路由
router.post(
  "/update/avatar",
  expressJoi(update_avatar_schema),
  userinfo_handler.updateAvatar
);

//导出路由
module.exports = router;
