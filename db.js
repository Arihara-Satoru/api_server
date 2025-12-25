const Database = require("better-sqlite3");

// 连接到SQLite数据库文件，如果不存在会自动创建
const db = new Database("./database.db", { verbose: console.log });

// 创建用户表（如果不存在）
const createUsersTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nickname TEXT,
    email TEXT,
    user_pic TEXT
  )
`);
createUsersTable.run();

// 创建文章分类表（如果不存在）
const createArticleCateTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS ev_article_cate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    alias TEXT NOT NULL,
    is_delete INTEGER NOT NULL DEFAULT 0,
    author_id INTEGER NOT NULL
  )
`);
createArticleCateTable.run();

// 准备一些常用的SQL语句
const statements = {
  //插入新用户
  insertUser: db.prepare(
    "INSERT INTO users (username, password, nickname, email, user_pic) VALUES (?, ?, ?, ?, ?)"
  ),
  //根据用户名查询用户
  getUserByUsername: db.prepare("SELECT * FROM users WHERE username = ?"),
  //根据用户id查询用户
  getUserById: db.prepare(
    "SELECT id, username, nickname, email, user_pic FROM users WHERE id = ?"
  ),
  //根据用户id查询用户密码
  getUserPasswordById: db.prepare("SELECT password FROM users WHERE id = ?"),
  //查询所有用户
  getAllUsers: db.prepare(
    "SELECT id, username, nickname, email, user_pic FROM users"
  ),
  //根据用户id更新用户信息
  updateUserById: db.prepare(
    "UPDATE users SET nickname = ?, email = ? WHERE id = ?"
  ),
  //根据用户id更新用户密码
  updatePasswordById: db.prepare("UPDATE users SET password = ? WHERE id = ?"),
  //根据用户id更新用户头像
  updateAvatarById: db.prepare("UPDATE users SET user_pic = ? WHERE id = ?"),

  // --- 文章分类相关的 SQL 语句 ---
  // 查询当前用户所有未被删除的文章分类
  getAllArticleCates: db.prepare(
    "SELECT * FROM ev_article_cate WHERE is_delete = 0 AND author_id = ? ORDER BY id ASC"
  ),
  // 插入新文章分类
  insertArticleCate: db.prepare(
    "INSERT INTO ev_article_cate (name, alias, author_id) VALUES (?, ?, ?)"
  ),
  // 根据 id 查询文章分类
  getArticleCateById: db.prepare(
    "SELECT * FROM ev_article_cate WHERE id = ? AND author_id = ?"
  ),
  // 根据名称或别名查询文章分类（用于查重，限定在当前用户下）
  getArticleCateByNameOrAlias: db.prepare(
    "SELECT * FROM ev_article_cate WHERE (name = ? OR alias = ?) AND author_id = ?"
  ),
  // 根据 id 更新文章分类
  updateArticleCateById: db.prepare(
    "UPDATE ev_article_cate SET name = ?, alias = ? WHERE id = ? AND author_id = ?"
  ),
  // 根据 id 软删除文章分类
  deleteArticleCateById: db.prepare(
    "UPDATE ev_article_cate SET is_delete = 1 WHERE id = ? AND author_id = ?"
  ),
};

module.exports = {
  db,
  statements,
};
