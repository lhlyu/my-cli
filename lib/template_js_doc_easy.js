const chalk = require('chalk')
const Base = require('./base')

class TemplateJsDocEasy extends Base {
    props = {
        name: 'template-js-doc-easy',
        desc: '一个docsify模板',
        lang: 'js',
        ingores: ['.gitkeep']
    }

    after() {
        console.log()
        console.log(chalk.green.bold('创建完毕！'))
        console.log()
        console.log(chalk.green.bold('进入目录:'), chalk.cyan(`cd ${this.$projectName}`))
        console.log(chalk.green.bold('安装docsify(已安装略过):'), chalk.cyan('npm i docsify-cli -g'))
        console.log(chalk.green.bold('运行项目:'), chalk.cyan('docsify serve docs'))
        console.log(chalk.green.bold('文档地址:'), chalk.cyan('https://docsify.js.org/#/zh-cn/quickstart'))
        console.log()
    }
}

module.exports = TemplateJsDocEasy
