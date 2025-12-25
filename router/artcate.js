//导入express
const express = require("express");
//创建路由实例
const router = express.Router();

const artcate_handler = require("../router_handler/artcate");

// 导入验证数据的中间件
const expressJoi = require("@escook/express-joi");
// 导入文章分类的验证模块
const {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema,
} = require("../schema/artcate");

/**
 * @swagger
 * /my/article/cates:
 *   get:
 *     summary: 获取文章分类列表
 *     tags: [文章分类]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取成功
 */
// 获取文章分类列表路由
router.get("/cates", artcate_handler.getArticleCates);

/**
 * @swagger
 * /my/article/addcates:
 *   post:
 *     summary: 新增文章分类
 *     tags: [文章分类]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - alias
 *             properties:
 *               name:
 *                 type: string
 *                 description: 分类名称
 *               alias:
 *                 type: string
 *                 description: 分类别名
 *     responses:
 *       200:
 *         description: 新增成功
 */
// 新增文章分类路由
router.post(
  "/addcates",
  expressJoi(add_cate_schema),
  artcate_handler.addArticleCate
);

/**
 * @swagger
 * /my/article/deletecate/{id}:
 *   get:
 *     summary: 删除文章分类
 *     tags: [文章分类]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 分类 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 删除成功
 */
// 删除文章分类路由
router.get(
  "/deletecate/:id",
  expressJoi(delete_cate_schema),
  artcate_handler.deleteCateById
);

/**
 * @swagger
 * /my/article/cates/{id}:
 *   get:
 *     summary: 根据 Id 获取文章分类
 *     tags: [文章分类]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 分类 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 获取成功
 */
// 根据 Id 获取文章分类路由
router.get(
  "/cates/:id",
  expressJoi(get_cate_schema),
  artcate_handler.getArtCateById
);

/**
 * @swagger
 * /my/article/updatecate:
 *   post:
 *     summary: 更新文章分类
 *     tags: [文章分类]
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
 *               - name
 *               - alias
 *             properties:
 *               id:
 *                 type: integer
 *                 description: 分类 ID
 *               name:
 *                 type: string
 *                 description: 分类名称
 *               alias:
 *                 type: string
 *                 description: 分类别名
 *     responses:
 *       200:
 *         description: 更新成功
 */
// 更新文章分类路由
router.post(
  "/updatecate",
  expressJoi(update_cate_schema),
  artcate_handler.updateCateById
);

module.exports = router;
