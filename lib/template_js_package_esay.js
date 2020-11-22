const chalk = require('chalk')
const Base = require('./base')

class TemplateJsPackageEasy extends Base {
    props = {
        name: 'template-js-package-easy',
        desc: '一个普通的package.json模板',
        lang: 'js',
        ingores: ['.gitkeep'],
    }

    after () {
        console.log()
        console.log(chalk.green.bold('创建完毕！'))
        console.log()
        console.log(chalk.green.bold('进入目录:'), chalk.cyan(`cd ${this.$projectName}`))
        console.log(chalk.green.bold('安装依赖:'), chalk.cyan('npm i'), chalk.green.bold('或'), chalk.cyan('yarn'))
        console.log(chalk.green.bold('更新依赖:'), chalk.cyan('yarn upgrade --latest'))
        console.log()
    }
}

module.exports = TemplateJsPackageEasy