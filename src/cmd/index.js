const program = require('commander')

const pk = require('../../package.json')

function run() {
    program
        .version(pk.version)
        .usage('<command> [options]')
        .command('create <project-name>')
        .description('创建一个新的项目')
        .action((name, cmd) => {
            require('./create')(name)
        })

    if ( !process.argv.slice(2).length ) {
        program.outputHelp()
        return
    }

    program.parse(process.argv)
}

module.exports = run