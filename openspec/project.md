# 项目上下文

## 目的
这是一个基于 Vue 3 和 Element Plus 的 Web 应用程序平台，旨在提供具有丰富互动体验（如游戏模块和汉字数据库）的学习工具。目前集成了国际化支持（zh-CN, en-US等）和多种互动游戏组件。

## 技术栈
- **核心框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **语言**: TypeScript, HTML5, CSS3
- **UI 库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **国际化**: vue-i18n
- **图标**: @element-plus/icons-vue

## 项目约定

### 代码风格
- 使用 ESLint 和 Prettier 进行代码格式化。
- 组件命名遵循 PascalCase (如 `LanguageSwitcher.vue`)。
- 组合式 API (Software Composition API) 优先。
- 严格遵循 TypeScript 类型定义。

### 架构模式
- **组件化**: 通用组件置于 `src/components`，页面级组件置于 `src/views`。
- **模块化**: 国际化文件分模块管理 (`src/i18n`)。
- **状态管理**: 使用 Pinia Store 进行全局状态管理。

### 测试策略
- 使用 `openspec-cn validate` 验证规范和变更。
- (建议) 引入 Vitest 进行单元测试。

### Git工作流
- 分支策略：`main` 为主分支。
- 变更流程：遵循 OpenSpec 规范，先创建提案 (proposal)，再实施 (implementation)。

## 领域上下文
- **汉字学习**: 包含汉字数据库、拼音、笔画等学习模块。
- **游戏化**: "组词连连看"、"听音辨物" 等寓教于乐的游戏。

## 重要约束
- **Windows 兼容性**: 开发环境为 Windows，需注意路径分隔符和命令兼容性。
- **性能**: 移动端体验优化（如触摸响应、布局适配）。

## 外部依赖
- Cloudflare / Tencent Cloud (部署目标)
- Element Plus 组件库资源

