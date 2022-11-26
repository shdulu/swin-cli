/** @format */

module.exports = {
  printWidth: 120, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  semi: false, // 句尾添加分号
  singleQuote: true, // 使用单引号代替双引号
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  htmlWhitespaceSensitivity: 'ignore',
  ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  requireConfig: false, // Require a 'prettierconfig' to format prettier
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  'terminal.integrated.allowMnemonics': true,
  'terminal.integrated.automationShell.linux': '', // 不让prettier使用tslint的代码格式进行校验
  /* 当 requirePragma 和 insertPragma 两个选项同时使用时，--require-pragma具有优先权 */
  requirePragma: false, // 需要写文件开头的 @prettier
  insertPragma: true, // 在文件顶部插入一个特殊标记'@format'，指定文件已使用 Prettier 格式化
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  embeddedLanguageFormatting: 'auto', // 自动识别嵌入代码，对其进行格式化, 如在 JavaScript 中带有标记的标记模板html或 Markdown 代码块
  overrides: [], // 针对特定文件覆盖配置
};
