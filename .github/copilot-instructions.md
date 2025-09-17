# 指导 GitHub Copilot 的说明

欢迎来到我们的项目！本文档旨在为 AI 编码助手（如 GitHub Copilot）提供指导，以确保它能高效地融入我们的开发工作流，并遵循本项目的特定约定。

## 技术栈与架构

本前端项目基于 **Vue 3** 构建，并采用 **Vite** 作为构建工具。我们全量使用 **TypeScript** 以保证代码的类型安全。

- **核心框架**: Vue 3 (使用组合式 API 和 `<script setup>`)
- **构建工具**: Vite
- **UI 框架**: **Tailwind CSS** 搭配 **daisyUI** 组件库。请优先使用 daisyUI 提供的组件类名（如 `btn`, `card`, `drawer`）进行开发，以保持 UI 风格统一。
- **路由**: `vue-router` 用于处理客户端路由。
- **代码风格**: 我们遵循标准的 Prettier 与 ESLint 配置，请确保你的代码提交符合这些规范。

### 关键文件结构

- `src/main.ts`: 应用的入口文件，负责初始化 Vue 实例。
- `src/App.vue`: 根组件，定义了应用的主体布局，通常包含 `Header`、`RouterView` 和 `Footer`。
- `src/components/`: 存放可重用的 Vue 组件。
  - `Header.vue`: 全局响应式导航栏，支持桌面和移动端视图。
  - `Footer.vue`: 全局页脚。
  - `Hero.vue`: 用于展示首屏主要信息的 Hero 单元。
- `vite.config.ts`: Vite 的配置文件，已集成 Vue 和 Tailwind CSS 插件。

## 开发工作流

在开始开发前，请确保你已安装 `node.js@20` 或更高版本。

1.  **安装依赖**:
    ```bash
    npm install
    ```

2.  **启动开发服务器**:
    ```bash
    npm run dev
    ```
    该命令会启动一个热重载的开发服务器，你可以通过 `http://localhost:5173` 访问。

3.  **构建生产版本**:
    ```bash
    npm run build
    ```
    构建产物将输出到 `dist/` 目录。

4.  **运行测试**:
    ```bash
    npm run test
    ```
    我们使用 `vitest` 进行单元测试和组件测试。

## 编码约定与模式

### 组件设计

- **组合式 API**: 所有新组件都应使用 `<script setup>` 语法和组合式 API。
- **Props 定义**: 组件的 Props 应有明确的 TypeScript 类型定义，并附上 JSDoc 注释说明其用途。
- **数据流**: 遵循单向数据流原则。`App.vue` 作为顶层组件，负责获取和管理全局状态（如导航链接），并通过 Props 将数据传递给子组件。
- **响应式设计**: 组件应具备响应式能力。`Header.vue` 是一个很好的例子，它在大屏幕上显示水平菜单，在小屏幕上则切换为抽屉式导航。

### 样式

- **优先使用 daisyUI**: 在编写样式时，请首先查阅 [daisyUI 文档](https://daisyui.com/components/)，尽可能复用其组件和工具类。
- **避免自定义 CSS**: 除非必要，否则不要在组件的 `<style>` 块中添加自定义样式。如果确实需要，请添加 `scoped` 属性以避免全局污染。

### 路由

- **内外链区分**: 在 `Header.vue` 中，我们通过检查链接是否以 `/` 开头来区分内部路由（使用 `<router-link>`）和外部链接（使用 `<a>`）。在添加或修改导航链接时，请遵循此模式。

感谢你阅读这份指南！我们相信，遵循这些约定将有助于我们共同构建一个高质量、可维护的应用。
