const path = require('path')
// 文件系统模块
const fs = require('fs')
const chalk = require('chalk')
// 命令行交互
const inquirer = require('inquirer')
// 校验名字是否符合npm规范
const validateProjectName = require('validate-npm-package-name')

const pk = require('../package.json')
const utils = require('../utils')
const copy = require('../utils/copy')

class Base {

    before() {
    }

    check() {
        const inCurrent = this.$projectName === '.'
        const name = inCurrent ? path.relative('../', this.$cwd) : this.$projectName
        const result = validateProjectName(name)
        if (!result.validForNewPackages) {
            console.error(chalk.red.dim('[ERROR]:'), `无效项目名:"${name}"`)
            result.errors &&
            result.errors.forEach(err => {
                console.error(chalk.red.dim('[ERROR]:'), err)
            })
            result.warnings &&
            result.warnings.forEach(warn => {
                console.warn(chalk.yellow.dim('[WARN]:', warn))
            })
            throw 'end'
        }
        this.$targetDir = path.resolve(this.$cwd, this.$projectName || '.')
        // 如果目录存在则结束
        if (utils.hasDir(this.$targetDir)) {
            console.log(chalk.red.dim('[ERROR]:'), '该目录下已经存在同名项目，请删除或者修改名字')
            throw 'end'
        }
        // 创建目录
        fs.mkdirSync(this.$targetDir)
    }

    async prompt() {
        try {
            this.$answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'author',
                    default: pk.author,
                    message: 'author: 请输入你的作者名'
                },
                {
                    type: 'input',
                    name: 'desc',
                    default: '',
                    message: 'desc: 请输入项目描述'
                }
            ])
        } catch (e) {
            console.log(chalk.red.dim('[ERROR]:'), e)
            throw 'clear'
        }
    }

    async build() {
        console.log(chalk.cyan.dim('开始创建...'))
        try {
            await copy({
                from: this.$sourceDir,
                to: this.$targetDir,
                renderData: {
                    PROJECT_NAME: this.$projectName,
                    AUTHOR: this.$answers.author,
                    DESC: this.$answers.desc,
                    YEAR: utils.getFullYear()
                },
                ingores: this.props.ingores
            })
        } catch (e) {
            console.log(chalk.red.dim('[ERROR]:'), e)
            throw 'clear'
        }
    }

    after() {}

    async run(projectName) {
        this.$projectName = projectName
        this.$cwd = process.cwd()
        this.$sourceDir = path.resolve(__dirname, '..', 'templates', this.props.name)

        try {
            this.before()
            this.check()
            await this.prompt()
            await this.build()
            this.after()
        } catch (e) {
            if (e === 'clear') {
                utils.delDir(this.$targetDir)
            }
            console.log('end')
        }

    }
}

module.exports = Base
