const path = require('path')
// 文件系统模块
const fs = require('fs')
// 命令行交互
const inquirer = require('inquirer')
// 控制终端颜色输出
const chalk = require('chalk')
// 校验名字是否符合npm规范
const validateProjectName = require('validate-npm-package-name')

const pk = require('../package.json')
const conf = require('../config')
const templates = require('../config/templates')
const utils = require('../utils')
const copy = require('./copy')

async function create(projectName, options) {
    const cwd = process.cwd()
    const inCurrent = projectName === '.'
    const name = inCurrent ? path.relative('../', cwd) : projectName
    const targetDir = path.resolve(cwd, projectName || '.')
    const result = validateProjectName(name)
    if ( !result.validForNewPackages ) {
        console.error(chalk.red(`无效项目名:"${name}"`))
        result.errors && result.errors.forEach(err => {
            console.error(chalk.red.dim('Error:', err))
        })
        result.warnings && result.warnings.forEach(warn => {
            console.warn(chalk.yellow.dim('Warn:', warn))
        })
        return
    }

    if ( !utils.hasDir(targetDir) ) {
        fs.mkdirSync(targetDir)
    } else {
        console.error(chalk.red('该目录下已经存在，请删除或者修改名字'))
        return
    }

    const answers = await inquirer.prompt([{
        type: 'list',
        name: 'template',
        message: 'template: 请选择一个模板',
        choices: templates.map( (v, i) => ({
            key: i,
            name: v.name,
            value: i
        }))
    }, {
        type: 'input',
        name: 'author',
        default: conf.AUTHOR,
        message: 'author: 请输入你的作者名'
    }, {
        type: 'input',
        name: 'desc',
        default: '',
        message: 'desc: 请输入项目描述'
    }])

    const sourceDir = path.resolve(__dirname, '..', 'templates', templates[answers.template].dir)

    console.log(chalk.blue('开始创建...'))

    try {
        await copy({
            from: sourceDir,
            to: targetDir,
            renderData: {
                PROJECT_NAME: projectName,
                AUTHOR: answers.author,
                DESC: answers.desc,
                NICK_NAME: conf.NICK_NAME,
                YEAR: utils.getFullYear()
            },
            ingores: templates[answers.template].ingores
        })
    } catch (e) {
        console.log(chalk.red("COPY ERROR:"), e)
        return
    }

    console.log()
    console.log(chalk.green('创建完毕！'))
    console.log()
    console.log(chalk.blue('进入目录:'), chalk.cyan(`cd ${projectName}`))
    console.log(chalk.blue('安装依赖:'), chalk.cyan('npm i'), chalk.blue('或'), chalk.cyan('yarn'))
    console.log(chalk.blue('更新依赖:'), chalk.cyan('yarn upgrade --latest'))
    console.log()

}

module.exports = create