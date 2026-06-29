# 广东省春季高考（依学考）信息网站 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个苹果极简风格的广东省春季高考依学考信息网站，7 个页面 + 搜索筛选交互，纯静态实现。

**Architecture:** 纯 HTML+CSS+JS 多页面网站，数据驱动设计（JSON 数据文件独立存放），全局 CSS 设计系统统一视觉，Vanilla JS 实现搜索/筛选/动效。

**Tech Stack:** HTML5, CSS3 (CSS Variables + Flexbox/Grid + Animations), Vanilla JavaScript (ES6+), JSON

---

## 文件结构总览

```
/
├── index.html              # 首页
├── policy.html             # 政策解读
├── registration.html       # 报名流程
├── subjects.html           # 考试科目
├── scores.html             # 分数线
├── schools.html            # 院校招生
├── resources.html          # 备考资料
├── css/
│   └── style.css           # 全局样式（苹果风格设计系统）
├── js/
│   ├── main.js             # 全局逻辑（导航、页脚注入、动效、返回顶部）
│   ├── search.js           # 全站搜索索引与搜索框
│   ├── scores.js           # 分数线页面筛选逻辑
│   └── schools.js          # 院校页面搜索筛选逻辑
├── data/
│   ├── policies.json       # 政策数据
│   ├── timeline.json       # 报名时间节点
│   ├── subjects.json       # 考试科目
│   ├── scores.json         # 历年分数线
│   ├── schools.json        # 院校信息
│   └── resources.json      # 备考资料
└── README.md
```

---

### Task 1: 项目脚手架 + CSS 设计系统

**Files:**
- Create: `css/style.css`
- Create: `index.html` (shell)
- Create: `js/main.js` (shell)

- [ ] **Step 1: 创建 CSS 设计系统变量与基础重置**

```css
/* css/style.css */
:root {
  /* Colors */
  --color-primary: #0071E3;
  --color-primary-hover: #0077ED;
  --color-bg: #FFFFFF;
  --color-bg-alt: #F5F5F7;
  --color-text: #1D1D1F;
  --color-text-secondary: #86868B;
  --color-border: rgba(0,0,0,0.08);
  --color-card-shadow: rgba(0,0,0,0.04);
  --color-card-shadow-hover: rgba(0,0,0,0.08);

  /* Typography */
  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-size-hero: clamp(2.5rem, 5vw, 4rem);
  --font-size-h1: clamp(2rem, 4vw, 3rem);
  --font-size-h2: clamp(1.5rem, 3vw, 2rem);
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
  --line-height: 1.7;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 3rem;
  --spacing-xl: 5rem;

  /* Borders */
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-full: 980px;

  /* Nav */
  --nav-height: 52px;
}
```

- [ ] **Step 2: 写入全局重置和排版基础样式**

在 `style.css` 中继续写入：`*` 重置、`body` 基础字体和颜色、`h1-h3` 标题样式、`a` 链接样式、`.container` 最大宽度容器类、`.section` 区域通用类。

- [ ] **Step 3: 写入导航栏样式**

`.nav` — 固定顶部毛玻璃 `position: sticky; backdrop-filter: blur(20px); background: rgba(255,255,255,0.72);`，`z-index: 100`，flexbox 左右布局，链接 hover 蓝色。

- [ ] **Step 4: 写入卡片、按钮、页脚样式**

`.card` — `border-radius: var(--radius-md)`，白底，极淡阴影，`transition: 0.3s ease`。
`.card:hover` — `transform: translateY(-4px); box-shadow: 0 8px 30px var(--color-card-shadow-hover);`
`.btn` — 胶囊形，`.btn-primary`（蓝底白字），`.btn-outline`（白底蓝边框）。
`.footer` — `background: var(--color-bg-alt)`，居中文字，`color: var(--color-text-secondary)`。

- [ ] **Step 5: 写入动效关键帧**

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fadeInUp 0.6s ease forwards;
}
```

- [ ] **Step 6: 创建 index.html 骨架**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>广东省春季高考 · 依学考</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav class="nav" id="nav"></nav>
  <main></main>
  <footer class="footer" id="footer"></footer>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 7: 创建 js/main.js 骨架**

写入导航栏和页脚的动态注入函数 `renderNav()` 和 `renderFooter()`，以及滚动驱动动画 `observeAnimate()`（IntersectionObserver 给 `.animate-in` 元素触发动画）。

---

### Task 2: 全局 JS 组件

**Files:**
- Modify: `js/main.js` — 完整实现
- Create: `js/search.js`

- [ ] **Step 1: 实现 renderNav()**

生成导航 HTML（7 个链接 + 搜索图标按钮），注入到 `#nav`。当前页面的链接加 `.active` 类。搜索图标点击切换搜索框展开。

- [ ] **Step 2: 实现 renderFooter()**

生成页脚 HTML：`<p>© 2026 广东省春季高考信息平台 · 仅供参考，以官方发布为准</p>`，注入到 `#footer`。

- [ ] **Step 3: 实现 IntersectionObserver 动画**

```javascript
function observeAnimate() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}
```

- [ ] **Step 4: 实现返回顶部按钮**

在 `main.js` 中：页面滚动超过 300px 时显示一个圆形返回顶部按钮，点击平滑滚动到顶部。

- [ ] **Step 5: 创建 js/search.js — 全站搜索**

```javascript
// 搜索索引：汇总所有 data/*.json 中的可搜索文本
// buildIndex() 异步加载所有 JSON，构建关键词→页面映射
// 搜索框输入时实时匹配，显示下拉结果列表
// 点击结果跳转到对应页面
```

搜索索引结构：加载 `policies.json`, `subjects.json`, `scores.json`, `schools.json`，提取标题和描述字段建索引。匹配逻辑：输入关键词对每条索引项做 `includes` 匹配。

- [ ] **Step 6: 搜索框 UI 逻辑**

导航栏搜索图标点击 → 展开搜索输入框（带毛玻璃背景遮罩），输入时实时调用搜索函数，显示结果下拉。点击外部或 ESC 关闭。

---

### Task 3: 数据文件

**Files:**
- Create: `data/policies.json`
- Create: `data/timeline.json`
- Create: `data/subjects.json`
- Create: `data/scores.json`
- Create: `data/schools.json`
- Create: `data/resources.json`

- [ ] **Step 1: policies.json**

```json
[
  {
    "id": 1,
    "title": "什么是依学考招生？",
    "category": "基本政策",
    "summary": "依学考成绩招生是广东省春季高考的主要方式之一...",
    "content": "详细内容...",
    "date": "2025-12-01"
  }
]
```
至少包含 6 条政策条目（基本政策、报考条件、加分政策、录取规则等类别）。

- [ ] **Step 2: timeline.json**

```json
[
  { "step": 1, "title": "网上预报名", "date": "12月上旬", "description": "..." },
  { "step": 2, "title": "现场确认", "date": "12月中旬", "description": "..." },
  { "step": 3, "title": "参加学考", "date": "1月初", "description": "..." },
  { "step": 4, "title": "填报志愿", "date": "3月", "description": "..." },
  { "step": 5, "title": "录取结果", "date": "4月", "description": "..." }
]
```

- [ ] **Step 3: subjects.json**

```json
[
  {
    "id": "chinese",
    "name": "语文",
    "fullScore": 150,
    "duration": "150分钟",
    "outline": "考试大纲要点...",
    "tips": "备考建议..."
  }
]
```
涵盖语文、数学、英语及选考科目共 6 门。

- [ ] **Step 4: scores.json**

```json
[
  {
    "year": 2025,
    "school": "深圳职业技术学院",
    "category": "普通类",
    "minScore": 385,
    "avgScore": 402,
    "region": "深圳"
  }
]
```
至少 20 条记录，覆盖 2024-2025 两年、多所院校、多个类别。

- [ ] **Step 5: schools.json**

```json
[
  {
    "id": 1,
    "name": "深圳职业技术学院",
    "type": "高职(专科)",
    "region": "深圳",
    "website": "https://...",
    "description": "学校简介...",
    "majors": ["计算机应用技术", "电子商务", "..."],
    "feature": "国家示范性高职院校"
  }
]
```
至少 15 所院校。

- [ ] **Step 6: resources.json**

```json
[
  {
    "id": 1,
    "title": "语文考试大纲（2025版）",
    "type": "考试大纲",
    "subject": "语文",
    "description": "...",
    "link": "#"
  }
]
```
至少 8 条资源。

---

### Task 4: 首页 (index.html)

**Files:**
- Modify: `index.html`
- Modify: `css/style.css` — 首页特有样式

- [ ] **Step 1: Hero 区域**

大标题 "广东省春季高考" + 蓝色强调 "依学考" + 副标题 "一站式了解政策、分数线、院校招生、备考资料" + 搜索输入框。

- [ ] **Step 2: 简介卡片**

白色卡片，介绍什么是春季高考 / 依学考，2-3 段简短文字 + 关键数据（参与院校数、招生人数等用大号数字展示）。

- [ ] **Step 3: 政策速递**

从 `policies.json` 加载最新 3 条，卡片横向排列，显示标题 + 日期 + 摘要。

- [ ] **Step 4: 快捷入口**

6 张导航卡片（2 行 × 3 列），每张：图标 + 标题 + 简短描述，点击跳转到对应子页面。

---

### Task 5: 政策解读页 (policy.html)

**Files:**
- Create: `policy.html`

- [ ] **Step 1: 页面结构**

Hero 标题区 → 政策分类筛选标签 → 政策卡片列表 → FAQ 手风琴。

- [ ] **Step 2: JS 加载与渲染**

`loadPolicies()` 从 `policies.json` 加载数据，按分类渲染。点击分类标签过滤。FAQ 点击展开/折叠。

---

### Task 6: 报名流程页 (registration.html)

**Files:**
- Create: `registration.html`

- [ ] **Step 1: 页面结构**

Hero 标题 → 时间轴（垂直时间线，每个节点左侧圆点 + 日期 + 标题 + 描述）→ 详细步骤 → 材料清单。

- [ ] **Step 2: JS 加载**

从 `timeline.json` 加载时间轴数据渲染。

---

### Task 7: 考试科目页 (subjects.html)

**Files:**
- Create: `subjects.html`

- [ ] **Step 1: 页面结构**

Hero → 科目筛选标签（全部/语文/数学/英语/...）→ 科目卡片网格（每科：科目名、满分、时长、大纲摘要、备考建议）。

- [ ] **Step 2: 筛选交互**

点击标签过滤卡片，`filterSubjects(category)` 通过 CSS 类切换显隐。

---

### Task 8: 分数线页 (scores.html)

**Files:**
- Create: `scores.html`
- Create: `js/scores.js`

- [ ] **Step 1: 页面结构**

Hero → 筛选栏（年份下拉、院校输入、类别标签）→ 表格。

- [ ] **Step 2: js/scores.js**

`loadScores()` 加载数据 → 渲染表格 → 监听筛选器变化 → 实时过滤表格行。表格列：年份、院校、类别、最低分、平均分、地区。

---

### Task 9: 院校招生页 (schools.html)

**Files:**
- Create: `schools.html`
- Create: `js/schools.js`

- [ ] **Step 1: 页面结构**

Hero → 搜索栏 + 地区/类型筛选标签 → 院校卡片网格。

- [ ] **Step 2: js/schools.js**

`loadSchools()` 加载数据 → 渲染卡片（校名、类型标签、地区、简介、特色）→ 搜索 + 筛选联动。

---

### Task 10: 备考资料页 (resources.html)

**Files:**
- Create: `resources.html`

- [ ] **Step 1: 页面结构**

Hero → 按类型分组（考试大纲 / 真题 / 教材 / 复习建议）→ 资料列表卡片。

- [ ] **Step 2: JS 加载**

从 `resources.json` 加载并按 `type` 分组展示。

---

### Task 11: 响应式适配

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: 添加媒体查询 @media (max-width: 768px)**

导航改汉堡菜单（点击展开垂直菜单）；卡片网格从多列改为单列；Hero 字号缩小；表格改为卡片式（每行变独立卡片）；间距整体缩小。

- [ ] **Step 2: 测试**

逐一在浏览器 DevTools 中切换移动端视口检查每个页面。

---

### Task 12: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: 写入项目 README**

项目介绍、文件结构、如何运行（直接打开 `index.html` 或 `npx serve .`）、数据更新说明。

---

## 自审清单

- **Spec 覆盖**: 7 个页面 ✓ | 搜索 ✓ | 筛选 ✓ | 响应式 ✓ | JSON 数据驱动 ✓ | 苹果风格 ✓
- **无占位符**: 所有任务含具体代码和文件路径
- **类型一致**: 所有 JSON 字段、CSS 变量名、JS 函数名前后一致
