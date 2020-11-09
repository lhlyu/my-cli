const chalk = require('chalk')
// 创建完成后提示语设定
function npmRunTip (projectName) {
    console.log()
    console.log(chalk.green.bold('进入目录:'), chalk.cyan(`cd ${projectName}`))
    console.log(chalk.green.bold('安装依赖:'), chalk.cyan('npm i'), chalk.green.bold('或'), chalk.cyan('yarn'))
    console.log(chalk.green.bold('更新依赖:'), chalk.cyan('yarn upgrade --latest'))
    console.log()
}

function docRunTip (projectName) {
    console.log()
    console.log(chalk.green.bold('进入目录:'), chalk.cyan(`cd ${projectName}`))
    console.log(chalk.green.bold('安装docsify(已安装略过):'), chalk.cyan('npm i docsify-cli -g'))
    console.log(chalk.green.bold('运行项目:'), chalk.cyan('docsify serve docs'))
    console.log(chalk.green.bold('文档地址:'), chalk.cyan('https://docsify.js.org/#/zh-cn/quickstart'))
    console.log()
}


module.exports = [{
    name: 'package-easy : 一个普通的package.json模板',
    dir: 'package-easy',
    ingores: ['.gitkeep'],
    after: npmRunTip
}, {
    name: 'vite-easy : 一个vite模板',
    dir: 'vite-easy',
    ingores: ['.gitkeep'],
    after: npmRunTip
}, {
    name: 'doc-easy : 一个docsify模板',
    dir: 'doc-easy',
    ingores: [],
    after: docRunTip
}]
