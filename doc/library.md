<!-- @format -->

## swin 所用库说明

1. `import-local` 当我们本地 node_modules 存在一个脚手架命令，同时全局 node_modules 中也存在这个脚手架命令的时候，优先选用**本地 node_modules**中的版本

通常来讲，全局安装一个脚手架后，本地是不需要安装脚手架的。但是当我们本地安装脚手架的时候，意味着我们项目里用到了这个脚手架。当与全局冲突的时候，比如全局和本地都有这个脚手架，但是版本不同，那么我们应该使用本地的脚手架。这就是 import-local 的作用。

2.  `semver` Semver 是一个专门分析 Semantic Version（语义化版本）的工具，“semver”其实就是这两个单词的缩写。Npm 使用了该工具来处理版本相关的工作。

    - 比较两个版本号的大小
    - 验证某个版本号是否合法
    - 提取版本号，例如从“=v1.2.1”体取出"1.2.1"
    - 分析版本号是否属于某个范围或符合一系列条件

3.  `colors` colors.js 是 Nodejs 终端着色 colors 插件
4.  `root-check` 尝试降级具有 root 权限的进程的权限，如果失败则阻止访问
5.  `user-home` Get the path to the user home directory
6.  `path-exists` 判断路径是否存在，支持同步和异步
