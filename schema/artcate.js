const joi = require("joi");

/**
 * string() 值必须是字符串
 * alphanum() 值必须是字母和数字的组合
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值必填项
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 分类名称和别名的验证规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();

// id 的验证规则
const id = joi.number().integer().min(1).required();

// 新增分类的验证规则对象
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
};

// 删除分类的验证规则对象
exports.delete_cate_schema = {
  params: {
    id,
  },
};

// 根据 Id 获取分类的验证规则对象
exports.get_cate_schema = {
  params: {
    id,
  },
};

// 更新分类的验证规则对象
exports.update_cate_schema = {
  body: {
    id,
    name,
    alias,
  },
};
