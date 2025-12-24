const joi = require("joi");

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
};

// 更新用户信息的验证规则对象
exports.update_userinfo_schema = {
  body: {
    nickname: joi.string().required(),
    email: joi.string().email().required(),
  },
};

// 更新密码的验证规则对象
exports.update_password_schema = {
  body: {
    // type 为 0 表示更新密码（需校验旧密码），为 1 表示重置密码
    type: joi.number().valid(0, 1).required(),
    // 如果 type 为 0，则 oldPassword 必填
    oldPassword: joi.when("type", {
      is: 0,
      then: password,
      otherwise: joi.optional(),
    }),
    // 新密码必填，且如果 type 为 0，新旧密码不能相同
    newPassword: joi.when("type", {
      is: 0,
      then: joi.not(joi.ref("oldPassword")).concat(password).messages({
        "any.invalid": "新旧密码不能相同！",
      }),
      otherwise: password,
    }),
  },
};

// 更新头像的验证规则对象
exports.update_avatar_schema = {
  body: {
    avatar: joi.string().dataUri().required(),
  },
};
