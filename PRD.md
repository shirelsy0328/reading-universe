# PRD: "我的阅读宇宙" (Reading Universe) - 个人品牌阅读档案馆

## 1. 产品愿景与概述 (Product Overview)

"我的阅读宇宙"是一个为读书博主/内容创作者打造的个人品牌网站。它不仅是一个记录阅读进度的工具，更是一个极具视觉高级感、像实体杂志一样的数字艺术馆。通过展示"在读状态"、"典藏书单"以及提供"AI 专属图书侍酒师"功能，向粉丝传递博主的阅读品味与精神世界。

**核心原则：**

- **前台纯展示**：网页端不对外暴露任何"添加书籍"或"管理员后台"的功能。保持极简、纯粹的阅读体验。
- **杂志风排版 (Editorial Design)**：大量留白，突出书籍封面，依赖高级的字体搭配和柔和的阴影。

## 2. 技术栈建议 (Tech Stack)

- **前端框架**：Next.js (React) 或 纯 HTML/JS (根据开发者偏好，建议 Next.js 以便未来扩展)。
- **样式框架**：Tailwind CSS。
- **字体**：
  - 标题/衬线体：Noto Serif SC (Google Fonts)
  - 正文/无衬线体：Inter (Google Fonts)
- **图标**：FontAwesome 或 Lucide React。
- **AI 接口**：Google Gemini API (用于 AI 荐书功能)。

## 3. 设计规范 (Design Tokens)

请在 Tailwind 配置文件中严格使用以下规范：

- **颜色 (Colors)**:
  - `brand-bg`: `#F7F5F0` (温暖的米色背景，羊皮纸质感)
  - `brand-text`: `#2C2C2C` (深炭黑色，用于主要文本)
  - `brand-accent`: `#8C6C52` (复古皮革色/大地色，用于点缀、按钮、特殊标识)
  - `brand-card`: `#FFFFFF` (纯白卡片底色)
- **阴影 (Shadows)**:
  - `elegant`: `0 10px 40px -10px rgba(0,0,0,0.04)` (极度柔和的默认阴影)
  - `elegant-hover`: `0 20px 40px -10px rgba(0,0,0,0.08)` (悬浮时的加深阴影)

## 4. 数据结构设计 (Data Models - 暂用 Mock 数据)

请在代码中创建一个包含以下结构的书籍 Mock 数据（JSON/Array），以便页面渲染：

```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;       // 封面图片地址
  rating: number;         // 评分，如 9.8
  status: 'reading' | 'archived' | 'want-to-read';
  // 针对"正在阅读"状态的额外字段
  progress?: string;      // 例如 "65%"
  quote?: string;         // 书中金句
  currentThoughts?: string; // 博主的实时感想
}
```

## 5. Cursor AI 角色设定

你是一个资深的前端开发工程师和 UX/UI 专家，精通 Next.js 和 Tailwind CSS。请严格按照以下 PRD 的要求进行代码生成和架构设计。注重代码的可读性、组件的复用性以及极简、高级的视觉呈现（利用阴影和留白，避免多余的边框）。

## 6. 核心页面模块 (Core Features & UI)

请在前端实现以下 5 个核心模块：

### 6.1 顶部导航栏 (Navbar)

- 左侧 Logo: 文本 `READING.UNIVERSE`。注意: 其中的点 (`.`) 需要使用品牌强调色 (`brand-accent`)。
- 右侧链接: 关于我、我的书房、AI 荐书。
- 响应式设计: 移动端自动折叠为汉堡菜单 (Hamburger Menu)。

### 6.2 英雄区域 (Hero Section)

- 大标题: 使用衬线体 (Serif font)，文案展示："在字里行间，构建我的精神宇宙"。
- 段落: 放置一段精简的个人简介文案。

### 6.3 正在阅读卡片 (Currently Reading)

- 数据源: 从 Mock 数据中过滤出 `status: 'reading'` 的书籍。
- 布局设计:
  - 采用左右分栏布局。
  - 左侧展示书籍封面（保持 2/3 长宽比例）。
  - 右侧展示书籍信息：阅读进度标签、书名、作者、摘录金句、个人感想。

### 6.4 典藏书单 (The Archives)

- 数据源: 从 Mock 数据中过滤出 `status: 'archived'` 的书籍。
- 响应式网格 (Grid): 移动端 2 列，桌面端 4 列。
- 微交互 (Hover 效果): 鼠标悬浮时，书籍封面轻微放大 (`scale-105`)，整个卡片整体上浮 (`-translate-y-2`)，并伴随平滑过渡动画 (`transition-all duration-300`)。
- 信息展示: 封面、书名、作者、评分。

### 6.5 AI 专属图书侍酒师 (AI Sommelier)

- 视觉风格: 采用深色卡片背景 (`#2C2C2C`)，边缘带模糊背景装饰 (Blur background decoration)。
- 交互逻辑:
  1. 提供用户输入框 (Input) + 发送按钮 (Button)。
  2. 点击发送后，按钮/区域显示 Loading 动画 (Spinning Icon)。
  3. API 对接: 调用 Gemini API 获取推荐。请求参数需配置 `responseSchema`，严格要求 AI 返回 JSON 格式数据：包含 `title`, `author`, `reason` 三个字段。
  4. 渲染结果: 成功获取 JSON 数据后，推荐书籍区块以淡入效果 (Fade-in) 呈现。

## 7. 非本次开发范围 (Out of Scope)

在本次 v1 开发中，不需要实现以下功能（请使用前端静态方案或 Mock 数据替代）：

- 真实的后端数据库（现阶段在前端使用本地 Mock JSON 数据集即可）。
- 管理员登录与认证系统。
- 数据库的增删改查 (CRUD) 逻辑（v1 阶段前端只负责读取和展示数据）。

## 8. 开发者执行指令 (Instructions for Cursor AI)

请按以下步骤和规范进行项目初始化和代码编写：

- [ ] **项目初始化**: 假设环境已使用 Next.js + Tailwind CSS 创建。请在全局配置好合适的 Google Fonts（例如大标题使用 Playfair Display 或 Noto Serif，正文使用 Inter 或 Noto Sans）。
- [ ] **组件拆分**: 请在 `components` 目录下创建独立的组件文件，至少包含：
  - `Header` (Navbar)
  - `Hero`
  - `CurrentlyReading`
  - `Archive`
  - `AISommelier`
- [ ] **视觉规范执行**:
  - 严格确保页面没有多余的、生硬的边框 (`border`)。
  - 充分利用阴影 (`shadow-sm`, `shadow-md`, `shadow-xl`) 和充裕的内边距/外边距 (`p`, `m`, `gap`) 来营造高级杂志感。
  - 预设 `brand-accent` 颜色（例如在 `tailwind.config.ts` 中配置）。
- [ ] **AI 逻辑实现**:
  - 在 `AISommelier` 组件中实现 `handleAiRecommendation` 异步函数。
  - 必须妥善处理 API 请求的 `loading` 状态和错误捕获 (`try/catch`)。
  - 必须确保解析 AI 返回的结果是合法的 JSON 格式再进行 UI 渲染。
- [ ] **极致响应式**: 使用 Tailwind 的断点 (`sm:`, `md:`, `lg:`, `xl:`)，确保所有组件在 iPhone 15 Pro（移动设备）到 27 寸显示器（超宽屏）之间均能完美适配，不出现横向滚动条或布局错乱。
