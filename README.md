### 算法可视化

### 目前完成

- 排序算法
- 二叉树的构建、二叉搜索

### 后续待添加功能

- 图
- 数学函数

### GitHub Pages 部署

当前采用 **GitHub Pages** 发布（不使用 docker-compose/自建服务器），并已配置 GitHub Actions 自动部署流程：

1. 推送到 `main` 分支后会自动执行构建并部署到 GitHub Pages。
2. 也可以在 Actions 页面手动触发 `Deploy to GitHub Pages`。
3. 页面地址通常为：`https://<你的用户名>.github.io/<仓库名>/`。
4. 在仓库 `Settings -> Pages` 中，将 `Build and deployment` 的 `Source` 设为 **GitHub Actions**。

> 若仓库默认分支不是 `main`，请修改 `.github/workflows/deploy-pages.yml` 中的分支配置。
