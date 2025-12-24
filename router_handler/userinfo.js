//导入数据库操作模块
const db = require("../db");
// 导入 bcryptjs 模块
const bcrypt = require("bcryptjs");

//获取用户基本信息的处理函数
//通过token解析出来的用户id，查询用户的基本信息，并响应给客户端
exports.getUserInfo = (req, res) => {
  try {
    // 根据用户的 id，查询用户的基本信息
    // 注意：req.auth 是 express-jwt 中间件解析出来的用户信息
    const user = db.statements.getUserById.get(req.auth.id);

    // 如果查询结果为空
    if (!user) {
      return res.cc("获取用户信息失败！");
    }

    // 响应用户信息给客户端
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: user,
    });
  } catch (error) {
    res.cc(error);
  }
};

//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  try {
    // 根据用户的 id，更新用户的基本信息
    // 注意：req.auth 是 express-jwt 中间件解析出来的用户信息，包含 id 等信息
    const result = db.statements.updateUserById.run(
      req.body.nickname,
      req.body.email,
      req.auth.id
    );

    // 判断更新语句 affectsRows 的值
    if (result.changes === 0) {
      return res.cc("更新用户信息失败！");
    }

    // 更新成功
    res.cc("更新用户信息成功！", 0);
  } catch (error) {
    res.cc(error);
  }
};

//重置密码的处理函数
exports.updatePassword = (req, res) => {
  try {
    const { type, oldPassword, newPassword } = req.body;

    // 如果是更新密码（type === 0），需要校验旧密码
    if (type === 0) {
      // 1. 查询用户的基本信息
      const user = db.statements.getUserPasswordById.get(req.auth.id);
      if (!user) return res.cc("用户不存在！");

      // 2. 判断旧密码是否正确
      const compareResult = bcrypt.compareSync(oldPassword, user.password);
      if (!compareResult) return res.cc("旧密码错误！");
    }

    // 3. 对新密码进行加密（无论是更新还是重置）
    const hashedPwd = bcrypt.hashSync(newPassword, 10);

    // 4. 根据用户的 id，更新用户的密码
    const result = db.statements.updatePasswordById.run(hashedPwd, req.auth.id);

    // 判断更新语句 affectsRows 的值
    if (result.changes === 0) {
      return res.cc(type === 0 ? "更新密码失败！" : "重置密码失败！");
    }

    // 更新成功
    res.cc(type === 0 ? "更新密码成功！" : "重置密码成功！", 0);
  } catch (error) {
    res.cc(error);
  }
};

exports.updateAvatar = (req, res) => {
  try {
    // 1. 获取前端传过来的 Base64 图片字符串
    // 注意：在 schema 中定义的字段名是 avatar
    const { avatar } = req.body;

    // 2. 根据用户的 id，更新用户的头像
    const result = db.statements.updateAvatarById.run(avatar, req.auth.id);

    // 3. 判断更新语句 affectsRows 的值
    if (result.changes === 0) {
      return res.cc("更新用户头像失败！");
    }

    // 4. 更新成功
    res.cc("更新用户头像成功！", 0);
  } catch (error) {
    res.cc(error);
  }
};
