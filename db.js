const Database = require("better-sqlite3");

// 连接到SQLite数据库文件，如果不存在会自动创建
const db = new Database("./database.db", { verbose: console.log });

// 创建用户表（如果不存在）
const createTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nickname TEXT,
    email TEXT,
    user_pic TEXT
  )
`);
createTable.run();

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
};

module.exports = {
  db,
  statements,
};
