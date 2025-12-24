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
  insertUser: db.prepare(
    "INSERT INTO users (username, password, nickname, email, user_pic) VALUES (?, ?, ?, ?, ?)"
  ),
  getUserByUsername: db.prepare("SELECT * FROM users WHERE username = ?"),
  getAllUsers: db.prepare(
    "SELECT id, username, nickname, email, user_pic FROM users"
  ),
};

module.exports = {
  db,
  statements,
};
