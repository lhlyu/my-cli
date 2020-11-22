const program = require('commander')
const chalk = require('chalk')

const pk = require('../package.json')
const { langs, templates } = require('./templates')

function run() {
    program
        .version(pk.version, '-v, --version', '版本')
        .helpOption('-h, --help', '帮助')
        .option('-l, --lang [value]', '语言')
        .option('-t, --template [value]', '模板')

    if (!process.argv.slice(2).length) {
        program.outputHelp()
        return
    }

    program.parse()

    const opts = program.opts()
    const lang = opts.lang
    const template = opts.template
    if (lang === true) {
        console.log(chalk.cyan.dim('语言列表 ---------'))
        for (let l of langs) {
            console.log(chalk.blue.dim(`- ${l}`))
        }
        console.log()
    }
    if (template === true) {
        console.log(chalk.cyan.dim('模板列表 ---------'))
        templates.forEach((t, i) => {
            console.log(chalk.blue.dim(`- ${i + 1}.${t.name} : ${t.desc}`))
        })
        console.log()
    }
    console.log(opts)
    // console.log(program.args[0])
}

module.exports = run
