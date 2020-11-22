const program = require('commander')
const chalk = require('chalk')
// 命令行交互
const inquirer = require('inquirer')

const pk = require('../package.json')
const { langs, templates, tmap } = require('./templates')

function run() {
    program
        .version(pk.version, '-v, --version', '版本')
        .helpOption('-h, --help', '帮助')
        .option('-l, --lang', '语言')
        .option('-t, --template', '模板')

    program.parse()

    const opts = program.opts()
    const lang = opts.lang
    const template = opts.template
    if (lang) {
        console.log(chalk.blue.dim('语言列表 ---------'))
        langs.forEach((l, i) => {
            console.log(chalk.blue.dim(`- ${i + 1}.${l}`))
        })
        console.log()
    }
    if (template) {
        console.log(chalk.blue.dim('模板列表 ---------'))
        templates.forEach((t, i) => {
            console.log(chalk.blue.dim(`- ${i + 1}.${t.name} : ${t.desc}`))
        })
        console.log()
    }
    if (lang || template) {
        return
    }

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'projectName',
                default: 'demo',
                message: '项目名'
            },
            {
                type: 'list',
                name: 'lang',
                message: '开发语言',
                default: langs[0],
                choices: langs
            },
            {
                type: 'list',
                name: 'template',
                message: '模板',
                default: templates[0].name,
                choices: function (answer) {
                    const items = []
                    for (let t of templates) {
                        if (t.lang === answer.lang) {
                            items.push(t.name)
                        }
                    }
                    return items
                }
            }
        ])
        .then(answer => {
            tmap[answer.template].run(answer.projectName)
        })
}

module.exports = run
