## 1. 移动端优化
- [x] 1.1 在 `main.css` 中添加安全区域支持 (`env(safe-area-inset-*)`)
- [x] 1.2 增大 `Navbar.vue` 中移动端菜单的点击区域 (最小 44×44px)
- [x] 1.3 在 `Navbar.vue` 中实现点击导航链接后自动关闭移动菜单
- [x] 1.4 添加全局平滑滚动 (`scroll-behavior: smooth`)
- [x] 1.5 为触摸设备优化 `touch-action` 属性

## 2. 用户交互优化
- [x] 2.1 在 `main.css` 中为按钮添加 `:active` 按压效果
- [x] 2.2 优化 `:focus-visible` 样式以提升键盘导航体验
- [x] 2.3 统一链接悬停效果和过渡动画

## 3. UI 细节优化
- [x] 3.1 统一卡片阴影和悬停效果
- [x] 3.2 优化动画曲线 (使用 `cubic-bezier`)
- [x] 3.3 为 Google Fonts 添加 `font-display: swap`
- [x] 3.4 调整 Hero 区域按钮在移动端的样式

## 4. 验证
- [x] 4.1 使用浏览器开发者工具在常见移动设备尺寸下测试
- [x] 4.2 确认 `npm run build` 无错误
- [ ] 4.3 通过本地预览 (`npm run dev`) 人工验证交互效果
