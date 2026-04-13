# Claude Code 工具完整参考手册

> 本文档详细列出了 Claude Code 中使用的所有工具（Tools），包括工具名称、功能描述、参数说明、输出格式、使用场景和注意事项。

---

## 工具总览表（点击工具名跳转到详细说明）

| # | 工具名 | 类别 | 只读 | 功能门控 | 核心功能 |
|---|--------|------|------|---------|---------|
| 1 | [`Read`](#read) | 文件操作 | 是 | 无 | 读取文件（文本/图片/PDF/Notebook） |
| 2 | [`Edit`](#edit) | 文件操作 | 否 | 无 | 精确字符串替换编辑文件 |
| 3 | [`Write`](#write) | 文件操作 | 否 | 无 | 创建或完全覆盖文件 |
| 4 | [`NotebookEdit`](#notebookedit) | 文件操作 | 否 | 无 | 编辑 Jupyter Notebook 单元格 |
| 5 | [`Glob`](#glob) | 搜索 | 是 | 无 | 文件名模式匹配 |
| 6 | [`Grep`](#grep) | 搜索 | 是 | 无 | 文件内容正则搜索 |
| 7 | [`Bash`](#bash) | 命令执行 | 否 | 无 | 执行 shell 命令 |
| 8 | [`PowerShell`](#powershell) | 命令执行 | 否 | Windows | 执行 PowerShell 命令 |
| 9 | [`WebFetch`](#webfetch) | 网络 | 是 | 无 | 获取网页内容并 AI 处理 |
| 10 | [`WebSearch`](#websearch) | 网络 | 是 | 特定模型 | 网络搜索 |
| 11 | [`Agent`](#agent) | 代理 | 否 | 无 | 启动子代理处理复杂任务 |
| 12 | [`TaskCreate`](#taskcreate) | 任务管理 | 否 | 无 | 创建任务 |
| 13 | [`TaskGet`](#taskget) | 任务管理 | 是 | 无 | 获取任务详情 |
| 14 | [`TaskList`](#tasklist) | 任务管理 | 是 | 无 | 列出所有任务 |
| 15 | [`TaskUpdate`](#taskupdate) | 任务管理 | 否 | 无 | 更新任务状态 |
| 16 | [`TaskOutput`](#taskoutput) | 任务管理 | 是 | 无 | 获取任务输出（已弃用） |
| 17 | [`TaskStop`](#taskstop) | 任务管理 | 否 | 无 | 停止后台任务 |
| 18 | [`SendMessage`](#sendmessage) | 通信 | 否 | 代理群组 | 向团队成员发消息 |
| 19 | [`AskUserQuestion`](#askuserquestion) | 用户交互 | 是 | 无 | 向用户提多选题 |
| 20 | [`Brief` / `SendUserMessage`](#brief) | 用户交互 | 是 | Brief 模式 | 向用户发送消息和附件 |
| 21 | [`TodoWrite`](#todowrite) | 用户交互 | 否 | TodoV2 禁用 | 管理待办清单 |
| 22 | [`EnterPlanMode`](#enterplanmode) | 计划 | 是 | 无 | 进入计划模式 |
| 23 | [`ExitPlanMode`](#exitplanmode) | 计划 | 否 | 无 | 退出计划模式 |
| 24 | [`EnterWorktree`](#enterworktree) | 工作区 | 否 | 无 | 创建隔离 git worktree |
| 25 | [`ExitWorktree`](#exitworktree) | 工作区 | 否 | 无 | 退出并清理 worktree |
| 26 | [`CronCreate`](#croncreate) | 调度 | 否 | `AGENT_TRIGGERS` | 创建定时任务 |
| 27 | [`CronDelete`](#crondelete) | 调度 | 否 | `AGENT_TRIGGERS` | 删除定时任务 |
| 28 | [`CronList`](#cronlist) | 调度 | 是 | `AGENT_TRIGGERS` | 列出定时任务 |
| 29 | [`ScheduleWakeup`](#schedulewakeup) | 调度 | 否 | `/loop` 模式 | 调度循环唤醒 |
| 30 | [`RemoteTrigger`](#remotetrigger) | 调度 | 否 | 功能标志 | 远程触发器 API |
| 31 | [`LSP`](#lsp) | 代码智能 | 是 | 无 | 语言服务协议操作 |
| 32 | [`ToolSearch`](#toolsearch) | 管理 | 是 | 无 | 搜索延迟加载工具 |
| 33 | [`Skill`](#skill) | 管理 | 否 | 无 | 执行技能/斜杠命令 |
| 34 | [`MCPTool`](#mcptool) | MCP | 否 | MCP 配置 | 执行 MCP 服务器工具 |
| 35 | [`ListMcpResources`](#listmcpresources) | MCP | 是 | MCP 配置 | 列出 MCP 资源 |
| 36 | [`ReadMcpResource`](#readmcpresource) | MCP | 是 | MCP 配置 | 读取 MCP 资源 |
| 37 | [`Config`](#config) | 配置 | 否 | 无 | 管理配置设置 |
| 38 | [`TeamCreate`](#teamcreate) | 团队 | 否 | 代理群组 | 创建多代理团队 |
| 39 | [`TeamDelete`](#teamdelete) | 团队 | 否 | 代理群组 | 删除团队 |
| 40 | [`Sleep`](#sleep) | 实验性 | 是 | `PROACTIVE`/`KAIROS` | 等待指定时长 |
| 41 | [`Monitor`](#monitor) | 实验性 | 是 | `MONITOR_TOOL` | 监控后台进程 |
| 42 | [`REPL`](#repl) | 实验性 | - | `USER_TYPE=ant` | 交互式 REPL 模式 |
| 43+ | [其他功能门控工具](#other-experimental) | 实验性 | - | 各自功能标志 | WebBrowser, Workflow 等 |

---

## 一、文件操作类工具

### 1. Read（文件读取） {#read}

| 项目 | 说明 |
|------|------|
| **工具名** | `Read` |
| **源文件** | `src/tools/FileReadTool/FileReadTool.ts` |
| **功能** | 从本地文件系统读取文件内容，支持文本、图片、PDF、Jupyter Notebook 等多种格式 |
| **只读** | 是 |
| **并发安全** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `file_path` | string | 是 | 文件的绝对路径 |
| `offset` | number | 否 | 开始读取的行号（用于部分读取） |
| `limit` | number | 否 | 读取的行数（默认 2000 行） |
| `pages` | string | 否 | PDF 页码范围，如 `"1-5"`、`"3"`、`"10-20"`，每次最多 20 页 |

**输出格式（联合类型）：**

- **文本文件**：返回 `type: "text"`，包含文件内容、行号、总行数等
- **图片文件**：返回 `type: "image"`，包含 base64 编码数据、MIME 类型、尺寸
- **Jupyter Notebook**：返回 `type: "notebook"`，包含所有单元格及其输出
- **PDF 文件**：返回 `type: "pdf"` 或 `type: "parts"`（分页提取）

**使用场景：**
- 读取源代码文件以理解实现
- 查看配置文件内容
- 读取图片文件（Claude 是多模态模型）
- 读取 PDF 文档
- 在编辑文件前必须先读取（Edit/Write 工具的前置条件）

**注意事项：**
- 必须使用绝对路径
- 默认读取前 2000 行
- 大 PDF（超过 10 页）必须指定 `pages` 参数
- 只能读文件，不能读目录

---

### 2. Edit（文件编辑） {#edit}

| 项目 | 说明 |
|------|------|
| **工具名** | `Edit` |
| **源文件** | `src/tools/FileEditTool/FileEditTool.ts` |
| **功能** | 通过精确的字符串替换编辑文件，只发送差异部分 |
| **只读** | 否 |
| **前置条件** | 必须先用 `Read` 读取过该文件 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `file_path` | string | 是 | 要编辑的文件的绝对路径 |
| `old_string` | string | 是 | 要查找并替换的精确字符串 |
| `new_string` | string | 是 | 替换后的文本（必须与 `old_string` 不同） |
| `replace_all` | boolean | 否 | 是否替换所有匹配项（默认 `false`，仅替换第一个） |

**输出格式：**
- `filePath`：编辑的文件路径
- `structuredPatch`：显示变更的差异补丁
- `originalFile`：编辑前的原始内容
- `gitDiff`：Git 差异信息（可选）

**使用场景：**
- 修改代码中的特定部分
- 修复 bug
- 重构代码片段
- 批量重命名变量（使用 `replace_all`）

**注意事项：**
- `old_string` 必须在文件中唯一匹配，否则编辑失败
- 如果不唯一，需提供更多上下文使其唯一，或使用 `replace_all`
- 不能编辑 `.ipynb` 文件，需使用 `NotebookEdit`
- 文件最大 1 GiB
- 保留原始缩进和格式

---

### 3. Write（文件写入） {#write}

| 项目 | 说明 |
|------|------|
| **工具名** | `Write` |
| **源文件** | `src/tools/FileWriteTool/FileWriteTool.ts` |
| **功能** | 将内容写入文件，支持创建新文件或完全覆盖现有文件 |
| **只读** | 否 |
| **前置条件** | 覆盖已有文件时必须先 `Read` |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `file_path` | string | 是 | 文件的绝对路径 |
| `content` | string | 是 | 要写入的内容 |

**输出格式：**
- `type`：`"create"`（新建）或 `"update"`（更新）
- `filePath`：写入的文件路径
- `structuredPatch`：差异补丁
- `originalFile`：更新前的原始内容（新建时为 `null`）

**使用场景：**
- 创建全新的文件
- 完全重写文件内容
- 对于修改现有文件，优先使用 `Edit`（只传差异更高效）

**注意事项：**
- 会自动创建父目录
- 覆盖已有文件前必须先读取
- 不要创建不必要的文件
- 不要创建 README 或文档文件（除非明确要求）

---

### 4. NotebookEdit（Jupyter Notebook 编辑） {#notebookedit}

| 项目 | 说明 |
|------|------|
| **工具名** | `NotebookEdit` |
| **源文件** | `src/tools/NotebookEditTool/NotebookEditTool.ts` |
| **功能** | 编辑 Jupyter Notebook（`.ipynb`）的单元格 |
| **只读** | 否 |
| **前置条件** | 必须先读取 Notebook |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `notebook_path` | string | 是 | Notebook 文件的绝对路径 |
| `cell_id` | string | 否 | 要编辑的单元格 ID（插入模式下在此单元格之后插入） |
| `new_source` | string | 是 | 单元格的新内容 |
| `cell_type` | enum | 否 | `"code"` 或 `"markdown"`（插入模式必填） |
| `edit_mode` | enum | 否 | `"replace"`（替换）、`"insert"`（插入）、`"delete"`（删除），默认 `"replace"` |

**输出格式：**
- `new_source`：新的单元格内容
- `cell_id`：单元格 ID
- `cell_type`：单元格类型
- `edit_mode`：操作模式

**使用场景：**
- 修改 Notebook 中的代码或 Markdown 单元格
- 在 Notebook 中插入新单元格
- 删除不需要的单元格

---

## 二、搜索类工具

### 5. Glob（文件名模式匹配） {#glob}

| 项目 | 说明 |
|------|------|
| **工具名** | `Glob` |
| **源文件** | `src/tools/GlobTool/GlobTool.ts` |
| **功能** | 快速文件模式匹配，支持任意大小的代码库 |
| **只读** | 是 |
| **并发安全** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `pattern` | string | 是 | glob 模式，如 `"**/*.js"`、`"src/**/*.ts"` |
| `path` | string | 否 | 搜索目录（默认为当前工作目录）。不要传 `"undefined"` 或 `"null"` |

**输出格式：**
- `durationMs`：搜索耗时（毫秒）
- `numFiles`：匹配的文件数量
- `filenames`：匹配的文件路径数组
- `truncated`：结果是否被截断（上限 100 个文件）

**使用场景：**
- 查找特定类型的文件（如所有 `.tsx` 文件）
- 在特定目录下查找文件
- 确认文件是否存在
- 替代 `find` 和 `ls` 命令

**注意事项：**
- 结果按修改时间排序
- 最多返回 100 个结果
- 返回相对路径以节省 token

---

### 6. Grep（文件内容搜索） {#grep}

| 项目 | 说明 |
|------|------|
| **工具名** | `Grep` |
| **源文件** | `src/tools/GrepTool/GrepTool.ts` |
| **功能** | 基于 ripgrep 的强大文件内容搜索工具 |
| **只读** | 是 |
| **并发安全** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `pattern` | string | 是 | 正则表达式搜索模式 |
| `path` | string | 否 | 搜索路径（默认当前目录） |
| `glob` | string | 否 | 文件过滤 glob 模式，如 `"*.js"`、`"*.{ts,tsx}"` |
| `output_mode` | enum | 否 | `"content"`（显示匹配行）、`"files_with_matches"`（仅文件路径，默认）、`"count"`（匹配计数） |
| `-B` | number | 否 | 匹配行前的上下文行数 |
| `-A` | number | 否 | 匹配行后的上下文行数 |
| `-C` / `context` | number | 否 | 匹配行前后的上下文行数 |
| `-n` | boolean | 否 | 显示行号（默认 `true`） |
| `-i` | boolean | 否 | 大小写不敏感搜索 |
| `type` | string | 否 | 文件类型过滤（如 `"js"`、`"py"`、`"rust"`） |
| `head_limit` | number | 否 | 限制输出行数（默认 250，传 0 不限制） |
| `offset` | number | 否 | 跳过前 N 行（用于分页） |
| `multiline` | boolean | 否 | 多行模式，`.` 匹配换行符 |

**输出格式：**
- `mode`：使用的输出模式
- `numFiles`：匹配文件数
- `filenames`：匹配的文件路径数组
- `content`：匹配的内容行（content 模式）
- `numMatches`：总匹配数（count 模式）

**使用场景：**
- 搜索代码中的特定函数、类、变量
- 查找特定字符串的所有出现位置
- 搜索特定类型文件中的模式
- 替代 `grep` 和 `rg` 命令

**注意事项：**
- 使用 ripgrep 语法（非 grep）
- 花括号需要转义：`interface\{\}` 而非 `interface{}`
- 自动排除 VCS 目录（`.git` 等）
- 支持通过 `head_limit` + `offset` 分页

---

## 三、命令执行类工具

### 7. Bash（Shell 命令执行） {#bash}

| 项目 | 说明 |
|------|------|
| **工具名** | `Bash` |
| **源文件** | `src/tools/BashTool/BashTool.tsx` |
| **功能** | 执行 shell 命令并返回输出 |
| **只读** | 否 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `command` | string | 是 | 要执行的命令 |
| `timeout` | number | 否 | 超时时间（毫秒），最大 600000（10 分钟），默认 120000（2 分钟） |
| `description` | string | 否 | 命令的简洁描述（主动语态） |
| `run_in_background` | boolean | 否 | 是否在后台运行 |
| `dangerouslyDisableSandbox` | boolean | 否 | 禁用沙盒模式（危险） |

**输出格式：**
- `stdout`：标准输出
- `stderr`：标准错误输出
- `interrupted`：命令是否被中断
- `backgroundTaskId`：后台任务 ID（后台运行时）
- `returnCodeInterpretation`：退出码的语义解释

**使用场景：**
- 运行 Git 命令（`git status`、`git commit` 等）
- 执行构建和测试命令
- 安装依赖包
- 运行开发服务器
- 任何需要 shell 执行的系统操作

**注意事项：**
- 工作目录在命令间保持，但 shell 状态不保持
- 优先使用专用工具（Read/Edit/Write/Glob/Grep）
- 避免使用 `sleep` 命令
- 避免使用交互式命令（如 `git rebase -i`）
- 结果最大 30KB

---

### 8. PowerShell（PowerShell 命令执行） {#powershell}

| 项目 | 说明 |
|------|------|
| **工具名** | `PowerShell` |
| **源文件** | `src/tools/PowerShellTool/PowerShellTool.tsx` |
| **功能** | 在 Windows 上执行 PowerShell 命令 |
| **只读** | 否 |
| **平台** | 仅 Windows |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `command` | string | 是 | 要执行的 PowerShell 命令 |
| `timeout` | number | 否 | 超时时间（毫秒） |
| `description` | string | 否 | 命令描述 |
| `run_in_background` | boolean | 否 | 后台运行 |
| `dangerouslyDisableSandbox` | boolean | 否 | 禁用沙盒 |

**输出格式：**
与 Bash 工具类似，包含 `stdout`、`stderr`、`interrupted` 等。

**使用场景：**
- Windows 平台上替代 Bash 工具
- 执行 Windows 特有的系统命令

---

## 四、网络类工具

### 9. WebFetch（网页内容获取） {#webfetch}

| 项目 | 说明 |
|------|------|
| **工具名** | `WebFetch` |
| **源文件** | `src/tools/WebFetchTool/WebFetchTool.ts` |
| **功能** | 获取 URL 内容，将 HTML 转为 Markdown，并用 AI 模型处理内容 |
| **只读** | 是 |
| **并发安全** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `url` | string | 是 | 要获取内容的 URL（必须是有效 URL） |
| `prompt` | string | 是 | 对获取内容执行的提示词 |

**输出格式：**
- `bytes`：获取的内容大小（字节）
- `code`：HTTP 响应码
- `codeText`：HTTP 响应码文本
- `result`：AI 处理后的结果
- `durationMs`：耗时（毫秒）
- `url`：获取的 URL

**使用场景：**
- 获取 API 文档或技术文档
- 读取公开网页的内容
- 分析在线资源

**注意事项：**
- **无法获取需要认证的 URL**（Google Docs、Confluence、Jira、GitHub 私有仓库等）
- 自动将 HTTP 升级为 HTTPS
- 15 分钟缓存（重复访问同一 URL）
- 二进制内容（PDF 等）会保存到磁盘
- 结果最大 100KB

---

### 10. WebSearch（网络搜索） {#websearch}

| 项目 | 说明 |
|------|------|
| **工具名** | `WebSearch` |
| **源文件** | `src/tools/WebSearchTool/WebSearchTool.ts` |
| **功能** | 搜索网络并返回结果，提供最新信息 |
| **只读** | 是 |
| **并发安全** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `query` | string | 是 | 搜索查询（最少 2 个字符） |
| `allowed_domains` | string[] | 否 | 仅包含这些域名的结果 |
| `blocked_domains` | string[] | 否 | 排除这些域名的结果 |

**输出格式：**
- `query`：执行的搜索查询
- `results`：搜索结果数组（标题、URL）
- `durationSeconds`：搜索耗时

**使用场景：**
- 获取最新的技术信息
- 搜索文档和解决方案
- 查找库的最新版本信息

**注意事项：**
- 不能同时指定 `allowed_domains` 和 `blocked_domains`
- 每次最多 8 个搜索
- 必须在结果末尾包含 "Sources:" 部分和 Markdown 超链接
- 仅特定模型/提供商组合可用

---

## 五、代理与任务管理类工具

### 11. Agent（子代理启动） {#agent}

| 项目 | 说明 |
|------|------|
| **工具名** | `Agent` |
| **源文件** | `src/tools/AgentTool/AgentTool.tsx` |
| **功能** | 启动新的子代理来处理复杂的多步骤任务 |
| **只读** | 否 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `description` | string | 是 | 简短任务描述（3-5 个词） |
| `prompt` | string | 是 | 代理要执行的任务详情 |
| `subagent_type` | string | 否 | 专用代理类型（省略则使用通用代理） |
| `model` | enum | 否 | 模型覆盖：`"sonnet"`、`"opus"`、`"haiku"` |
| `run_in_background` | boolean | 否 | 后台运行 |
| `name` | string | 否 | 代理名称（使其可通过 SendMessage 寻址） |
| `isolation` | enum | 否 | `"worktree"`（隔离 git 副本）或 `"remote"`（远程环境） |
| `cwd` | string | 否 | 代理的工作目录（与 `isolation: "worktree"` 互斥） |

**可用的子代理类型：**
- `general-purpose`：通用代理，适合研究和多步骤任务
- `Explore`：快速代码库探索代理
- `Plan`：软件架构规划代理
- `claude-code-guide`：Claude Code 使用指南代理
- `code-reviewer`：代码审查代理
- 其他自定义代理类型

**输出格式：**
- 同步完成：`status: "completed"`，附带结果
- 异步启动：`status: "async_launched"`，附带 `agentId` 和 `outputFile`
- 团队成员生成：`status: "teammate_spawned"`

**使用场景：**
- 并行处理多个独立的研究任务
- 探索大型代码库
- 执行需要长时间运行的复杂任务
- 获取独立的代码审查意见
- 保护主上下文窗口不被过多结果填满

**注意事项：**
- 新代理没有对话历史，需要在 prompt 中提供完整上下文
- Fork 代理继承完整对话上下文
- 可通过 `SendMessage` 与已命名的代理通信
- 结果最大 100KB

---

### 12. TaskCreate（创建任务） {#taskcreate}

| 项目 | 说明 |
|------|------|
| **工具名** | `TaskCreate` |
| **源文件** | `src/tools/TaskCreateTool/TaskCreateTool.ts` |
| **功能** | 在任务列表中创建新任务 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `subject` | string | 是 | 任务简短标题 |
| `description` | string | 是 | 任务详细描述 |
| `activeForm` | string | 否 | 进行中时显示的动名词形式（如 "Running tests"） |
| `metadata` | object | 否 | 附加元数据 |

**使用场景：**
- 将复杂任务分解为可追踪的小步骤
- 帮助用户了解工作进度

---

### 13. TaskGet（获取任务） {#taskget}

| 项目 | 说明 |
|------|------|
| **工具名** | `TaskGet` |
| **源文件** | `src/tools/TaskGetTool/TaskGetTool.ts` |
| **功能** | 按 ID 获取任务详情 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `taskId` | string | 是 | 任务 ID |

---

### 14. TaskList（列出任务） {#tasklist}

| 项目 | 说明 |
|------|------|
| **工具名** | `TaskList` |
| **源文件** | `src/tools/TaskListTool/TaskListTool.ts` |
| **功能** | 列出所有任务 |

**参数：** 无

---

### 15. TaskUpdate（更新任务） {#taskupdate}

| 项目 | 说明 |
|------|------|
| **工具名** | `TaskUpdate` |
| **源文件** | `src/tools/TaskUpdateTool/TaskUpdateTool.ts` |
| **功能** | 更新任务的状态、描述等 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `taskId` | string | 是 | 任务 ID |
| `subject` | string | 否 | 新标题 |
| `description` | string | 否 | 新描述 |
| `activeForm` | string | 否 | 进行中显示文本 |
| `status` | enum | 否 | `"pending"`、`"in_progress"`、`"completed"`、`"deleted"` |
| `addBlocks` | string[] | 否 | 此任务阻塞的任务 ID 列表 |
| `addBlockedBy` | string[] | 否 | 阻塞此任务的任务 ID 列表 |
| `owner` | string | 否 | 任务负责人 |
| `metadata` | object | 否 | 元数据（设为 null 删除键） |

---

### 16. TaskOutput（获取任务输出） {#taskoutput}

| 项目 | 说明 |
|------|------|
| **工具名** | `TaskOutput` |
| **源文件** | `src/tools/TaskOutputTool/TaskOutputTool.tsx` |
| **功能** | 获取后台任务的输出（**已弃用**，建议使用 `Read` 读取输出文件） |
| **别名** | `AgentOutputTool`、`BashOutputTool` |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `task_id` | string | 是 | 任务 ID |
| `block` | boolean | 否 | 是否等待完成（默认 `true`） |
| `timeout` | number | 否 | 最大等待时间（毫秒，默认 30000，范围 0-600000） |

---

### 17. TaskStop（停止任务） {#taskstop}

| 项目 | 说明 |
|------|------|
| **工具名** | `TaskStop` |
| **源文件** | `src/tools/TaskStopTool/TaskStopTool.ts` |
| **功能** | 停止正在运行的后台任务 |
| **别名** | `KillShell`（向后兼容） |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `task_id` | string | 否 | 要停止的后台任务 ID |
| `shell_id` | string | 否 | 已弃用，使用 `task_id` |

---

### 18. SendMessage（发送消息） {#sendmessage}

| 项目 | 说明 |
|------|------|
| **工具名** | `SendMessage` |
| **源文件** | `src/tools/SendMessageTool/SendMessageTool.ts` |
| **功能** | 向代理团队成员发送消息（swarm 协议） |
| **前提** | 启用代理群组功能 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `to` | string | 是 | 接收者（团队成员名、`"*"` 广播、`"uds:<socket>"` 本地对等、`"bridge:<session-id>"` 远程控制） |
| `summary` | string | 否 | 5-10 词预览（纯文本消息时必填） |
| `message` | string / object | 是 | 消息内容（纯文本或结构化消息） |

**使用场景：**
- 在多代理团队中协调工作
- 向其他代理委派子任务
- 广播状态更新

---

## 六、用户交互类工具

### 19. AskUserQuestion（向用户提问） {#askuserquestion}

| 项目 | 说明 |
|------|------|
| **工具名** | `AskUserQuestion` |
| **源文件** | `src/tools/AskUserQuestionTool/AskUserQuestionTool.tsx` |
| **功能** | 向用户提出多选题形式的问题 |
| **需要交互** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `questions` | array | 是 | 问题列表（1-4 个问题） |
| ├ `question` | string | 是 | 完整问题文本（必须以 `?` 结尾） |
| ├ `header` | string | 是 | 简短标签 |
| ├ `options` | array | 是 | 选项列表（2-4 个选项） |
| │ ├ `label` | string | 是 | 选项显示文本（1-5 个词） |
| │ ├ `description` | string | 是 | 选项解释 |
| │ └ `preview` | string | 否 | 预览内容（代码片段、模型等） |
| └ `multiSelect` | boolean | 否 | 是否允许多选（默认 `false`） |

**使用场景：**
- 需要用户在多个方案中做选择
- 确认不确定的实现方向
- 收集用户偏好

---

### 20. SendUserMessage / Brief（发送用户消息） {#brief}

| 项目 | 说明 |
|------|------|
| **工具名** | `Brief`（别名 `SendUserMessage`） |
| **源文件** | `src/tools/BriefTool/BriefTool.ts` |
| **功能** | 向用户发送消息，支持附件 |
| **前提** | 需要 `--brief` 标志或特定设置 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `message` | string | 是 | 消息内容（支持 Markdown） |
| `attachments` | string[] | 否 | 要附加的文件路径列表 |
| `status` | enum | 是 | `"normal"`（回复用户）或 `"proactive"`（主动通知） |

---

### 21. TodoWrite（待办事项管理） {#todowrite}

| 项目 | 说明 |
|------|------|
| **工具名** | `TodoWrite` |
| **源文件** | `src/tools/TodoWriteTool/TodoWriteTool.ts` |
| **功能** | 管理会话任务清单 |
| **前提** | TodoV2 禁用时可用 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `todos` | array | 是 | 更新后的待办列表 |

---

## 七、计划与工作区类工具

### 22. EnterPlanMode（进入计划模式） {#enterplanmode}

| 项目 | 说明 |
|------|------|
| **工具名** | `EnterPlanMode` |
| **源文件** | `src/tools/EnterPlanModeTool/EnterPlanModeTool.ts` |
| **功能** | 请求进入计划模式，用于需要探索和设计的复杂任务 |
| **只读** | 是 |

**参数：** 无

**使用场景：**
- 开始规划复杂实现前
- 需要与用户对齐方案时

---

### 23. ExitPlanMode（退出计划模式） {#exitplanmode}

| 项目 | 说明 |
|------|------|
| **工具名** | `ExitPlanMode` |
| **源文件** | `src/tools/ExitPlanModeTool/ExitPlanModeV2Tool.ts` |
| **功能** | 提示用户退出计划模式，开始编码 |
| **只读** | 否（写入计划文件） |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `allowedPrompts` | array | 否 | 基于提示词的权限需求 |
| ├ `tool` | enum | 是 | 工具名（如 `"Bash"`） |
| └ `prompt` | string | 是 | 操作的语义描述 |

**输出格式：**
- `plan`：呈现的计划内容
- `filePath`：计划文件保存位置
- `planWasEdited`：用户是否编辑了计划

---

### 24. EnterWorktree（进入工作树） {#enterworktree}

| 项目 | 说明 |
|------|------|
| **工具名** | `EnterWorktree` |
| **源文件** | `src/tools/EnterWorktreeTool/EnterWorktreeTool.ts` |
| **功能** | 创建隔离的 git worktree 并切换到其中 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `name` | string | 否 | worktree 名称（字母、数字、点、下划线、连字符，最长 64 字符） |

**输出格式：**
- `worktreePath`：创建的 worktree 路径
- `worktreeBranch`：分支名称

**使用场景：**
- 在不影响主分支的情况下进行实验
- 并行处理多个功能分支
- 安全地进行破坏性操作

---

### 25. ExitWorktree（退出工作树） {#exitworktree}

| 项目 | 说明 |
|------|------|
| **工具名** | `ExitWorktree` |
| **源文件** | `src/tools/ExitWorktreeTool/ExitWorktreeTool.ts` |
| **功能** | 退出 worktree 会话，恢复原始工作目录 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `action` | enum | 是 | `"keep"`（保留 worktree）或 `"remove"`（删除） |
| `discard_changes` | boolean | 否 | 当 `action="remove"` 且有未提交更改时必须设为 `true` |

**输出格式：**
- `originalCwd`：原始工作目录
- `worktreePath`：worktree 路径
- `discardedFiles`：丢弃的文件数
- `discardedCommits`：丢弃的提交数

---

## 八、定时调度类工具

### 26. CronCreate（创建定时任务） {#croncreate}

| 项目 | 说明 |
|------|------|
| **工具名** | `CronCreate` |
| **源文件** | `src/tools/ScheduleCronTool/CronCreateTool.ts` |
| **功能** | 创建定期或一次性的定时任务 |
| **功能门控** | `AGENT_TRIGGERS` |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `cron` | string | 是 | 5 字段 cron 表达式（本地时间），格式：`"分 时 日 月 周"` |
| `prompt` | string | 是 | 每次触发时执行的提示词 |
| `recurring` | boolean | 否 | 是否重复（默认 `true`，`false` 表示一次性） |
| `durable` | boolean | 否 | 是否持久化到 `.claude/scheduled_tasks.json`（默认 `false`，仅会话内有效） |

**输出格式：**
- `id`：任务 ID
- `humanSchedule`：人类可读的时间表
- `recurring`：是否重复
- `durable`：是否持久化

**注意事项：**
- 最多 50 个任务
- 循环任务 14 天后自动过期

---

### 27. CronDelete（删除定时任务） {#crondelete}

| 项目 | 说明 |
|------|------|
| **工具名** | `CronDelete` |
| **源文件** | `src/tools/ScheduleCronTool/CronDeleteTool.ts` |
| **功能** | 取消定时任务 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | string | 是 | CronCreate 返回的任务 ID |

---

### 28. CronList（列出定时任务） {#cronlist}

| 项目 | 说明 |
|------|------|
| **工具名** | `CronList` |
| **源文件** | `src/tools/ScheduleCronTool/CronListTool.ts` |
| **功能** | 列出所有活跃的定时任务 |
| **只读** | 是 |

**参数：** 无

**输出格式：**
- `jobs`：任务数组（包含 `id`、`cron`、`humanSchedule`、`prompt`、`recurring`、`durable`）

---

### 29. ScheduleWakeup（调度唤醒） {#schedulewakeup}

| 项目 | 说明 |
|------|------|
| **工具名** | `ScheduleWakeup` |
| **功能** | 在 `/loop` 动态模式下调度下次唤醒时间 |
| **特殊** | 用于自节奏循环任务 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `delaySeconds` | number | 是 | 唤醒延迟秒数（运行时限制 60-3600） |
| `reason` | string | 是 | 选择此延迟的原因（一句话，展示给用户和遥测） |
| `prompt` | string | 是 | 唤醒时的 `/loop` 输入（原样传递循环提示词） |

**注意事项：**
- prompt cache 有 5 分钟 TTL
- < 270s：缓存保持活跃（适合检查构建等）
- > 300s：缓存失效但间隔更长
- 避免 300s（最差选择）
- 空闲时默认 1200-1800s

---

### 30. RemoteTrigger（远程触发器） {#remotetrigger}

| 项目 | 说明 |
|------|------|
| **工具名** | `RemoteTrigger` |
| **源文件** | `src/tools/RemoteTriggerTool/RemoteTriggerTool.ts` |
| **功能** | 调用 claude.ai 远程触发器 API |
| **功能门控** | 特定功能标志 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `action` | enum | 是 | `"list"`、`"get"`、`"create"`、`"update"`、`"run"` |
| `trigger_id` | string | 否 | 触发器 ID（get/update/run 时必填） |
| `body` | object | 否 | JSON 请求体（create/update 时使用） |

**输出格式：**
- `status`：HTTP 状态码
- `json`：响应 JSON

---

## 九、代码智能类工具

### 31. LSP（语言服务协议） {#lsp}

| 项目 | 说明 |
|------|------|
| **工具名** | `LSP` |
| **源文件** | `src/tools/LSPTool/LSPTool.ts` |
| **功能** | 代码智能功能：定义跳转、引用查找、符号搜索、悬停信息等 |
| **只读** | 是 |
| **并发安全** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `operation` | enum | 是 | 操作类型（见下表） |
| `filePath` | string | 是 | 文件路径（绝对或相对） |
| `line` | number | 是 | 行号（1-based） |
| `character` | number | 是 | 字符偏移（1-based） |

**支持的操作：**

| 操作 | 说明 |
|------|------|
| `goToDefinition` | 跳转到定义 |
| `findReferences` | 查找所有引用 |
| `hover` | 获取悬停信息（类型、文档） |
| `documentSymbol` | 文档符号列表 |
| `workspaceSymbol` | 工作区符号搜索 |
| `goToImplementation` | 跳转到实现 |
| `prepareCallHierarchy` | 准备调用层次 |
| `incomingCalls` | 入站调用 |
| `outgoingCalls` | 出站调用 |

**使用场景：**
- 理解代码结构和类型信息
- 追踪函数调用链
- 查找符号的所有引用

**注意事项：**
- 需要 LSP 已连接
- 文件最大 10MB
- 自动过滤 gitignore 文件

---

## 十、工具与技能管理类工具

### 32. ToolSearch（工具搜索） {#toolsearch}

| 项目 | 说明 |
|------|------|
| **工具名** | `ToolSearch` |
| **源文件** | `src/tools/ToolSearchTool/ToolSearchTool.ts` |
| **功能** | 搜索和加载延迟加载的工具 schema |
| **只读** | 是 |
| **并发安全** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `query` | string | 是 | 查询字符串。`"select:Read,Edit"` 直接选择，关键字进行模糊搜索 |
| `max_results` | number | 否 | 最大结果数（默认 5） |

**输出格式：**
- `matches`：匹配的工具名数组
- `query`：原始查询
- `total_deferred_tools`：总延迟工具数

**使用场景：**
- 在调用延迟加载工具前获取其 schema
- 搜索 MCP 工具
- 发现可用工具

**注意事项：**
- 延迟工具在未加载 schema 前无法调用
- 支持 MCP 工具前缀搜索（`mcp__`）

---

### 33. Skill（技能调用） {#skill}

| 项目 | 说明 |
|------|------|
| **工具名** | `Skill` |
| **源文件** | `src/tools/SkillTool/SkillTool.ts` |
| **功能** | 在主对话中执行技能（slash command） |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `skill` | string | 是 | 技能名称（如 `"commit"`、`"review-pr"`、`"pdf"`） |
| `args` | string | 否 | 技能参数 |

**输出格式：**
- 内联执行：`success`、`commandName`、`allowedTools`、`status: "inline"`
- Fork 执行：`success`、`commandName`、`agentId`、`result`、`status: "forked"`

**使用场景：**
- 用户使用 `/commit`、`/review-pr` 等斜杠命令时
- 调用预定义的技能工作流

---

## 十一、MCP 集成类工具

### 34. MCPTool（MCP 工具执行） {#mcptool}

| 项目 | 说明 |
|------|------|
| **工具名** | `mcp`（实际名称由 MCP 服务器定义覆盖） |
| **源文件** | `src/tools/MCPTool/MCPTool.ts` |
| **功能** | 执行 MCP（Model Context Protocol）服务器提供的工具 |

**参数：** 由 MCP 服务器动态定义

**使用场景：**
- 与外部 MCP 服务器集成
- 使用第三方工具扩展功能

**注意事项：**
- 实际行为由 MCP 客户端提供
- 工具名和参数在运行时从 MCP 服务器获取

---

### 35. ListMcpResources（列出 MCP 资源） {#listmcpresources}

| 项目 | 说明 |
|------|------|
| **工具名** | `ListMcpResourcesTool` |
| **源文件** | `src/tools/ListMcpResourcesTool/ListMcpResourcesTool.ts` |
| **功能** | 列出 MCP 服务器上可用的资源 |
| **只读** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `server` | string | 否 | MCP 服务器名称（不指定则列出所有） |

**输出格式：**
- 资源数组：`uri`、`name`、`mimeType`、`description`、`server`

---

### 36. ReadMcpResource（读取 MCP 资源） {#readmcpresource}

| 项目 | 说明 |
|------|------|
| **工具名** | `ReadMcpResourceTool` |
| **源文件** | `src/tools/ReadMcpResourceTool/ReadMcpResourceTool.ts` |
| **功能** | 从 MCP 服务器读取特定资源 |
| **只读** | 是 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `server` | string | 是 | MCP 服务器名称 |
| `uri` | string | 是 | 资源 URI |

**输出格式：**
- `contents`：内容数组（`uri`、`mimeType`、`text`、`blobSavedTo`）

---

## 十二、配置与团队管理类工具

### 37. Config（配置管理） {#config}

| 项目 | 说明 |
|------|------|
| **工具名** | `Config` |
| **源文件** | `src/tools/ConfigTool/ConfigTool.ts` |
| **功能** | 获取或设置 Claude Code 配置 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `setting` | string | 是 | 设置键（如 `"theme"`、`"model"`、`"permissions.defaultMode"`） |
| `value` | string/boolean/number | 否 | 新值（省略则获取当前值） |

**使用场景：**
- 修改 Claude Code 设置
- 查询当前配置

---

### 38. TeamCreate（创建团队） {#teamcreate}

| 项目 | 说明 |
|------|------|
| **工具名** | `TeamCreate` |
| **源文件** | `src/tools/TeamCreateTool/TeamCreateTool.ts` |
| **功能** | 创建新的多代理协作团队 |
| **功能门控** | 代理群组功能 |

**参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `team_name` | string | 是 | 团队名称 |
| `description` | string | 否 | 团队描述/目的 |
| `agent_type` | string | 否 | 团队负责人的类型/角色 |

**输出格式：**
- `team_name`：团队名称
- `team_file_path`：团队配置文件路径
- `lead_agent_id`：负责人代理 ID

---

### 39. TeamDelete（删除团队） {#teamdelete}

| 项目 | 说明 |
|------|------|
| **工具名** | `TeamDelete` |
| **源文件** | `src/tools/TeamDeleteTool/TeamDeleteTool.ts` |
| **功能** | 清理团队和任务目录 |
| **功能门控** | 代理群组功能 |

**参数：** 无

**注意事项：**
- 需要先关闭所有活跃成员

---

## 十三、实验性 / 功能门控工具

以下工具受功能标志（Feature Flag）或环境变量控制，可能不在所有环境中可用。

### 40. Sleep（休眠等待） {#sleep}

| 项目 | 说明 |
|------|------|
| **工具名** | `Sleep` |
| **功能门控** | `PROACTIVE` 或 `KAIROS` |
| **功能** | 等待指定时长，用户可随时中断 |

**使用场景：**
- 用户要求等待时
- 无事可做时
- 等待某件事完成时

**注意事项：**
- 可与其他工具并发调用
- 每次唤醒消耗一次 API 调用
- prompt cache 5 分钟后过期
- 优于 `Bash(sleep ...)`，不占用 shell 进程

---

### 41. Monitor（进程监控） {#monitor}

| 项目 | 说明 |
|------|------|
| **工具名** | `Monitor` |
| **功能门控** | `MONITOR_TOOL` |
| **功能** | 流式监控后台进程事件（每个 stdout 行是一个通知） |

**使用场景：**
- 监控长时间运行的后台进程输出
- 实时接收进程状态更新

---

### 42. REPL（交互式执行） {#repl}

| 项目 | 说明 |
|------|------|
| **功能门控** | `USER_TYPE === 'ant'` |
| **功能** | 提供对基础工具（FileRead、FileWrite 等）的 REPL 模式访问 |

---

### 43. 其他功能门控工具 {#other-experimental}

以下工具在代码库中被引用但受功能标志保护，可能尚在开发中：

| 工具名 | 功能门控 | 简述 |
|--------|---------|------|
| `WebBrowser` | `WEB_BROWSER_TOOL` | 网页浏览器工具 |
| `Workflow` | `WORKFLOW_SCRIPTS` | 工作流脚本执行 |
| `SuggestBackgroundPR` | ANT 用户类型 | 建议后台 PR |
| `VerifyPlanExecution` | `CLAUDE_CODE_VERIFY_PLAN` | 验证计划执行 |
| `OverflowTest` | `OVERFLOW_TEST_TOOL` | 溢出测试 |
| `CtxInspect` | `CONTEXT_COLLAPSE` | 上下文检查 |
| `TerminalCapture` | `TERMINAL_PANEL` | 终端捕获 |
| `Snip` | `HISTORY_SNIP` | 历史剪切 |
| `ListPeers` | `UDS_INBOX` | 列出对等节点 |
| `PushNotification` | `KAIROS` / `KAIROS_PUSH_NOTIFICATION` | 推送通知 |
| `SendUserFile` | `KAIROS` | 发送用户文件 |
| `SubscribePR` | `KAIROS_GITHUB_WEBHOOKS` | 订阅 PR 事件 |
| `Tungsten` | ANT 用户类型 | Tungsten 工具 |

---

> **说明：** 本文档基于 Claude Code 源代码分析生成。部分实验性工具可能随版本更新而变化。功能门控工具需要特定的功能标志或环境变量才能启用。
