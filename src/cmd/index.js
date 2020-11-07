const pk = require('../../package.json')
const program = require('commander')

function run() {
    program
        .version(pk.version)
        .usage('<command> [options]')
        .command('create <project-name>')
        .description('创建一个新的项目')
        .action((name, cmd) => {
            console.log('you will create a project named', name)
        })

    if (! process.argv.slice(2).length) {
        program.outputHelp()
        return
    }

    program.parse(process.argv)
}

module.exports = run