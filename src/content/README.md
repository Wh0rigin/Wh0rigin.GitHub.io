# 添加博客文章

文章统一放在 `posts.ts`，列表、摘要、目录和文章详情从同一份内容生成。

1. 在 `posts` 数组中新增一个 `BlogPost` 对象。
2. `slug` 使用唯一的英文小写短横线名称，例如 `my-first-project`，对应 `/blog/my-first-project`。
3. 填写 `title`、`subtitle`、`date`（`YYYY-MM-DD`）、`summary`、`category`、`tags` 和预计阅读分钟数。`issue` 是展示编号，例如 `002`。
4. 在 `sections` 中填写各段的唯一 `id`、标题和 `paragraphs`。可以额外添加 `quote` 或 `items` 列表。
5. 正式文章省略 `demo`，或设为 `false`。

列表按日期倒序排列。构建时会为博客列表和每篇文章输出目录入口 HTML，使 GitHub Pages 支持直接打开、刷新文章链接。内容以 Vue 文本插值渲染，不需要写 HTML。
