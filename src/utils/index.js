var fs = require('fs')

function isDir(path) {
    const stat = fs.lstatSync(path)
    return stat.isDirectory()
}

function hasDir(path) {
    return fs.existsSync(path)
}

module.exports = {
    isDir,
    hasDir
}