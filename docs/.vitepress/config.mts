import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Claude Code Tools',
  description: 'Claude Code 工具完整参考手册',
  base: '/claude-code-tool/',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/claude-code-tool/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Claude Code Tools',

    nav: [
      { text: '首页', link: '/' },
      { text: '工具参考', link: '/tools-reference' },
    ],

    sidebar: [
      {
        text: '工具参考手册',
        items: [
          { text: '总览', link: '/tools-reference' },
        ],
      },
      {
        text: '文件操作',
        collapsed: false,
        items: [
          { text: 'Read - 文件读取', link: '/tools-reference#read' },
          { text: 'Edit - 文件编辑', link: '/tools-reference#edit' },
          { text: 'Write - 文件写入', link: '/tools-reference#write' },
          { text: 'NotebookEdit - Notebook 编辑', link: '/tools-reference#notebookedit' },
        ],
      },
      {
        text: '搜索',
        collapsed: false,
        items: [
          { text: 'Glob - 文件名匹配', link: '/tools-reference#glob' },
          { text: 'Grep - 内容搜索', link: '/tools-reference#grep' },
        ],
      },
      {
        text: '命令执行',
        collapsed: false,
        items: [
          { text: 'Bash - Shell 命令', link: '/tools-reference#bash' },
          { text: 'PowerShell', link: '/tools-reference#powershell' },
        ],
      },
      {
        text: '网络',
        collapsed: false,
        items: [
          { text: 'WebFetch - 网页获取', link: '/tools-reference#webfetch' },
          { text: 'WebSearch - 网络搜索', link: '/tools-reference#websearch' },
        ],
      },
      {
        text: '代理与任务管理',
        collapsed: false,
        items: [
          { text: 'Agent - 子代理', link: '/tools-reference#agent' },
          { text: 'TaskCreate', link: '/tools-reference#taskcreate' },
          { text: 'TaskGet', link: '/tools-reference#taskget' },
          { text: 'TaskList', link: '/tools-reference#tasklist' },
          { text: 'TaskUpdate', link: '/tools-reference#taskupdate' },
          { text: 'TaskOutput', link: '/tools-reference#taskoutput' },
          { text: 'TaskStop', link: '/tools-reference#taskstop' },
          { text: 'SendMessage', link: '/tools-reference#sendmessage' },
        ],
      },
      {
        text: '用户交互',
        collapsed: false,
        items: [
          { text: 'AskUserQuestion', link: '/tools-reference#askuserquestion' },
          { text: 'Brief / SendUserMessage', link: '/tools-reference#brief' },
          { text: 'TodoWrite', link: '/tools-reference#todowrite' },
        ],
      },
      {
        text: '计划与工作区',
        collapsed: false,
        items: [
          { text: 'EnterPlanMode', link: '/tools-reference#enterplanmode' },
          { text: 'ExitPlanMode', link: '/tools-reference#exitplanmode' },
          { text: 'EnterWorktree', link: '/tools-reference#enterworktree' },
          { text: 'ExitWorktree', link: '/tools-reference#exitworktree' },
        ],
      },
      {
        text: '定时调度',
        collapsed: false,
        items: [
          { text: 'CronCreate', link: '/tools-reference#croncreate' },
          { text: 'CronDelete', link: '/tools-reference#crondelete' },
          { text: 'CronList', link: '/tools-reference#cronlist' },
          { text: 'ScheduleWakeup', link: '/tools-reference#schedulewakeup' },
          { text: 'RemoteTrigger', link: '/tools-reference#remotetrigger' },
        ],
      },
      {
        text: '代码智能',
        collapsed: false,
        items: [
          { text: 'LSP', link: '/tools-reference#lsp' },
        ],
      },
      {
        text: '工具与技能管理',
        collapsed: false,
        items: [
          { text: 'ToolSearch', link: '/tools-reference#toolsearch' },
          { text: 'Skill', link: '/tools-reference#skill' },
        ],
      },
      {
        text: 'MCP 集成',
        collapsed: false,
        items: [
          { text: 'MCPTool', link: '/tools-reference#mcptool' },
          { text: 'ListMcpResources', link: '/tools-reference#listmcpresources' },
          { text: 'ReadMcpResource', link: '/tools-reference#readmcpresource' },
        ],
      },
      {
        text: '配置与团队',
        collapsed: false,
        items: [
          { text: 'Config', link: '/tools-reference#config' },
          { text: 'TeamCreate', link: '/tools-reference#teamcreate' },
          { text: 'TeamDelete', link: '/tools-reference#teamdelete' },
        ],
      },
      {
        text: '实验性工具',
        collapsed: true,
        items: [
          { text: 'Sleep', link: '/tools-reference#sleep' },
          { text: 'Monitor', link: '/tools-reference#monitor' },
          { text: 'REPL', link: '/tools-reference#repl' },
          { text: '其他', link: '/tools-reference#other-experimental' },
        ],
      },
    ],

    outline: {
      level: [2, 3],
      label: '页面导航',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索工具', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '未找到结果',
            resetButtonTitle: '清除查询',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Azure-stars/claude-code-tool' },
    ],

    footer: {
      message: '基于 Claude Code 源代码分析生成',
      copyright: 'Built with VitePress',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新于',
    },
  },
})
