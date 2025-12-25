// 导入数据库操作模块
const { statements } = require("../db");

// 获取文章分类列表的处理函数
exports.getArticleCates = (req, res) => {
  try {
    // 查询文章分类列表（未被删除的，且属于当前登录用户的）
    const articleCates = statements.getAllArticleCates.all(req.auth.id);
    res.send({
      status: 0,
      message: "获取文章分类列表成功！",
      data: articleCates,
    });
  } catch (error) {
    res.cc(error);
  }
};

// 新增文章分类的处理函数
exports.addArticleCate = (req, res) => {
  const { name, alias } = req.body;
  try {
    // 1. 查询分类名称或别名是否已存在（限定在当前用户下）
    const existingCate = statements.getArticleCateByNameOrAlias.get(
      name,
      alias,
      req.auth.id
    );
    if (existingCate) {
      if (existingCate.name === name && existingCate.alias === alias) {
        return res.cc("分类名称与别名被占用，请更换后重试！");
      }
      if (existingCate.name === name) {
        return res.cc("分类名称被占用，请更换后重试！");
      }
      if (existingCate.alias === alias) {
        return res.cc("分类别名被占用，请更换后重试！");
      }
    }

    // 2. 执行插入 SQL
    const result = statements.insertArticleCate.run(name, alias, req.auth.id);
    if (result.changes !== 1) {
      return res.cc("新增文章分类失败！");
    }

    res.cc("新增文章分类成功！", 0);
  } catch (error) {
    res.cc(error);
  }
};

// 根据 Id 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  try {
    const result = statements.deleteArticleCateById.run(
      req.params.id,
      req.auth.id
    );
    if (result.changes !== 1) {
      return res.cc("删除文章分类失败！");
    }
    res.cc("删除文章分类成功！", 0);
  } catch (error) {
    res.cc(error);
  }
};

// 根据 Id 获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
  try {
    const articleCate = statements.getArticleCateById.get(
      req.params.id,
      req.auth.id
    );
    if (!articleCate) {
      return res.cc("获取文章分类数据失败！");
    }
    res.send({
      status: 0,
      message: "获取文章分类数据成功！",
      data: articleCate,
    });
  } catch (error) {
    res.cc(error);
  }
};

// 根据 Id 更新文章分类的处理函数
exports.updateCateById = (req, res) => {
  const { id, name, alias } = req.body;
  try {
    // 1. 查询分类名称或别名是否被占用（排除当前修改的这个 ID，且限定在当前用户下）
    const existingCate = statements.getArticleCateByNameOrAlias.get(
      name,
      alias,
      req.auth.id
    );

    if (existingCate && existingCate.id !== parseInt(id)) {
      if (existingCate.name === name && existingCate.alias === alias) {
        return res.cc("分类名称与别名被占用，请更换后重试！");
      }
      if (existingCate.name === name) {
        return res.cc("分类名称被占用，请更换后重试！");
      }
      if (existingCate.alias === alias) {
        return res.cc("分类别名被占用，请更换后重试！");
      }
    }

    // 2. 执行更新 SQL
    const result = statements.updateArticleCateById.run(
      name,
      alias,
      id,
      req.auth.id
    );
    if (result.changes !== 1) {
      return res.cc("更新文章分类失败！");
    }

    res.cc("更新文章分类成功！", 0);
  } catch (error) {
    res.cc(error);
  }
};
