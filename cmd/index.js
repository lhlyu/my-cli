const program = require('commander')

const pk = require('../package.json')

function run() {
    program
        .version(pk.version, '-v, --version', '版本')
        .helpOption('-h, --help', '帮助')
        .option('-l, --lang <value>', '语言列表')
        .option('-t, --template <value>', '模板列表')

    if (!process.argv.slice(2).length) {
        program.outputHelp()
        return
    }

    program.parse()
    console.log(program.opts())
    console.log(program.args[0])
}

module.exports = run
