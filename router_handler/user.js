//导入数据库模块
const { statements } = require("../db");
// 导入 bcryptjs
const bcrypt = require("bcryptjs");

//新用户注册函数
exports.regUser = (req, res) => {
  const { username, password } = req.body;

  try {
    // 检查用户名是否已存在
    const existingUser = statements.getUserByUsername.get(username);
    if (existingUser) {
      return res.cc("用户名已存在");
    }

    // 对密码进行加密
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 插入新用户
    const { nickname, email, user_pic } = req.body;
    statements.insertUser.run(
      username,
      hashedPassword,
      nickname || null,
      email || null,
      user_pic || null
    );
    res.cc("注册成功", 0);
  } catch (error) {
    res.cc(error);
  }
};

//登录函数
exports.login = (req, res) => {
  const { username, password } = req.body;

  try {
    const user = statements.getUserByUsername.get(username);
    if (!user) {
      return res.cc("用户名不存在");
    }

    // 验证密码是否正确
    const compareResult = bcrypt.compareSync(password, user.password);
    if (!compareResult) {
      return res.cc("密码错误");
    }

    res.send({
      status: 0,
      message: "登录成功",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    res.cc(error);
  }
};
